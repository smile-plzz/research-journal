import { Archetype } from "../catalog/schema";

export function detectArchetype(fileList: string[]): Archetype {
  const normalized = fileList.map((f) => f.toLowerCase().replace(/\\/g, "/"));

  // Check 1: Modular LaTeX Thesis
  const hasThesisTex = normalized.some((f) => f.endsWith("thesis.tex"));
  const hasChapDirs = normalized.some((f) => f.includes("chap1") || f.includes("chap2"));
  if (hasThesisTex || hasChapDirs) {
    return "modular-latex-thesis";
  }

  // Check 2: Numbered Stage Monograph
  const numberedCount = normalized.filter((f) =>
    /^\d{2}_[a-z0-9_]+\.md$/i.test(f.split("/").pop() || "")
  ).length;
  if (numberedCount >= 3) {
    return "numbered-stage-monograph";
  }

  // Check 3: Open Science Investigative Corpus
  const hasClaimsOrCorpus = normalized.some(
    (f) =>
      f.startsWith("claims/") ||
      f.startsWith("corpus/") ||
      f.startsWith("instruments/") ||
      f.startsWith("panel/") ||
      f.includes("claims_ledger") ||
      f.includes("its_regression")
  );
  if (hasClaimsOrCorpus) {
    return "open-science-investigative-corpus";
  }

  // Check 4: Computational Cultural Ecosystem
  const hasCulturalEcosystem = normalized.some(
    (f) =>
      f.startsWith("data/schemas") ||
      f.startsWith("data/networks") ||
      f.startsWith("data/artists") ||
      f.startsWith("analysis/scripts") ||
      f.startsWith("frameworks/") ||
      f.includes("bmpn")
  );
  if (hasCulturalEcosystem) {
    return "computational-cultural-ecosystem";
  }

  // Check 5: Geospatial Empirical Data Science
  const hasDataScience = normalized.some(
    (f) =>
      f.startsWith("src/geography") ||
      f.startsWith("src/accessibility") ||
      f.startsWith("maps/") ||
      f.includes("gradcam.py") ||
      f.includes("evaluate.py") ||
      f.includes("model.py") ||
      f.includes("traffic")
  );
  if (hasDataScience) {
    return "geospatial-empirical-data-science";
  }

  // Fallback defaults
  return "geospatial-empirical-data-science";
}

export function getArchetypeDescription(archetype: Archetype): string {
  switch (archetype) {
    case "modular-latex-thesis":
      return "Modular academic LaTeX thesis architecture with structured chapters, mathematical formalisms, and university defense records.";
    case "numbered-stage-monograph":
      return "Numbered-stage academic monograph pipeline tracing literature synthesis, analytical matrices, peer reviews, and full long-form manuscript.";
    case "geospatial-empirical-data-science":
      return "Empirical data science pipeline featuring geospatial routing modules, inequality metrics, and reproducible computational workflows.";
    case "computational-cultural-ecosystem":
      return "Computational cultural informatics system with network graphs, JSON schemas, influence matrices, and interactive dashboards.";
    case "open-science-investigative-corpus":
      return "Open-science digital forensics corpus containing verified claims ledgers, longitudinal panel data, and preprint packages.";
  }
}

