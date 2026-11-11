import { describe, expect, it } from "vitest";
import {
  convertLatexToReadableMarkdown,
  isLatexDocument,
  preprocessGithubMarkdown,
  resolveGitHubAssetUrl,
  resolveGitHubBlobUrl,
} from "@/lib/markdown/refine";
import {
  compareCellValues,
  tableToCsv,
  tableToMarkdown,
} from "@/lib/markdown/table-utils";
import {
  extractMarkdownHeadings,
  slugifyHeading,
} from "@/lib/markdown/reader-prefs";

describe("GitHub LaTeX & Markdown refinement", () => {
  it("detects LaTeX documents accurately", () => {
    const tex = `\\documentclass[12pt]{book}\n\\usepackage{amsmath}\n\\begin{document}\nHello\n\\end{document}`;
    expect(isLatexDocument(tex)).toBe(true);
    expect(isLatexDocument("# Standard Markdown\n\nWith some math $x + y$.")).toBe(false);
  });

  it("converts modular LaTeX thesis files into structured Markdown with tables and chapter list", () => {
    const tex = [
      "\\documentclass[12pt]{report}",
      "\\usepackage{amsmath}",
      "\\begin{document}",
      "% Preamble comment should disappear",
      "\\titlepage{TCRA Framework}{2026}{PMIT}{IIT JU}{2026}{Prof. Rahman}",
      "\\section*{\\begin{center} List of Notations \\end{center}}",
      "\\begin{tabular}{ll}",
      "T & Transparency score \\\\",
      "C & Controllability index \\\\",
      "\\end{tabular}",
      "\\chapter{Introduction}",
      "Some \\textbf{bold} and \\textit{italic} text with 100\\% coverage.",
      "\\input{Frontmatter/Abstract}",
      "\\input{Chap1/Chapter1}",
      "\\input{Appendices/AppendixA}",
      "\\end{document}",
    ].join("\n");

    const md = convertLatexToReadableMarkdown(tex);

    expect(md).not.toContain("\\usepackage");
    expect(md).not.toContain("Preamble comment should disappear");
    expect(md).toContain("# TCRA Framework");
    expect(md).toContain("## List of Notations");
    expect(md).toContain("| Symbol / Term | Meaning |");
    expect(md).toContain("| T | Transparency score |");
    expect(md).toContain("## Introduction");
    expect(md).toContain("Some **bold** and *italic* text with 100% coverage.");
    expect(md).toContain("## Modular Manuscript Structure (LaTeX Chapters)");
    expect(md).toContain("`Frontmatter/Abstract.tex`");
    expect(md).toContain("1. **Chapter 1:** `Chap1/Chapter1.tex`");
    expect(md).toContain("`Appendices/AppendixA.tex`");
  });

  it("strips AI Studio GHBanner, converts HTML centered figures, and resolves relative repo paths", () => {
    const raw = [
      '<div align="center"><img width="1200" alt="GHBanner" src="https://example.com/banner.png" /></div>',
      "",
      "# DedupeLight",
      "",
      '<p align="center">',
      '  <img src="assets/dedupelight.svg" width="120" alt="DedupeLight Logo" />',
      "  <br />",
      "  <sub>Fast duplicate scanner</sub>",
      "</p>",
      "",
      "See [Performance Notes](docs/PERFORMANCE.md) or [Anchor](#features) or [External](https://example.com).",
    ].join("\n");

    const refined = preprocessGithubMarkdown(raw, {
      repo: { owner: "smile-plzz", name: "DedupeLight", defaultBranch: "main" },
      stripLeadingHeading: true,
      stripAiStudioBanner: true,
    });

    expect(refined).not.toContain("GHBanner");
    expect(refined).not.toContain("# DedupeLight");
    expect(refined).toContain(
      "![DedupeLight Logo](https://raw.githubusercontent.com/smile-plzz/DedupeLight/main/assets/dedupelight.svg)"
    );
    expect(refined).toContain("*Fast duplicate scanner*");
    expect(refined).toContain(
      "[Performance Notes](https://github.com/smile-plzz/DedupeLight/blob/main/docs/PERFORMANCE.md)"
    );
    expect(refined).toContain("[Anchor](#features)");
    expect(refined).toContain("[External](https://example.com)");
  });

  it("normalizes relative repo asset and blob URLs cleanly", () => {
    const repo = { owner: "smile-plzz", name: "Luma", defaultBranch: "master" };
    expect(resolveGitHubAssetUrl("./docs/demo.gif", repo)).toBe(
      "https://raw.githubusercontent.com/smile-plzz/Luma/master/docs/demo.gif"
    );
    expect(resolveGitHubBlobUrl("LICENSE", repo)).toBe(
      "https://github.com/smile-plzz/Luma/blob/master/LICENSE"
    );
  });
});

describe("Interactive Markdown table utilities", () => {
  it("sorts numeric, percentage, and byte-unit strings accurately", () => {
    const sizes = ["800 MB", "1.5 GB", "200 KB"];
    const asc = [...sizes].sort((a, b) => compareCellValues(a, b, "asc"));
    expect(asc).toEqual(["200 KB", "800 MB", "1.5 GB"]);

    const pcts = ["9.2%", "98.4%", "12.5%"];
    const desc = [...pcts].sort((a, b) => compareCellValues(a, b, "desc"));
    expect(desc).toEqual(["98.4%", "12.5%", "9.2%"]);
  });

  it("exports filtered table rows to CSV and GFM Markdown cleanly", () => {
    const headers = ["Model", "Score", "Notes"];
    const rows = [
      ["Alpha", "94.5%", "Fast, local"],
      ['Beta "Pro"', "89.1%", "Pipe | check"],
    ];

    const csv = tableToCsv(headers, rows);
    expect(csv).toContain('"Fast, local"');
    expect(csv).toContain('"Beta ""Pro"""');

    const md = tableToMarkdown(headers, rows);
    expect(md).toContain("| Model | Score | Notes |");
    expect(md).toContain("Pipe \\| check");
  });
});

describe("Document reader heading extraction", () => {
  it("extracts headings and section previews while ignoring fenced code comments", () => {
    const md = [
      "# Overview",
      "",
      "Plain summary line for overview section.",
      "",
      "```bash",
      "# This bash comment is not a heading",
      "echo hello",
      "```",
      "",
      "## Architecture Details",
      "",
      "Uses modular pipeline.",
    ].join("\n");

    const headings = extractMarkdownHeadings(md);
    expect(headings).toHaveLength(2);
    expect(headings[0]).toEqual({
      id: "overview",
      text: "Overview",
      level: 1,
      preview: "Plain summary line for overview section.",
    });
    expect(headings[1]).toEqual({
      id: "architecture-details",
      text: "Architecture Details",
      level: 2,
      preview: "Uses modular pipeline.",
    });
    expect(slugifyHeading("How to Use (Windows & Linux)!")).toBe(
      "how-to-use-windows-linux"
    );
  });
});

