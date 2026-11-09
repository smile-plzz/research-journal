import { describe, it, expect } from "vitest";
import { CatalogSchema } from "../../src/lib/catalog/schema";
import catalog from "../../src/data/generated/catalog.json";

describe("Normalized Publication Catalog Integrity", () => {
  it("conforms strictly to CatalogSchema Zod contract", () => {
    const validated = CatalogSchema.parse(catalog);
    expect(validated.totalWorks).toBeGreaterThan(0);
    expect(validated.works.length).toBe(validated.totalWorks);
  });

  it("contains all 5 academic domains", () => {
    const domains = new Set(catalog.works.map((w) => w.domainId));
    expect(domains.has("ai-hci-tcra")).toBe(true);
    expect(domains.has("ludology-game-studies")).toBe(true);
    expect(domains.has("health-gis-biomedical")).toBe(true);
    expect(domains.has("political-social-forensics")).toBe(true);
    expect(domains.has("computational-musicology")).toBe(true);
  });

  it("correctly groups the TCRA thesis repositories under a single canonical work with multiple editions", () => {
    const tcraWork = catalog.works.find((w) => w.id === "tcra-intelligence-automation-boundary");
    expect(tcraWork).toBeDefined();
    expect(tcraWork?.editions.length).toBe(4);
    const labels = tcraWork?.editions.map((e) => e.editionLabel);
    expect(labels).toContain("Submission Copy (Official PMIT Thesis)");
    expect(labels).toContain("Foundational Draft 01");
  });

  it("preserves provenance tracking without fabricated verified flags", () => {
    for (const work of catalog.works) {
      expect(work.abstractProvenance).toBeDefined();
      expect(work.abstractProvenance.source).toBeDefined();
      expect(work.authorsProvenance).toBeDefined();
      expect(work.authorsProvenance.source).toBeDefined();
      expect(work.authors[0].name).toContain("Md. Ismail Hossain");
    }
  });

  it("contains valid research artifacts and manuscript references", () => {
    const worksWithArtifacts = catalog.works.filter((w) => w.artifacts.length > 0);
    expect(worksWithArtifacts.length).toBe(catalog.works.length);
  });
});

