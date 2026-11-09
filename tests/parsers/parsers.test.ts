import { describe, it, expect } from "vitest";
import { parsePublicationManifest } from "../../src/lib/parsers/publication-manifest";
import { parseCitationCff } from "../../src/lib/parsers/citation-cff";
import { parseReadmeMarkdown } from "../../src/lib/parsers/readme-parser";

describe("Metadata Parsers Suite", () => {
  describe("Publication Manifest Parser", () => {
    it("parses valid .publication.json correctly", () => {
      const manifestJson = JSON.stringify({
        schemaVersion: 1,
        workId: "tcra-framework",
        title: "TCRA: A Formal Framework",
        type: "thesis",
        status: "Thesis",
        abstract: "A formal study of LLM intelligence bounds.",
        authors: [{ name: "Md. Ismail Hossain", affiliation: "Jahangirnagar University" }],
        keywords: ["AI", "TCRA", "Trust"],
      });

      const parsed = parsePublicationManifest(manifestJson);
      expect(parsed).not.toBeNull();
      expect(parsed?.workId).toBe("tcra-framework");
      expect(parsed?.title).toBe("TCRA: A Formal Framework");
      expect(parsed?.authors?.[0].name).toBe("Md. Ismail Hossain");
    });

    it("gracefully returns null for invalid JSON", () => {
      const parsed = parsePublicationManifest("invalid { json");
      expect(parsed).toBeNull();
    });
  });

  describe("Citation CFF Parser", () => {
    it("parses YAML citation format with authors and keywords", () => {
      const rawCff = `
cff-version: 1.2.0
title: "Digitally Cancelled? Disinformation and Mass Mobilization"
abstract: "Longitudinal analysis of the 2024 political crisis in Bangladesh."
date-released: 2024-11-01
authors:
  - family-names: Hossain
    given-names: Md. Ismail
    affiliation: Jahangirnagar University
keywords:
  - Disinformation
  - Digital Forensics
`;
      const parsed = parseCitationCff(rawCff);
      expect(parsed).not.toBeNull();
      expect(parsed?.title).toContain("Digitally Cancelled");
      expect(parsed?.authors[0].name).toBe("Md. Ismail Hossain");
      expect(parsed?.keywords).toContain("Disinformation");
    });
  });

  describe("README Structured Parser", () => {
    it("extracts title, abstract, methodology and keywords from Markdown", () => {
      const markdown = `
# Dense EfficientNet with Grad-CAM

## Abstract
This study proposes an efficient convolutional architecture for MRI classification.

## Methodology
The model applies transfer learning on pre-trained EfficientNet weights with Grad-CAM layers.

**Keywords:** Brain Tumor, EfficientNet, Grad-CAM, MRI

\`\`\`bibtex
@article{tumor_2026,
  author = {Hossain, Md. Ismail},
  title = {Dense EfficientNet}
}
\`\`\`
`;
      const parsed = parseReadmeMarkdown(markdown);
      expect(parsed.title).toBe("Dense EfficientNet with Grad-CAM");
      expect(parsed.abstract).toContain("efficient convolutional architecture");
      expect(parsed.methodology).toContain("transfer learning");
      expect(parsed.keywords).toContain("Brain Tumor");
      expect(parsed.bibtexCitation).toContain("@article{tumor_2026");
    });
  });
});

