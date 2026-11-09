import { describe, it, expect } from "vitest";
import { detectArchetype } from "../../src/lib/classification/detect-archetype";

describe("Archetype Classification Engine", () => {
  it("classifies modular-latex-thesis when thesis.tex and chapter directories are present", () => {
    const files = [
      "thesis.tex",
      "abbr.tex",
      "bibfile.bib",
      "FrontMatter/title.tex",
      "Chap1/intro.tex",
      "Chap2/lit.tex",
    ];
    expect(detectArchetype(files)).toBe("modular-latex-thesis");
  });

  it("classifies numbered-stage-monograph when sequential numeric markdown files are present", () => {
    const files = [
      "00_PROJECT_README.md",
      "01_RESEARCH_BRIEF.md",
      "02_SEARCH_STRATEGY_AND_LOG.md",
      "03_ANNOTATED_BIBLIOGRAPHY.md",
      "12_FULL_RESEARCH_PAPER.md",
    ];
    expect(detectArchetype(files)).toBe("numbered-stage-monograph");
  });

  it("classifies open-science-investigative-corpus when claims, corpus and instruments are present", () => {
    const files = [
      "claims/CLAIMS_LEDGER.csv",
      "corpus/phase3_corpus.csv",
      "analysis/its/run_its.py",
      "instruments/survey.md",
    ];
    expect(detectArchetype(files)).toBe("open-science-investigative-corpus");
  });

  it("classifies computational-cultural-ecosystem when schemas and networks are present", () => {
    const files = [
      "data/schemas/artist.schema.json",
      "data/networks/bmpn-network.json",
      "analysis/scripts/analyze_bmpn.py",
      "web/package.json",
    ];
    expect(detectArchetype(files)).toBe("computational-cultural-ecosystem");
  });

  it("classifies geospatial-empirical-data-science when routing or GIS modules are present", () => {
    const files = [
      "src/geography/crs.py",
      "src/accessibility/catchment.py",
      "maps/kishoreganj_access_gap.html",
      "data/processed/scores.geojson",
    ];
    expect(detectArchetype(files)).toBe("geospatial-empirical-data-science");
  });
});

