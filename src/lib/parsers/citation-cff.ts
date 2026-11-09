import YAML from "yaml";
import { Author } from "../catalog/schema";

export interface ParsedCitationCff {
  title?: string;
  abstract?: string;
  doi?: string;
  authors: Author[];
  dateReleased?: string;
  keywords: string[];
}

export function parseCitationCff(rawYaml: string): ParsedCitationCff | null {
  try {
    const data = YAML.parse(rawYaml);
    if (!data || typeof data !== "object") return null;

    const authors: Author[] = [];
    if (Array.isArray(data.authors)) {
      for (const a of data.authors) {
        if (!a) continue;
        let name = a.name;
        if (!name && (a["given-names"] || a["family-names"])) {
          name = `${a["given-names"] || ""} ${a["family-names"] || ""}`.trim();
        }
        if (name) {
          authors.push({
            name,
            affiliation: a.affiliation,
            orcid: a.orcid,
            email: a.email,
          });
        }
      }
    }

    const keywords: string[] = Array.isArray(data.keywords)
      ? data.keywords.map(String)
      : [];

    return {
      title: typeof data.title === "string" ? data.title : undefined,
      abstract: typeof data.abstract === "string" ? data.abstract : undefined,
      doi: typeof data.doi === "string" ? data.doi : undefined,
      authors,
      dateReleased: data["date-released"] ? String(data["date-released"]) : undefined,
      keywords,
    };
  } catch (error) {
    console.warn("Failed to parse CITATION.cff:", error);
    return null;
  }
}

