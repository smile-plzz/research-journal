import { Author } from "../catalog/schema";

export interface ParsedZenodo {
  title?: string;
  description?: string;
  creators: Author[];
  keywords: string[];
  publicationDate?: string;
}

export function parseZenodoJson(rawJson: string): ParsedZenodo | null {
  try {
    const data = JSON.parse(rawJson);
    if (!data || typeof data !== "object") return null;

    const creators: Author[] = [];
    if (Array.isArray(data.creators)) {
      for (const c of data.creators) {
        if (!c || !c.name) continue;
        creators.push({
          name: c.name,
          affiliation: c.affiliation,
          orcid: c.orcid,
        });
      }
    }

    const keywords: string[] = Array.isArray(data.keywords)
      ? data.keywords.map(String)
      : [];

    return {
      title: typeof data.title === "string" ? data.title : undefined,
      description: typeof data.description === "string" ? data.description : undefined,
      creators,
      keywords,
      publicationDate:
        typeof data.publication_date === "string"
          ? data.publication_date
          : undefined,
    };
  } catch (error) {
    console.warn("Failed to parse .zenodo.json:", error);
    return null;
  }
}

