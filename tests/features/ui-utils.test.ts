import { describe, expect, it } from "vitest";
import { filterAndRankSearch, scoreSearchMatch } from "../../src/lib/search/fuzzy";
import { hasMathExpression } from "../../src/lib/markdown/has-math";
import { formatRelativeDate, formatShortDate } from "../../src/lib/format-date";
import { curatedCollections } from "../../src/config/collections";
import { getWorkBySlug } from "../../src/lib/catalog/queries";
import { getProjectBySlug } from "../../src/lib/showcase/queries";

describe("Unified search fuzzy matching", () => {
  const items = [
    {
      title: "Luma",
      summary: "Native Windows media library for organizing photos and videos",
      meta: "Desktop App",
      tags: ["Windows", "C#", "WPF"],
    },
    {
      title: "TCRA: Intelligence-Automation Boundary",
      summary: "Framework for evaluating Transparency, Controllability, Reliability, Auditability",
      meta: "AI & HCI",
      tags: ["TCRA", "LLM", "Software Engineering"],
    },
  ];

  it("ranks exact and prefix title matches higher than fuzzy or summary matches", () => {
    const ranked = filterAndRankSearch(items, "luma");
    expect(ranked.length).toBeGreaterThanOrEqual(1);
    expect(ranked[0].title).toBe("Luma");
    expect(scoreSearchMatch(items[0], "luma")).toBeGreaterThan(
      scoreSearchMatch(items[1], "luma")
    );
  });

  it("supports subsequence fuzzy queries on titles", () => {
    expect(scoreSearchMatch(items[0], "lma")).toBeGreaterThan(0);
    expect(scoreSearchMatch(items[1], "tcra llm")).toBeGreaterThan(0);
  });

  it("returns empty when query does not match", () => {
    expect(filterAndRankSearch(items, "xyznonexistent")).toEqual([]);
  });
});

describe("Math expression detection for conditional KaTeX loading", () => {
  it("detects display and inline LaTeX math", () => {
    expect(hasMathExpression("Value is $$x^2 + y^2$$")).toBe(true);
    expect(hasMathExpression("Inline $\\alpha + \\beta$ term")).toBe(true);
    expect(hasMathExpression("\\[E = mc^2\\]")).toBe(true);
  });

  it("ignores currency dollar signs and fenced code blocks", () => {
    expect(hasMathExpression("Costs $100 or $250 per license.")).toBe(false);
    expect(hasMathExpression("```tex\n$$x^2$$\n```")).toBe(false);
  });
});

describe("Date formatting helpers", () => {
  it("formats valid ISO dates cleanly", () => {
    expect(formatShortDate("2026-03-15T10:00:00Z")).toContain("2026");
    expect(formatRelativeDate(new Date().toISOString())).toBeTruthy();
  });

  it("handles invalid dates gracefully", () => {
    expect(formatShortDate("not-a-date")).toBe("");
    expect(formatRelativeDate("not-a-date")).toBe("");
  });
});

describe("Curated collections integrity", () => {
  it("resolves every referenced work and project slug", () => {
    for (const collection of curatedCollections) {
      for (const ref of collection.items) {
        if (ref.kind === "work") {
          expect(getWorkBySlug(ref.slug)).toBeDefined();
        } else {
          expect(getProjectBySlug(ref.slug)).toBeDefined();
        }
      }
    }
  });
});
