export interface RepoSourceContext {
  owner: string;
  name: string;
  defaultBranch?: string;
}

export interface RefineMarkdownOptions {
  repo?: RepoSourceContext;
  stripLeadingHeading?: boolean;
  stripAiStudioBanner?: boolean;
}

export function isLatexDocument(content: string): boolean {
  const trimmed = content.trimStart();
  return (
    trimmed.startsWith("\\documentclass") ||
    trimmed.startsWith("\\begin{document}") ||
    (trimmed.includes("\\usepackage{") && trimmed.includes("\\begin{document}"))
  );
}

function cleanLatexProseSegment(text: string): string {
  return text
    .replace(/\\textbf\{([^}]*)\}/g, "**$1**")
    .replace(/\\textit\{([^}]*)\}/g, "*$1*")
    .replace(/\\emph\{([^}]*)\}/g, "*$1*")
    .replace(/\\textsc\{([^}]*)\}/g, "$1")
    .replace(/\\texttt\{([^}]*)\}/g, "`$1`")
    .replace(/\\url\{([^}]*)\}/g, "<$1>")
    .replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, "[$2]($1)")
    .replace(/\\&/g, "&")
    .replace(/\\%/g, "%")
    .replace(/\\_/g, "_");
}

function cleanLatexProseBody(markdown: string): string {
  // Split around $$...$$ and $...$ math expressions so KaTeX syntax stays intact
  const parts = markdown.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);
  return parts
    .map((part, idx) => (idx % 2 === 1 ? part : cleanLatexProseSegment(part)))
    .join("");
}

function cleanLatexInline(text: string): string {
  return cleanLatexProseSegment(text)
    .replace(/--/g, "-")
    .replace(/``/g, '"')
    .replace(/''/g, '"')
    .replace(/\\\\/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function convertLatexTabularToMarkdown(tabularBody: string): string {
  const rawLines = tabularBody
    .split(/\r?\n/)
    .map((l) => l.replace(/(?<!\\)%.*$/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("\\hline") && !l.startsWith("\\toprule") && !l.startsWith("\\midrule") && !l.startsWith("\\bottomrule"));

  const rows: string[][] = [];
  for (const line of rawLines) {
    const cleanedLine = line.replace(/\\\\\s*$/, "").trim();
    if (!cleanedLine.includes("&")) continue;
    const cells = cleanedLine.split("&").map((c) => cleanLatexInline(c));
    if (cells.length >= 2) {
      rows.push(cells);
    }
  }

  if (rows.length === 0) return "";

  const colCount = Math.max(...rows.map((r) => r.length));
  const normalizedRows = rows.map((r) => {
    const padded = [...r];
    while (padded.length < colCount) padded.push("");
    return padded;
  });

  const header =
    colCount === 2
      ? ["Symbol / Term", "Meaning"]
      : normalizedRows[0].map((_, idx) => `Column ${idx + 1}`);

  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...normalizedRows.map((r) => `| ${r.join(" | ")} |`),
  ];

  return lines.join("\n");
}

/**
 * Converts a modular or standalone LaTeX file (such as `thesis.tex`) into readable,
 * structured Markdown while preserving math expressions and tabular data.
 */
export function convertLatexToReadableMarkdown(tex: string): string {
  const lines = tex.split(/\r?\n/);
  const docStartIdx = lines.findIndex((l) => l.includes("\\begin{document}"));
  const bodySource =
    docStartIdx >= 0 ? lines.slice(docStartIdx + 1).join("\n") : tex;

  // Strip comments (keep escaped \%)
  let cleaned = bodySource
    .split(/\r?\n/)
    .filter((l) => !l.trimStart().startsWith("%"))
    .map((l) => l.replace(/(?<!\\)%.*$/, ""))
    .join("\n");

  // Extract \titlepage{Title}{ID}{Program}{Dept}{Date}{Advisor} if present
  cleaned = cleaned.replace(
    /\\titlepage\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\n?\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\n?\s*\{([^}]*)\}/g,
    (_, title, _id, program, dept, date, advisor) => {
      return [
        `# ${cleanLatexInline(title)}`,
        "",
        `- **Program:** ${cleanLatexInline(program)} (${cleanLatexInline(dept)})`,
        `- **Date:** ${cleanLatexInline(date)}`,
        `- **Supervisor:** ${cleanLatexInline(advisor)}`,
        "",
      ].join("\n");
    }
  );

  // Convert tabular environments into real sortable Markdown tables
  cleaned = cleaned.replace(
    /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_, body) => `\n${convertLatexTabularToMarkdown(body)}\n`
  );

  // Convert \section*{ \begin{center} TITLE \end{center} }
  cleaned = cleaned.replace(
    /\\section\*?\{\s*\\begin\{center\}\s*([\s\S]*?)\s*\\end\{center\}\s*\}/g,
    (_, title) => `\n## ${cleanLatexInline(title)}\n`
  );

  // Convert standard section/chapter commands
  cleaned = cleaned.replace(/\\chapter\*?\{([^}]*)\}/g, (_, t) => `\n## ${cleanLatexInline(t)}\n`);
  cleaned = cleaned.replace(/\\section\*?\{([^}]*)\}/g, (_, t) => `\n## ${cleanLatexInline(t)}\n`);
  cleaned = cleaned.replace(/\\subsection\*?\{([^}]*)\}/g, (_, t) => `\n### ${cleanLatexInline(t)}\n`);

  // Collect \input{...} chapter/frontmatter references into readable sections
  const frontMatterInputs: string[] = [];
  const chapterInputs: string[] = [];
  const appendixInputs: string[] = [];

  cleaned = cleaned.replace(/\\input\{([^}]+)\}/g, (_, target: string) => {
    const cleanTarget = target.trim();
    if (/frontmatter|abstract/i.test(cleanTarget)) {
      frontMatterInputs.push(cleanTarget);
    } else if (/appendix/i.test(cleanTarget)) {
      appendixInputs.push(cleanTarget);
    } else {
      chapterInputs.push(cleanTarget);
    }
    return "";
  });

  // Strip structural LaTeX macros that produce empty/noise lines in plain text
  const noiseCommands = [
    /\\end\{document\}/g,
    /\\initializefrontsections/g,
    /\\startdeclarationpage/g,
    /\\startcertificatepage/g,
    /\\startacknowledgementspage/g,
    /\\startabstractpage/g,
    /\\listofabbreviations/g,
    /\\listofnotations/g,
    /\\listoffigures/g,
    /\\listoftables/g,
    /\\listofappendices/g,
    /\\tableofcontents/g,
    /\\printnomenclature(\[[^\]]*\])?/g,
    /\\startthechapters/g,
    /\\startappendices/g,
    /\\bibliographystyle\{[^}]*\}/g,
    /\\bibliography\{[^}]*\}/g,
    /\\label\{[^}]*\}/g,
    /\\makeatletter[\s\S]*?\\makeatother/g,
  ];
  for (const re of noiseCommands) {
    cleaned = cleaned.replace(re, "");
  }

  cleaned = cleanLatexProseBody(cleaned);
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").trim();

  const extraSections: string[] = [];
  if (frontMatterInputs.length > 0 || chapterInputs.length > 0 || appendixInputs.length > 0) {
    extraSections.push("## Modular Manuscript Structure (LaTeX Chapters)");
    extraSections.push(
      "This thesis is compiled from modular `.tex` chapter files in the source repository. Use the links in the **Associated Research Editions** or **Artifacts** section to open the compiled PDF or inspect individual chapter files."
    );
    if (frontMatterInputs.length > 0) {
      extraSections.push("");
      extraSections.push("### Front Matter & Abstract");
      frontMatterInputs.forEach((f) => extraSections.push(`- \`${f}.tex\``));
    }
    if (chapterInputs.length > 0) {
      extraSections.push("");
      extraSections.push("### Thesis Chapters");
      chapterInputs.forEach((c, idx) =>
        extraSections.push(`${idx + 1}. **Chapter ${idx + 1}:** \`${c.endsWith(".tex") ? c : `${c}.tex`}\``)
      );
    }
    if (appendixInputs.length > 0) {
      extraSections.push("");
      extraSections.push("### Appendices");
      appendixInputs.forEach((a) => extraSections.push(`- \`${a.endsWith(".tex") ? a : `${a}.tex`}\``));
    }
  }

  if (extraSections.length > 0) {
    cleaned = `${cleaned}\n\n${extraSections.join("\n")}`.trim();
  }

  return cleaned;
}

function isRelativePath(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith("/") ||
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed) ||
    /^data:/i.test(trimmed)
  ) {
    return false;
  }
  return true;
}

export function resolveGitHubAssetUrl(
  relativePath: string,
  repo: RepoSourceContext
): string {
  const clean = relativePath.trim().replace(/^\.\//, "").replace(/^\/+/, "");
  const branch = repo.defaultBranch || "main";
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${branch}/${clean}`;
}

export function resolveGitHubBlobUrl(
  relativePath: string,
  repo: RepoSourceContext
): string {
  const clean = relativePath.trim().replace(/^\.\//, "").replace(/^\/+/, "");
  const branch = repo.defaultBranch || "main";
  return `https://github.com/${repo.owner}/${repo.name}/blob/${branch}/${clean}`;
}

function extractHtmlAttribute(tag: string, attr: string): string | undefined {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i");
  const m = tag.match(re);
  return m?.[1];
}

/**
 * Refines raw GitHub Markdown / LaTeX into clean, readable Markdown with
 * normalized HTML image wrappers, resolved repository links/images, and
 * clean structure for interactive viewing.
 */
export function preprocessGithubMarkdown(
  rawContent: string,
  options: RefineMarkdownOptions = {}
): string {
  if (!rawContent) return "";

  let content = rawContent.replace(/\r\n/g, "\n");

  if (isLatexDocument(content)) {
    content = convertLatexToReadableMarkdown(content);
  }

  // Optionally drop Google AI Studio placeholder GHBanner wrappers
  if (options.stripAiStudioBanner !== false) {
    content = content.replace(
      /<div[^>]*>\s*<img[^>]*alt=["']GHBanner["'][^>]*>\s*<\/div>/gi,
      ""
    );
  }

  // Convert <p align="center"> ... <img ...> ... <sub>caption</sub> </p> into clean Markdown image + caption
  content = content.replace(
    /<p[^>]*>\s*(<img[^>]*>)(?:\s*<br\s*\/?>)?(?:\s*<sub>([\s\S]*?)<\/sub>)?\s*<\/p>/gi,
    (_match, imgTag: string, subText?: string) => {
      const src = extractHtmlAttribute(imgTag, "src") || "";
      const alt = extractHtmlAttribute(imgTag, "alt") || "Project visual";
      const resolvedSrc =
        options.repo && isRelativePath(src)
          ? resolveGitHubAssetUrl(src, options.repo)
          : src;
      const lines = [`![${alt}](${resolvedSrc})`];
      if (subText && subText.trim()) {
        lines.push(`*${subText.trim()}*`);
      }
      return lines.join("\n\n");
    }
  );

  // Convert standalone <div align="center"><img ...></div> or standalone <img ...>
  content = content.replace(
    /<div[^>]*>\s*(<img[^>]*>)\s*<\/div>/gi,
    (_match, imgTag: string) => imgTag
  );

  content = content.replace(/<img\b[^>]*>/gi, (imgTag: string) => {
    const src = extractHtmlAttribute(imgTag, "src");
    if (!src) return "";
    const alt = extractHtmlAttribute(imgTag, "alt") || "Image";
    if (options.stripAiStudioBanner !== false && alt === "GHBanner") {
      return "";
    }
    const resolvedSrc =
      options.repo && isRelativePath(src)
        ? resolveGitHubAssetUrl(src, options.repo)
        : src;
    return `![${alt}](${resolvedSrc})`;
  });

  // Clean harmless HTML wrappers left inside markdown
  content = content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(?:p|div)(?:\s+[^>]*)?>/gi, "\n")
    .replace(/<sub>([\s\S]*?)<\/sub>/gi, "*$1*");

  // Rewrite relative Markdown images & links when repository context is provided
  if (options.repo) {
    const repo = options.repo;
    // Images: ![alt](path)
    content = content.replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
      (full, alt: string, target: string, title?: string) => {
        if (!isRelativePath(target)) return full;
        const resolved = resolveGitHubAssetUrl(target, repo);
        return title ? `![${alt}](${resolved} "${title}")` : `![${alt}](${resolved})`;
      }
    );

    // Links: [label](path) (negative lookbehind avoids images)
    content = content.replace(
      /(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
      (full, label: string, target: string, title?: string) => {
        if (!isRelativePath(target)) return full;
        const resolved = resolveGitHubBlobUrl(target, repo);
        return title ? `[${label}](${resolved} "${title}")` : `[${label}](${resolved})`;
      }
    );
  }

  // Strip duplicate top-level H1 heading when requested (page hero already displays it)
  if (options.stripLeadingHeading) {
    content = content.replace(/^\s*#\s+[^\n]+\n+/, "");
  }

  return content.replace(/\n{3,}/g, "\n\n").trim();
}

