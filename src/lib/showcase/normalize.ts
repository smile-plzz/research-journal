import { GitHubReleaseMeta, GitHubRepoMeta } from "@/lib/github/client";
import { parseReleaseAssets } from "./releases";
import {
  Project,
  ProjectCategory,
  ProjectPlatform,
  ProjectStatus,
  ShowcaseProvenanceSource,
} from "./schema";

const REPO_SUFFIX_PATTERN =
  /-(web-app|windows-software|android-app-tv|android-app|andorid-app|python-software|windows-script|agent-workflow|extension)$/i;

export function deriveSlug(repoName: string): string {
  const stripped = repoName.replace(REPO_SUFFIX_PATTERN, "");
  const normalized = stripped
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || repoName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function cleanHumanNameFromRepo(repoName: string): string {
  const stripped = repoName.replace(REPO_SUFFIX_PATTERN, "");
  return stripped
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTagline(text: string, maxLen = 120): string {
  const cleaned = stripMarkdownFormatting(text);
  if (!cleaned) return "";
  if (cleaned.length <= maxLen) return cleaned;
  const cut = cleaned.slice(0, maxLen - 3);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 50 ? cut.slice(0, lastSpace) : cut).trim() + "...";
}

export function normalizeLiveUrl(homepage?: string | null): string | undefined {
  if (!homepage) return undefined;
  const trimmed = homepage.trim();
  if (!trimmed) return undefined;

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withScheme);
    const host = url.hostname.toLowerCase();
    // Ignore local/ephemeral tunnels or GitHub repo pages
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.includes("ngrok") ||
      host === "github.com" ||
      host === "lab.github.com"
    ) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

interface ReadmeExtraction {
  headingTitle?: string;
  firstParagraph?: string;
  features: string[];
}

export function extractReadmeDetails(readmeContent?: string | null): ReadmeExtraction {
  if (!readmeContent) {
    return { features: [] };
  }

  const lines = readmeContent.split(/\r?\n/);
  let headingTitle: string | undefined;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      const candidate = stripMarkdownFormatting(trimmed.replace(/^#+\s*/, ""))
        .replace(/^[^\w(]+/, "")
        .trim();
      if (
        candidate.length >= 2 &&
        candidate.length <= 65 &&
        !/^(table of contents|run and deploy your ai studio app)$/i.test(candidate)
      ) {
        headingTitle = candidate;
      }
      break;
    }
  }

  // Extract first meaningful plain-language paragraph outside code fences, badges, and blockquotes
  const paragraphs: string[] = [];
  let inCodeBlock = false;
  let current: string[] = [];

  const flushParagraph = () => {
    if (current.length === 0) return;
    const joined = stripMarkdownFormatting(current.join(" "));
    current = [];
    if (
      joined.length >= 35 &&
      !/^(version|release candidate|build|license|download|http|this contains everything you need to run your app locally|view your app in ai studio)/i.test(
        joined
      )
    ) {
      paragraphs.push(joined);
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      flushParagraph();
      continue;
    }
    if (inCodeBlock) continue;

    if (
      trimmed === "" ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("---") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("<!--") ||
      trimmed.startsWith("![") ||
      trimmed.startsWith("[![") ||
      trimmed.startsWith("<p ") ||
      trimmed.startsWith("<img ")
    ) {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      continue;
    }

    // Strip blockquote prefix if it holds an honest tagline/summary (skip notices)
    if (trimmed.startsWith(">")) {
      const quoteBody = trimmed.replace(/^>\s*/, "");
      if (/^(notice|implementation status|warning):/i.test(quoteBody)) {
        flushParagraph();
        continue;
      }
      current.push(quoteBody);
      continue;
    }

    current.push(trimmed);
  }
  flushParagraph();

  // Extract bullet features ONLY from a dedicated features/highlights section
  const features: string[] = [];
  const featureSectionMatch = readmeContent.match(
    /##\s+(?:[^\n]*?(?:Features|Highlights|Key Highlights|What it does|Capabilities))\s*\r?\n+([\s\S]*?)(?=\r?\n##|\r?\n#|$)/i
  );

  if (featureSectionMatch) {
    const sectionLines = featureSectionMatch[1].split(/\r?\n/);
    for (const sl of sectionLines) {
      const m = sl.trim().match(/^[-*]\s+(.+)/);
      if (m) {
        const cleaned = stripMarkdownFormatting(m[1]).trim();
        if (cleaned.length >= 12 && cleaned.length <= 160) {
          features.push(cleaned);
          if (features.length >= 5) break;
        }
      }
    }
  }

  return {
    headingTitle,
    firstParagraph: paragraphs[0],
    features,
  };
}

export function deriveCategory(repo: GitHubRepoMeta): ProjectCategory {
  const lower = repo.name.toLowerCase();
  if (
    lower.includes("android-app") ||
    lower.includes("andorid-app") ||
    lower.endsWith("-tv")
  ) {
    return "mobile-app";
  }
  if (lower.includes("windows-software") || lower.includes("windows-script")) {
    return "desktop-app";
  }
  if (lower.includes("extension") || lower.includes("formatter") || lower.includes("extractor")) {
    return "tool";
  }
  if (lower.includes("agent-workflow") || lower.includes("autopoweroff")) {
    return "automation";
  }
  if (
    lower.includes("game") ||
    lower.includes("the-hustle") ||
    lower.includes("3d-character") ||
    lower.includes("westeros") ||
    lower.includes("voxel")
  ) {
    return "game";
  }
  if (
    lower.includes("rag") ||
    lower.includes("analytics") ||
    lower.includes("auditor") ||
    lower.includes("forensic") ||
    lower.includes("evaluation") ||
    lower.includes("physiotrace") ||
    lower.includes("astronomy") ||
    lower.includes("aggregator")
  ) {
    return "data";
  }
  if (lower.includes("web-app") || Boolean(normalizeLiveUrl(repo.homepage))) {
    return "web-app";
  }
  return "other";
}

export function derivePlatforms(
  repo: GitHubRepoMeta,
  downloadPlatforms: string[],
  liveUrl?: string
): ProjectPlatform[] {
  const set = new Set<ProjectPlatform>();
  const lower = repo.name.toLowerCase();

  if (liveUrl || lower.includes("web-app")) set.add("web");
  if (lower.includes("windows")) set.add("windows");
  if (lower.includes("android") || lower.includes("andorid")) set.add("android");
  if (lower.includes("extension")) set.add("browser-extension");
  if (lower.includes("python-software")) set.add("cli");

  for (const p of downloadPlatforms) {
    if (
      p === "windows" ||
      p === "android" ||
      p === "macos" ||
      p === "linux" ||
      p === "browser-extension"
    ) {
      set.add(p);
    }
  }

  return Array.from(set);
}

export function deriveTech(repo: GitHubRepoMeta): string[] {
  const tech = new Set<string>();
  if (repo.language) tech.add(repo.language);
  for (const t of repo.topics || []) {
    if (t && tech.size < 6) {
      tech.add(t);
    }
  }
  return Array.from(tech);
}

export interface NormalizeAutoResult {
  project: Project;
  readmeContent: string | null;
}

export function normalizeGitHubRepoToProject(
  repo: GitHubRepoMeta,
  releases: GitHubReleaseMeta[],
  readmeContent: string | null,
  options: { includePrereleases?: boolean; owner?: string } = {}
): NormalizeAutoResult {
  const owner = options.owner || "smile-plzz";
  const slug = deriveSlug(repo.name);
  const readme = extractReadmeDetails(readmeContent);
  const liveUrl = normalizeLiveUrl(repo.homepage);
  const { downloads, releaseInfo } = parseReleaseAssets(releases, {
    includePrereleases: options.includePrereleases,
  });

  const provenance: Record<string, ShowcaseProvenanceSource> = {};

  // Name
  const name = readme.headingTitle || cleanHumanNameFromRepo(repo.name);
  provenance.name = readme.headingTitle ? "readme" : "github-api";

  // Tagline & Description: NEVER fabricate; leave empty if missing
  let tagline = "";
  if (repo.description && !/^https?:\/\//i.test(repo.description.trim())) {
    const cleanedDesc = stripMarkdownFormatting(repo.description);
    if (cleanedDesc.toLowerCase() !== name.toLowerCase() && cleanedDesc.length > 10) {
      tagline = cleanTagline(cleanedDesc, 120);
      provenance.tagline = "github-api";
    }
  }
  if (!tagline && readme.firstParagraph) {
    const firstSentence = readme.firstParagraph.split(/(?<=[.!?])\s+/)[0] || readme.firstParagraph;
    tagline = cleanTagline(firstSentence, 120);
    provenance.tagline = "readme";
  }

  let description = "";
  if (readme.firstParagraph) {
    description = readme.firstParagraph;
    provenance.description = "readme";
  } else if (repo.description && !/^https?:\/\//i.test(repo.description.trim())) {
    const cleanedDesc = stripMarkdownFormatting(repo.description);
    if (cleanedDesc.toLowerCase() !== name.toLowerCase() && cleanedDesc.length > 10) {
      description = cleanedDesc;
      provenance.description = "github-api";
    }
  }

  if (readme.features.length > 0) {
    provenance.features = "readme";
  }

  const category = deriveCategory(repo);
  provenance.category = "github-api";

  const platforms = derivePlatforms(
    repo,
    downloads.map((d) => d.platform),
    liveUrl
  );
  provenance.platforms = downloads.length > 0 ? "release" : "github-api";

  let status: ProjectStatus = "in-development";
  if (repo.archived) {
    status = "archived";
    provenance.status = "github-api";
  } else if (downloads.length > 0) {
    status = "downloadable";
    provenance.status = "release";
  } else if (liveUrl) {
    status = "live";
    provenance.status = "github-api";
  } else {
    status = "prototype";
    provenance.status = "github-api";
  }

  if (liveUrl) provenance.liveUrl = "github-api";
  if (downloads.length > 0) provenance.downloads = "release";

  const tech = deriveTech(repo);
  if (tech.length > 0) provenance.tech = "github-api";

  const license =
    repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION"
      ? repo.license.spdx_id
      : undefined;
  if (license) provenance.license = "github-api";

  const hasBinaryInstallers = downloads.some((d) =>
    ["windows", "android", "macos"].includes(d.platform)
  );

  const project: Project = {
    slug,
    name,
    tagline,
    description,
    features: readme.features,
    category,
    status,
    platforms,
    tech,
    screenshots: [],
    liveUrl,
    downloads,
    releaseInfo,
    safetyNote: hasBinaryInstallers,
    readmeFile: readmeContent ? `${slug}.md` : undefined,
    repo: {
      owner,
      name: repo.name,
      url: repo.html_url,
      license,
      defaultBranch: repo.default_branch || "main",
      isArchived: Boolean(repo.archived),
    },
    curated: false,
    needsReview: true,
    featured: false,
    updatedAt: repo.pushed_at,
    relatedWorks: [],
    relatedProjects: [],
    provenance,
  };

  return { project, readmeContent };
}
