import { ShowcaseEditorialOverride } from "@/config/showcase";
import { Project, ShowcaseProvenanceSource } from "./schema";

/**
 * Merges auto-discovered GitHub/README metadata with the editorial layer.
 * Editorial overrides always take precedence and update field provenance to `manual-override`.
 */
export function mergeProjectWithEditorial(
  autoProject: Project,
  editorial?: ShowcaseEditorialOverride
): Project {
  if (!editorial) {
    return autoProject;
  }

  const provenance: Record<string, ShowcaseProvenanceSource> = {
    ...autoProject.provenance,
  };

  const merged: Project = {
    ...autoProject,
    curated: true,
    needsReview: editorial.needsReview ?? false,
    provenance,
  };

  if (editorial.slug !== undefined) {
    merged.slug = editorial.slug;
    if (autoProject.readmeFile) {
      merged.readmeFile = `${editorial.slug}.md`;
    }
    provenance.slug = "manual-override";
  }

  if (editorial.name !== undefined) {
    merged.name = editorial.name;
    provenance.name = "manual-override";
  }

  if (editorial.tagline !== undefined) {
    merged.tagline = editorial.tagline;
    provenance.tagline = "manual-override";
  }

  if (editorial.description !== undefined) {
    merged.description = editorial.description;
    provenance.description = "manual-override";
  }

  if (editorial.audience !== undefined) {
    merged.audience = editorial.audience;
    provenance.audience = "manual-override";
  }

  if (editorial.features !== undefined) {
    merged.features = editorial.features;
    provenance.features = "manual-override";
  }

  if (editorial.category !== undefined) {
    merged.category = editorial.category;
    provenance.category = "manual-override";
  }

  if (editorial.status !== undefined) {
    merged.status = editorial.status;
    provenance.status = "manual-override";
  }

  if (editorial.platforms !== undefined) {
    merged.platforms = editorial.platforms;
    provenance.platforms = "manual-override";
  }

  if (editorial.tech !== undefined) {
    merged.tech = editorial.tech;
    provenance.tech = "manual-override";
  }

  if (editorial.cover !== undefined) {
    merged.cover = editorial.cover;
    provenance.cover = "manual-override";
  }

  if (editorial.screenshots !== undefined) {
    merged.screenshots = editorial.screenshots;
    provenance.screenshots = "manual-override";
  }

  if (editorial.screenshotAlts !== undefined) {
    merged.screenshotAlts = editorial.screenshotAlts;
  }

  if (editorial.liveUrl !== undefined) {
    merged.liveUrl = editorial.liveUrl;
    provenance.liveUrl = "manual-override";
  }

  if (editorial.safetyNote !== undefined) {
    merged.safetyNote = editorial.safetyNote;
  }

  if (editorial.statusNote !== undefined) {
    merged.statusNote = editorial.statusNote;
    provenance.statusNote = "manual-override";
  }

  if (editorial.featured !== undefined) {
    merged.featured = editorial.featured;
  }

  if (editorial.order !== undefined) {
    merged.order = editorial.order;
  }

  if (editorial.relatedWorks !== undefined) {
    merged.relatedWorks = editorial.relatedWorks;
  }

  if (editorial.relatedProjects !== undefined) {
    merged.relatedProjects = editorial.relatedProjects;
  }

  return merged;
}

/**
 * Resolves slug collisions cleanly without mutating explicit curated slugs.
 */
export function ensureUniqueSlugs(projects: Project[]): Project[] {
  const used = new Set<string>();
  return projects.map((project) => {
    let candidate = project.slug;
    if (!used.has(candidate)) {
      used.add(candidate);
      return project;
    }

    const fallbackBase = project.repo.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    candidate = used.has(fallbackBase) ? `${fallbackBase}-${project.repo.name.length}` : fallbackBase;

    let counter = 2;
    while (used.has(candidate)) {
      candidate = `${project.slug}-${counter}`;
      counter += 1;
    }
    used.add(candidate);
    return {
      ...project,
      slug: candidate,
      readmeFile: project.readmeFile ? `${candidate}.md` : undefined,
    };
  });
}

