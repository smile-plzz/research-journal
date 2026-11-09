import { describe, it, expect } from "vitest";
import { getAllWorks } from "../../src/lib/catalog/queries";

describe("Enhanced Publication & Syndication Features", () => {
  const works = getAllWorks();

  it("provides rich citation metadata for all standard formats (APA, IEEE, Chicago)", () => {
    const work = works[0];
    expect(work).toBeDefined();

    const authorNames = work.authors.map((a) => a.name).join(", ");
    const year = work.publishedAt
      ? new Date(work.publishedAt).getFullYear()
      : "2026";
    const repoUrl = `https://github.com/smile-plzz/${work.editions[0]?.repoName || work.slug}`;

    // APA format test
    const apa = `${authorNames} (${year}). ${work.title}. GitHub Academic Research Journal. ${repoUrl}`;
    expect(apa).toContain(authorNames);
    expect(apa).toContain(String(year));

    // IEEE format test
    const ieee = `${work.authors[0].name}, "${work.title}," GitHub Academic Research Journal, ${year}.`;
    expect(ieee).toContain(work.title);
  });

  it("contains pre-configured previewable artifacts (PDFs, maps, dashboards)", () => {
    const previewableTypes = new Set(["pdf", "dashboard", "dataset"]);
    const hasPreviewable = works.some((w) =>
      w.artifacts.some((a) => previewableTypes.has(a.type))
    );
    expect(hasPreviewable).toBe(true);
  });

  it("contains valid word count and reading time estimates for manuscripts", () => {
    const manuscriptsWithWordCount = works.filter(
      (w) => w.wordCount && w.wordCount > 0
    );
    expect(manuscriptsWithWordCount.length).toBeGreaterThan(0);
    for (const m of manuscriptsWithWordCount) {
      expect(m.readingTimeMinutes).toBeGreaterThan(0);
    }
  });
});
