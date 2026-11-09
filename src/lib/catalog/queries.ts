import fs from "fs";
import path from "path";
import { Catalog, Work } from "./schema";
import catalogData from "../../data/generated/catalog.json";

export function getCatalog(): Catalog {
  return catalogData as Catalog;
}

export function getAllWorks(): Work[] {
  return (catalogData as Catalog).works;
}

export function getFeaturedWorks(): Work[] {
  return getAllWorks().filter((w) => w.featured);
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug || w.id === slug);
}

export function getWorksByDomain(domainId: string): Work[] {
  return getAllWorks().filter((w) => w.domainId === domainId);
}

export function getManuscriptContent(slug: string): string | null {
  const manuscriptPath = path.join(
    process.cwd(),
    "src/content/generated/works",
    `${slug}.md`
  );
  if (fs.existsSync(manuscriptPath)) {
    try {
      return fs.readFileSync(manuscriptPath, "utf-8");
    } catch {
      return null;
    }
  }
  return null;
}

