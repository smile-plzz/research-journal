import fs from "fs";
import path from "path";
import { getAllWorks, getWorkBySlug } from "@/lib/catalog/queries";
import { Work } from "@/lib/catalog/schema";
import showcaseData from "../../data/generated/showcase.json";
import { Project, ProjectCategory, ShowcaseCatalog } from "./schema";

export function getShowcaseCatalog(): ShowcaseCatalog {
  return showcaseData as unknown as ShowcaseCatalog;
}

export function getAllProjects(): Project[] {
  return (showcaseData as unknown as ShowcaseCatalog).projects || [];
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getCuratedProjects(): Project[] {
  return getAllProjects().filter((p) => p.curated);
}

export function getUncuratedProjects(): Project[] {
  return getAllProjects().filter((p) => !p.curated);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

export function getProjectReadme(slug: string): string | null {
  const readmePath = path.join(
    process.cwd(),
    "src/content/generated/showcase",
    `${slug}.md`
  );
  if (fs.existsSync(readmePath)) {
    try {
      return fs.readFileSync(readmePath, "utf-8");
    } catch {
      return null;
    }
  }
  return null;
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const all = getAllProjects();
  if (project.relatedProjects && project.relatedProjects.length > 0) {
    const explicit = project.relatedProjects
      .map((s) => all.find((p) => p.slug === s))
      .filter((p): p is Project => Boolean(p));
    if (explicit.length > 0) return explicit.slice(0, limit);
  }

  return all
    .filter((p) => p.slug !== project.slug && p.category === project.category && p.curated)
    .slice(0, limit);
}

export function getRelatedWorksForProject(project: Project): Work[] {
  if (!project.relatedWorks || project.relatedWorks.length === 0) return [];
  return project.relatedWorks
    .map((slug) => getWorkBySlug(slug))
    .filter((w): w is Work => Boolean(w));
}

export function getRelatedProjectsForWork(workSlug: string): Project[] {
  const allWorks = getAllWorks();
  const target = allWorks.find((w) => w.slug === workSlug || w.id === workSlug);
  if (!target) return [];
  return getAllProjects().filter(
    (p) => p.relatedWorks?.includes(target.slug) || p.relatedWorks?.includes(target.id)
  );
}
