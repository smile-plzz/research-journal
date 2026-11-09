import fs from "fs";
import path from "path";
import {
  Artifact,
  Author,
  Catalog,
  CatalogSchema,
  ProvenanceFieldSchema,
  RepositoryEdition,
  Work,
} from "../catalog/schema";
import { defaultAuthor, getDefaultAuthors } from "../../config/authors";
import {
  knownRepoRegistry,
  repositoryExclusionList,
  repositoryInclusionList,
} from "../../config/repositories";
import { parsePublicationManifest } from "../parsers/publication-manifest";
import { parseCitationCff } from "../parsers/citation-cff";
import { parseZenodoJson } from "../parsers/zenodo";
import { parseReadmeMarkdown } from "../parsers/readme-parser";
import { detectArchetype } from "../classification/detect-archetype";
import { findLocalPaperRepos, LocalRepoData } from "./local-source";

export interface SyncOptions {
  outputCatalogPath?: string;
  outputWorksDir?: string;
  forceLocal?: boolean;
}

export async function runIngestion(options: SyncOptions = {}): Promise<Catalog> {
  const catalogPath =
    options.outputCatalogPath ||
    path.join(process.cwd(), "src/data/generated/catalog.json");
  const worksDir =
    options.outputWorksDir ||
    path.join(process.cwd(), "src/content/generated/works");

  // Ensure directories exist
  fs.mkdirSync(path.dirname(catalogPath), { recursive: true });
  fs.mkdirSync(worksDir, { recursive: true });

  console.log("🔍 Scanning repositories for academic publication archive...");

  // 1. Fetch local repo sources
  const localRepos = findLocalPaperRepos();
  console.log(`Found ${localRepos.length} local repositories in paper_repos.`);

  // Grouping map: workId -> WorkBuilder
  interface WorkBuilder {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    abstract: string;
    abstractSource: any;
    authors: Author[];
    authorsSource: any;
    domainId: string;
    keywords: Set<string>;
    type: any;
    status: any;
    publishedAt?: string | null;
    publishedAtSource?: any;
    lastPushedAt: string;
    featured: boolean;
    archetype: any;
    methodologySummary?: string;
    manuscriptContent?: string;
    editions: RepositoryEdition[];
    artifacts: Artifact[];
    bibtexCitation?: string;
  }

  const workMap = new Map<string, WorkBuilder>();

  // Process all discovered repos
  for (const repo of localRepos) {
    if (repositoryExclusionList.includes(repo.name)) {
      console.log(`Skipping excluded repository: ${repo.name}`);
      continue;
    }

    const isExplicitlyIncluded = repositoryInclusionList.includes(repo.name);
    const hasPaperInName = repo.name.toLowerCase().includes("paper");

    if (!isExplicitlyIncluded && !hasPaperInName) {
      continue;
    }

    const registryConfig = knownRepoRegistry[repo.name];
    const archetype = registryConfig?.archetype || detectArchetype(repo.files);
    const workId = registryConfig?.workId || repo.name.replace(/-paper$/, "");
    const editionLabel = registryConfig?.editionLabel || "Main Edition";
    const domainId = registryConfig?.domainId || "ai-hci-tcra";
    const pubType = registryConfig?.publicationType || "working-paper";
    const pubStatus = registryConfig?.publicationStatus || "Working Paper";

    // Parse structured metadata in priority order
    const manifest = repo.manifestContent
      ? parsePublicationManifest(repo.manifestContent)
      : null;
    const citation = repo.citationContent
      ? parseCitationCff(repo.citationContent)
      : null;
    const zenodo = repo.zenodoContent
      ? parseZenodoJson(repo.zenodoContent)
      : null;
    const readme = repo.readmeContent
      ? parseReadmeMarkdown(repo.readmeContent)
      : null;

    // 1. Authors Extraction with Provenance
    let authors: Author[] = [];
    let authorsSource: any = {
      source: "config/authors.ts",
      method: "configured-default",
      verified: true,
    };

    if (manifest?.authors && manifest.authors.length > 0) {
      authors = manifest.authors;
      authorsSource = {
        source: ".publication.json",
        method: "manifest-explicit",
        verified: true,
      };
    } else if (citation?.authors && citation.authors.length > 0) {
      authors = citation.authors;
      authorsSource = {
        source: "CITATION.cff",
        method: "extracted",
        verified: true,
      };
    } else if (zenodo?.creators && zenodo.creators.length > 0) {
      authors = zenodo.creators;
      authorsSource = {
        source: ".zenodo.json",
        method: "extracted",
        verified: true,
      };
    } else {
      authors = getDefaultAuthors();
    }

    // 2. Title Extraction
    let title =
      manifest?.title ||
      citation?.title ||
      zenodo?.title ||
      readme?.title ||
      repo.name.replace(/-paper$/, "").replace(/[-_]/g, " ");

    // Clean markdown hashes or emojis from title
    title = title.replace(/^#+\s*/, "").replace(/^[🚗🎮🎵🏥📊]\s*/, "").trim();

    // 3. Abstract Extraction with Provenance
    let abstract = "";
    let abstractSource: any = {
      source: "README.md",
      method: "extracted",
      verified: false,
    };

    if (manifest?.abstract) {
      abstract = manifest.abstract;
      abstractSource = {
        source: ".publication.json",
        method: "manifest-explicit",
        verified: true,
      };
    } else if (citation?.abstract) {
      abstract = citation.abstract;
      abstractSource = {
        source: "CITATION.cff",
        method: "extracted",
        verified: true,
      };
    } else if (zenodo?.description) {
      abstract = zenodo.description;
      abstractSource = {
        source: ".zenodo.json",
        method: "extracted",
        verified: true,
      };
    } else if (readme?.abstract) {
      abstract = readme.abstract;
      abstractSource = {
        source: "README.md",
        method: "extracted",
        verified: false,
      };
    } else if (repo.contextContent) {
      // Extract from context.md if available
      const ctxLines = repo.contextContent.split("\n");
      const ctxMatch = repo.contextContent.match(/##\s+(?:Academic Investigation|Project Overview|Mission|Technical Scope)[\s\S]*?\n\n([\s\S]*?)(?=\n##|$)/i);
      if (ctxMatch) {
        abstract = ctxMatch[1].trim();
        abstractSource = {
          source: "context.md",
          method: "extracted",
          verified: false,
        };
      }
    }

    if (!abstract || abstract.length < 30) {
      abstract = `Academic research investigation and technical project covering ${title}. Full research documentation, analytical matrices, and supporting artifacts are available in the repository.`;
      abstractSource = {
        source: "heuristics",
        method: "heuristic-derived",
        verified: false,
      };
    }

    // 4. Keywords
    const keywordSet = new Set<string>();
    if (manifest?.keywords) manifest.keywords.forEach((k) => keywordSet.add(k));
    if (citation?.keywords) citation.keywords.forEach((k) => keywordSet.add(k));
    if (zenodo?.keywords) zenodo.keywords.forEach((k) => keywordSet.add(k));
    if (readme?.keywords) readme.keywords.forEach((k) => keywordSet.add(k));

    // 5. Artifacts Detection
    const artifacts: Artifact[] = [];
    const githubRepoUrl = repo.gitRemote || `https://github.com/smile-plzz/${repo.name}`;

    // GitHub repository artifact
    artifacts.push({
      id: `${repo.name}-repo`,
      label: `Repository (${editionLabel})`,
      type: "supplementary",
      url: githubRepoUrl,
      description: "Primary GitHub source repository containing code, docs, and git commit history.",
      isPublic: true,
    });

    // Detect PDFs, DOCX, presentation, and data files
    for (const relFile of repo.files) {
      const lower = relFile.toLowerCase();
      const filename = path.basename(relFile);

      if (lower.endsWith(".pdf") && !lower.includes("node_modules")) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `Manuscript (PDF) - ${filename}`,
          type: "pdf",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Compiled academic manuscript in PDF format.",
          isPublic: true,
        });
      } else if (lower.endsWith(".docx") && !lower.includes("node_modules")) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `Document (DOCX) - ${filename}`,
          type: "docx",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Compiled Word manuscript report.",
          isPublic: true,
        });
      } else if (lower.endsWith(".pptx")) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `Defense Presentation - ${filename}`,
          type: "presentation",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Academic thesis defense presentation slides.",
          isPublic: true,
        });
      } else if (lower.endsWith(".bib")) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `BibTeX Citations (${filename})`,
          type: "bibtex",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Complete scholarly citation reference database.",
          isPublic: true,
        });
      } else if (lower.endsWith(".geojson") || lower.endsWith("claims_ledger.csv")) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `Dataset (${filename})`,
          type: "dataset",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Primary research dataset / empirical claims ledger.",
          isPublic: true,
        });
      } else if (lower.endsWith(".html") && (lower.includes("dashboard") || lower.includes("map") || lower.includes("gap"))) {
        artifacts.push({
          id: `${repo.name}-${filename}`,
          label: `Interactive Map/Dashboard (${filename})`,
          type: "dashboard",
          url: `${githubRepoUrl}/blob/main/${relFile}`,
          description: "Interactive visual analytical tool or spatial choropleth map.",
          isPublic: true,
        });
      }
    }

    // Read manuscript content if available
    let manuscriptContent: string | undefined;
    const targetManuscriptFile = registryConfig?.primaryManuscriptFile;
    if (targetManuscriptFile) {
      const fullPath = path.join(repo.repoPath, targetManuscriptFile);
      if (fs.existsSync(fullPath)) {
        try {
          manuscriptContent = fs.readFileSync(fullPath, "utf-8");
        } catch {
          // ignore
        }
      }
    }

    // If no target manuscript specified, look for full research paper in files
    if (!manuscriptContent) {
      const candidateFiles = [
        "14_FULL_RESEARCH_PAPER.md",
        "12_FULL_RESEARCH_PAPER.md",
        "08_FULL_RESEARCH_PAPER.md",
        "digitally-cancelled-paper-draft.md",
        "paper/manuscript.md",
        "paper/draft.md",
        "README.md",
      ];
      for (const cf of candidateFiles) {
        const full = path.join(repo.repoPath, cf);
        if (fs.existsSync(full)) {
          manuscriptContent = fs.readFileSync(full, "utf-8");
          break;
        }
      }
    }

    const edition: RepositoryEdition = {
      repoName: repo.name,
      fullName: `smile-plzz/${repo.name}`,
      editionLabel,
      description: repo.readmeContent?.slice(0, 150) || undefined,
      htmlUrl: githubRepoUrl,
      stars: 0,
      forks: 0,
      pushedAt: repo.pushedAt,
      primaryLanguage: archetype === "modular-latex-thesis" ? "TeX" : "Python",
      archetype,
      hasManuscript: Boolean(manuscriptContent),
      isSubmissionCopy: repo.name.toLowerCase().includes("submissioncopy"),
    };

    // Grouping by workId
    if (!workMap.has(workId)) {
      workMap.set(workId, {
        id: workId,
        slug: workId,
        title,
        subtitle: readme?.subtitle,
        abstract,
        abstractSource,
        authors,
        authorsSource,
        domainId,
        keywords: keywordSet,
        type: pubType,
        status: pubStatus,
        publishedAt: citation?.dateReleased || zenodo?.publicationDate || null,
        publishedAtSource: {
          source: citation ? "CITATION.cff" : zenodo ? ".zenodo.json" : "heuristics",
          method: citation || zenodo ? "extracted" : "heuristic-derived",
          verified: Boolean(citation || zenodo),
        },
        lastPushedAt: repo.pushedAt,
        featured: registryConfig?.isFeatured ?? false,
        archetype,
        methodologySummary: readme?.methodology,
        manuscriptContent,
        editions: [edition],
        artifacts,
        bibtexCitation: readme?.bibtexCitation,
      });
    } else {
      // Append edition and merge artifacts
      const existing = workMap.get(workId)!;
      existing.editions.push(edition);
      for (const art of artifacts) {
        if (!existing.artifacts.some((a) => a.id === art.id)) {
          existing.artifacts.push(art);
        }
      }
      // If this edition is a submission copy or featured, prioritize its title/manuscript
      if (edition.isSubmissionCopy || (manuscriptContent && !existing.manuscriptContent)) {
        existing.manuscriptContent = manuscriptContent;
      }
      if (new Date(repo.pushedAt) > new Date(existing.lastPushedAt)) {
        existing.lastPushedAt = repo.pushedAt;
      }
    }
  }

  // Convert WorkBuilders into validated Works and save manuscripts
  const works: Work[] = [];
  for (const [id, wb] of workMap.entries()) {
    const slug = id;
    let manuscriptFile: string | undefined;

    // Cache manuscript separately
    if (wb.manuscriptContent) {
      manuscriptFile = `${slug}.md`;
      const manuscriptFilePath = path.join(worksDir, manuscriptFile);
      fs.writeFileSync(manuscriptFilePath, wb.manuscriptContent, "utf-8");
      console.log(`Saved manuscript for [${slug}] to ${manuscriptFilePath}`);
    }

    const wordCount = wb.manuscriptContent
      ? wb.manuscriptContent.split(/\s+/).filter(Boolean).length
      : undefined;
    const readingTimeMinutes = wordCount
      ? Math.max(1, Math.round(wordCount / 200))
      : undefined;

    // Build standard BibTeX if not present
    const firstAuthor = wb.authors[0]?.name || defaultAuthor.name;
    const bibtexAuthor = firstAuthor.includes(",")
      ? firstAuthor
      : firstAuthor.split(" ").slice(-1)[0] + ", " + firstAuthor.split(" ").slice(0, -1).join(" ");
    const defaultBibtex = `@article{${slug}_2026,
  author    = {${bibtexAuthor}},
  title     = {${wb.title}},
  year      = {2026},
  url       = {https://github.com/smile-plzz/${wb.editions[0]?.repoName || slug}},
  note      = {Academic Research Archive, Md. Ismail Hossain}
}`;

    const work: Work = {
      id,
      slug,
      title: wb.title,
      subtitle: wb.subtitle,
      abstract: wb.abstract,
      abstractProvenance: {
        value: wb.abstract,
        source: wb.abstractSource.source,
        method: wb.abstractSource.method,
        verified: wb.abstractSource.verified,
      },
      authors: wb.authors,
      authorsProvenance: {
        value: wb.authors,
        source: wb.authorsSource.source,
        method: wb.authorsSource.method,
        verified: wb.authorsSource.verified,
      },
      domainId: wb.domainId,
      keywords: Array.from(wb.keywords),
      type: wb.type,
      status: wb.status,
      publishedAt: wb.publishedAt || null,
      publishedAtProvenance: {
        value: wb.publishedAt || null,
        source: wb.publishedAtSource?.source || "heuristics",
        method: wb.publishedAtSource?.method || "heuristic-derived",
        verified: wb.publishedAtSource?.verified || false,
      },
      lastPushedAt: wb.lastPushedAt,
      featured: wb.featured,
      readingTimeMinutes,
      wordCount,
      archetype: wb.archetype,
      methodologySummary: wb.methodologySummary,
      manuscriptFile,
      editions: wb.editions,
      artifacts: wb.artifacts,
      bibtexCitation: wb.bibtexCitation || defaultBibtex,
      relatedWorkIds: [],
    };

    works.push(work);
  }

  // Sort works: featured first, then newest lastPushedAt
  works.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.lastPushedAt).getTime() - new Date(a.lastPushedAt).getTime();
  });

  const catalog: Catalog = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalWorks: works.length,
    totalRepositories: localRepos.length,
    works,
  };

  // Validate catalog schema
  const validated = CatalogSchema.parse(catalog);

  // Safeguard: Do not overwrite with empty catalog if we had valid works before
  if (validated.works.length === 0 && fs.existsSync(catalogPath)) {
    console.warn("⚠️ Ingestion produced 0 works! Preserving existing catalog.");
    const existing = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
    return existing;
  }

  fs.writeFileSync(catalogPath, JSON.stringify(validated, null, 2), "utf-8");
  console.log(`✅ Normalized catalog successfully written to: ${catalogPath} (${validated.works.length} works, ${validated.totalRepositories} repos)`);

  return validated;
}

