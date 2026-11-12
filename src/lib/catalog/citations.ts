import { Work } from "./schema";

export type CitationFormat = "bibtex" | "apa" | "ieee" | "chicago";

export function formatWorkCitation(work: Work, format: CitationFormat): string {
  const authorNames = work.authors.map((a) => a.name).join(", ");
  const year = work.publishedAt
    ? new Date(work.publishedAt).getFullYear()
    : "2026";
  const repoUrl = `https://github.com/smile-plzz/${
    work.editions[0]?.repoName || work.slug
  }`;

  switch (format) {
    case "bibtex":
      return work.bibtexCitation || "";
    case "apa":
      return `${authorNames} (${year}). ${work.title}${
        work.subtitle ? `: ${work.subtitle}` : ""
      }. Research and Projects Archive. ${repoUrl}`;
    case "ieee":
      return `${work.authors
        .map((a) => {
          const parts = a.name.split(" ");
          return parts.length > 1
            ? `${parts[0][0]}. ${parts.slice(1).join(" ")}`
            : a.name;
        })
        .join(", ")}, "${work.title}," Research and Projects Archive, ${year}. [Online]. Available: ${repoUrl}`;
    case "chicago":
      return `${authorNames}. ${year}. "${work.title}." Research and Projects Archive. ${repoUrl}.`;
  }
}
