export interface ParsedReadme {
  title?: string;
  subtitle?: string;
  abstract?: string;
  methodology?: string;
  keywords: string[];
  bibtexCitation?: string;
}

export function parseReadmeMarkdown(content: string): ParsedReadme {
  const lines = content.split("\n");
  let title: string | undefined;
  let subtitle: string | undefined;
  let abstract: string | undefined;
  let methodology: string | undefined;
  const keywords: string[] = [];
  let bibtexCitation: string | undefined;

  // Extract first title heading
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("# ") && !title) {
      title = trimmed.replace(/^#\s+/, "").replace(/^[🚗🎮🎵🏥📊]\s*/, "").trim();
      // check next line for potential subtitle
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith("## ")) {
        subtitle = lines[i + 1].trim().replace(/^##\s+/, "").trim();
      }
      break;
    }
  }

  // Look for **Title:** or Title in context
  if (!title) {
    const titleMatch = content.match(/\*\*Title:\*\*\s*(.+)/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }
  }

  // Look for Abstract or Project Overview section
  const abstractMatch =
    content.match(/##\s+(?:Abstract|Project Overview|Executive Summary|Research Brief)\s*\n+([\s\S]*?)(?=\n##|\n#|$)/i);
  if (abstractMatch) {
    const raw = abstractMatch[1].trim();
    // Clean out markdown badges and images
    const cleaned = raw
      .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .trim();
    if (cleaned.length > 40) {
      abstract = cleaned;
    }
  }

  // Look for Methodology section
  const methodologyMatch = content.match(
    /##\s+(?:Methodology|Research Approach|Technical Scope|Architecture|Theoretical Framework)\s*\n+([\s\S]*?)(?=\n##|\n#|$)/i
  );
  if (methodologyMatch) {
    methodology = methodologyMatch[1].trim();
  }

  // Look for Keywords
  const keywordsMatch = content.match(/\*\*Keywords:\*\*\s*([^\n]+)/i);
  if (keywordsMatch) {
    const parts = keywordsMatch[1].split(/[,;]/).map((k) => k.trim());
    for (const p of parts) {
      if (p && !keywords.includes(p)) keywords.push(p);
    }
  }

  // Look for BibTeX citation block
  const bibtexMatch = content.match(/```bib(?:tex)?\s*([\s\S]*?)```/i);
  if (bibtexMatch) {
    bibtexCitation = bibtexMatch[1].trim();
  }

  return {
    title,
    subtitle,
    abstract,
    methodology,
    keywords,
    bibtexCitation,
  };
}

