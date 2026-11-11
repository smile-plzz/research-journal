import fs from "fs";
import path from "path";
import { showcaseEditorialEntries } from "@/config/showcase";
import { GitHubClient, GitHubReleaseMeta, GitHubRepoMeta } from "@/lib/github/client";
import { ensureUniqueSlugs, mergeProjectWithEditorial } from "./merge";
import { normalizeGitHubRepoToProject } from "./normalize";
import { shouldIncludeRepoInShowcase } from "./routing";
import { Project, ShowcaseCatalog, ShowcaseCatalogSchema } from "./schema";

export interface ShowcaseSyncOptions {
  outputCatalogPath?: string;
  outputReadmeDir?: string;
  owner?: string;
  token?: string;
  client?: GitHubClient;
}

function shouldQueryReleases(repo: GitHubRepoMeta, hasToken: boolean): boolean {
  if (hasToken) return true;
  if (showcaseEditorialEntries[repo.name]) return true;
  const lower = repo.name.toLowerCase();
  // Unauthenticated budget optimization: prioritize software, mobile, extension, tool repos
  return !lower.endsWith("-web-app");
}

async function mapInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

export async function runShowcaseIngestion(
  options: ShowcaseSyncOptions = {}
): Promise<ShowcaseCatalog> {
  const catalogPath =
    options.outputCatalogPath ||
    path.join(process.cwd(), "src/data/generated/showcase.json");
  const readmeDir =
    options.outputReadmeDir ||
    path.join(process.cwd(), "src/content/generated/showcase");

  fs.mkdirSync(path.dirname(catalogPath), { recursive: true });
  fs.mkdirSync(readmeDir, { recursive: true });

  console.log("🔍 Discovering public repositories for Showcase...");

  // Load existing showcase catalog for graceful rate-limit fallback
  const existingByRepo = new Map<string, Project>();
  if (fs.existsSync(catalogPath)) {
    try {
      const existingRaw = JSON.parse(
        fs.readFileSync(catalogPath, "utf-8")
      ) as ShowcaseCatalog;
      for (const proj of existingRaw.projects || []) {
        if (proj.repo?.name) {
          existingByRepo.set(proj.repo.name, proj);
        }
      }
    } catch {
      // Ignore invalid existing cache
    }
  }

  const ghClient = options.client || new GitHubClient(options.owner, options.token);
  const allRepos = await ghClient.fetchAllUserRepos();
  console.log(`Retrieved ${allRepos.length} public non-private repositories from GitHub API.`);

  const eligibleRepos = allRepos.filter((repo) => {
    const decision = shouldIncludeRepoInShowcase(repo);
    return decision.include;
  });

  console.log(`Eligible Showcase repositories after routing & exclusions: ${eligibleRepos.length}`);

  const hasToken = ghClient.hasAuthToken();

  const rawEntries = await mapInBatches(eligibleRepos, 8, async (repo) => {
    const branch = repo.default_branch || "main";
    const editorial = showcaseEditorialEntries[repo.name];

    const readmeContent = await ghClient.fetchRawFile(repo.name, "README.md", branch);

    let releases: GitHubReleaseMeta[] = [];
    let releasesFetched = false;
    if (shouldQueryReleases(repo, hasToken) && !ghClient.isRateLimited()) {
      const releaseRes = await ghClient.fetchRepoReleases(repo.name, 5);
      releases = releaseRes.releases;
      releasesFetched = releaseRes.ok;
    }

    const { project: autoProject } = normalizeGitHubRepoToProject(
      repo,
      releases,
      readmeContent,
      {
        includePrereleases: editorial?.includePrereleases,
        owner: ghClient.getOwner(),
      }
    );

    // Preserve previously cached downloads/releaseInfo when release lookup was skipped or rate-limited
    if (!releasesFetched) {
      const prev = existingByRepo.get(repo.name);
      if (prev && prev.downloads.length > 0) {
        autoProject.downloads = prev.downloads;
        autoProject.releaseInfo = prev.releaseInfo;
        autoProject.safetyNote = prev.safetyNote;
        autoProject.provenance.downloads = prev.provenance.downloads || "release";
        if (autoProject.status === "prototype" || autoProject.status === "in-development") {
          autoProject.status = "downloadable";
          autoProject.provenance.status = "release";
        }
      }
    }

    const merged = mergeProjectWithEditorial(autoProject, editorial);
    return { project: merged, readmeContent };
  });

  // Resolve slug collisions and write cached READMEs under final slug
  const readmeByRepoName = new Map<string, string>();
  for (const entry of rawEntries) {
    if (entry.readmeContent) {
      readmeByRepoName.set(entry.project.repo.name, entry.readmeContent);
    }
  }

  let projects: Project[] = ensureUniqueSlugs(rawEntries.map((e) => e.project));

  // Sort: featured first, then curated by explicit order, then recently updated
  projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.curated !== b.curated) return a.curated ? -1 : 1;
    if (a.curated && b.curated) {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Safeguard: preserve existing showcase catalog if API discovery yielded 0 projects
  if (projects.length === 0 && fs.existsSync(catalogPath)) {
    console.warn("⚠️ Showcase ingestion produced 0 projects! Preserving existing showcase.json.");
    return JSON.parse(fs.readFileSync(catalogPath, "utf-8")) as ShowcaseCatalog;
  }

  const activeReadmeFiles = new Set<string>();
  for (const project of projects) {
    const readme = readmeByRepoName.get(project.repo.name);
    if (readme) {
      const fileName = `${project.slug}.md`;
      project.readmeFile = fileName;
      activeReadmeFiles.add(fileName);
      fs.writeFileSync(path.join(readmeDir, fileName), readme, "utf-8");
    }
  }

  // Prune stale cached README files for excluded or renamed projects
  for (const existingFile of fs.readdirSync(readmeDir)) {
    if (existingFile.endsWith(".md") && !activeReadmeFiles.has(existingFile)) {
      fs.rmSync(path.join(readmeDir, existingFile), { force: true });
    }
  }

  const catalog: ShowcaseCatalog = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalProjects: projects.length,
    curatedCount: projects.filter((p) => p.curated).length,
    featuredCount: projects.filter((p) => p.featured).length,
    projects,
  };

  const validated = ShowcaseCatalogSchema.parse(catalog);
  fs.writeFileSync(catalogPath, JSON.stringify(validated, null, 2), "utf-8");

  console.log(
    `✅ Showcase catalog written to: ${catalogPath} (${validated.totalProjects} projects, ${validated.curatedCount} curated, ${validated.featuredCount} featured)`
  );

  return validated;
}
