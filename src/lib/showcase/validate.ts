import { ShowcaseCatalog, ShowcaseCatalogSchema } from "./schema";

export interface ValidationIssue {
  level: "error" | "warning";
  slug: string;
  field: string;
  message: string;
}

export interface ShowcaseValidationReport {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export interface ValidateShowcaseOptions {
  strict?: boolean;
  checkUrls?: boolean;
  knownWorkSlugs?: string[];
  verifiedReleaseAssetUrls?: Record<string, string[]>;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function isGitHubReleaseAssetUrl(url: string, owner: string, repoName: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (parsed.hostname !== "github.com") return false;
    const prefix = `/${owner}/${repoName}/releases/download/`.toLowerCase();
    return parsed.pathname.toLowerCase().startsWith(prefix);
  } catch {
    return false;
  }
}

async function checkUrlReachable(url: string): Promise<{ ok: boolean; status?: number }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    }
    clearTimeout(timer);
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false };
  }
}

export async function validateShowcaseCatalog(
  catalog: ShowcaseCatalog,
  options: ValidateShowcaseOptions = {}
): Promise<ShowcaseValidationReport> {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const schemaCheck = ShowcaseCatalogSchema.safeParse(catalog);
  if (!schemaCheck.success) {
    for (const issue of schemaCheck.error.issues) {
      errors.push({
        level: "error",
        slug: "catalog",
        field: issue.path.join("."),
        message: issue.message,
      });
    }
  }

  const seenSlugs = new Set<string>();
  const knownWorks = options.knownWorkSlugs ? new Set(options.knownWorkSlugs) : null;

  for (const project of catalog.projects) {
    // 1. Duplicate slug check (always an error)
    if (seenSlugs.has(project.slug)) {
      errors.push({
        level: "error",
        slug: project.slug,
        field: "slug",
        message: `Duplicate project slug detected: "${project.slug}"`,
      });
    }
    seenSlugs.add(project.slug);

    // 2. Featured project completeness checks
    if (project.featured) {
      const target = options.strict ? errors : warnings;
      if (!project.tagline || project.tagline.trim().length < 10) {
        target.push({
          level: options.strict ? "error" : "warning",
          slug: project.slug,
          field: "tagline",
          message: `Featured project "${project.name}" is missing a plain-language tagline.`,
        });
      }
      if (!project.description || project.description.trim().length < 20) {
        target.push({
          level: options.strict ? "error" : "warning",
          slug: project.slug,
          field: "description",
          message: `Featured project "${project.name}" is missing a "What is this?" description.`,
        });
      }
      if (!project.features || project.features.length === 0) {
        target.push({
          level: options.strict ? "error" : "warning",
          slug: project.slug,
          field: "features",
          message: `Featured project "${project.name}" has no plain-language feature bullets.`,
        });
      }
    }

    // 3. Live URL syntax and optional reachability check
    if (project.liveUrl) {
      if (!isValidHttpUrl(project.liveUrl)) {
        errors.push({
          level: "error",
          slug: project.slug,
          field: "liveUrl",
          message: `Invalid liveUrl "${project.liveUrl}" on project "${project.slug}".`,
        });
      } else if (options.checkUrls) {
        const probe = await checkUrlReachable(project.liveUrl);
        if (!probe.ok) {
          const level = options.strict ? "error" : "warning";
          const bucket = options.strict ? errors : warnings;
          bucket.push({
            level,
            slug: project.slug,
            field: "liveUrl",
            message: `Unreachable liveUrl "${project.liveUrl}" (status: ${probe.status ?? "network-error"}).`,
          });
        }
      }
    }

    // 4. Download links must match real GitHub release asset patterns (or provided release asset list)
    const verifiedAssets = options.verifiedReleaseAssetUrls?.[project.repo.name];
    for (const dl of project.downloads) {
      const validFormat = isGitHubReleaseAssetUrl(
        dl.url,
        project.repo.owner,
        project.repo.name
      );
      if (!validFormat) {
        errors.push({
          level: "error",
          slug: project.slug,
          field: "downloads",
          message: `Download URL "${dl.url}" does not point to a direct release asset on ${project.repo.owner}/${project.repo.name}.`,
        });
      } else if (verifiedAssets && !verifiedAssets.includes(dl.url)) {
        errors.push({
          level: "error",
          slug: project.slug,
          field: "downloads",
          message: `Download URL "${dl.url}" does not match any verified release asset for ${project.repo.name}.`,
        });
      } else if (options.checkUrls) {
        const probe = await checkUrlReachable(dl.url);
        if (!probe.ok) {
          const level = options.strict ? "error" : "warning";
          const bucket = options.strict ? errors : warnings;
          bucket.push({
            level,
            slug: project.slug,
            field: "downloads",
            message: `Download asset "${dl.url}" returned HTTP ${probe.status ?? "error"}.`,
          });
        }
      }
    }

    // 5. Related works slugs must exist in research catalog if provided
    if (knownWorks && project.relatedWorks.length > 0) {
      for (const workSlug of project.relatedWorks) {
        if (!knownWorks.has(workSlug)) {
          errors.push({
            level: "error",
            slug: project.slug,
            field: "relatedWorks",
            message: `Related research slug "${workSlug}" does not exist in catalog.json.`,
          });
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

