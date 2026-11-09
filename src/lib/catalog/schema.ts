import { z } from "zod";

export const ProvenanceSourceEnum = z.enum([
  ".publication.json",
  "CITATION.cff",
  ".zenodo.json",
  "README.md",
  "context.md",
  "config/authors.ts",
  "heuristics",
]);
export type ProvenanceSource = z.infer<typeof ProvenanceSourceEnum>;

export const ProvenanceMethodEnum = z.enum([
  "manifest-explicit",
  "extracted",
  "configured-default",
  "heuristic-derived",
]);
export type ProvenanceMethod = z.infer<typeof ProvenanceMethodEnum>;

export const ProvenanceFieldSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    value: schema,
    source: ProvenanceSourceEnum,
    method: ProvenanceMethodEnum,
    verified: z.boolean(),
  });

export const AuthorSchema = z.object({
  name: z.string(),
  affiliation: z.string().optional(),
  email: z.string().optional(),
  orcid: z.string().optional(),
  github: z.string().optional(),
});
export type Author = z.infer<typeof AuthorSchema>;

export const ArtifactTypeEnum = z.enum([
  "pdf",
  "docx",
  "latex",
  "markdown",
  "dataset",
  "dashboard",
  "presentation",
  "supplementary",
  "bibtex",
  "zenodo",
]);
export type ArtifactType = z.infer<typeof ArtifactTypeEnum>;

export const ArtifactSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: ArtifactTypeEnum,
  url: z.string(),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
  fileSize: z.string().optional(),
});
export type Artifact = z.infer<typeof ArtifactSchema>;

export const ArchetypeEnum = z.enum([
  "numbered-stage-monograph",
  "modular-latex-thesis",
  "geospatial-empirical-data-science",
  "computational-cultural-ecosystem",
  "open-science-investigative-corpus",
]);
export type Archetype = z.infer<typeof ArchetypeEnum>;

export const PublicationTypeEnum = z.enum([
  "thesis",
  "research-monograph",
  "empirical-study",
  "technical-report",
  "computational-study",
  "working-paper",
]);
export type PublicationType = z.infer<typeof PublicationTypeEnum>;

export const PublicationStatusEnum = z.enum([
  "Thesis",
  "Preprint",
  "Working Paper",
  "Submission Copy",
  "Published",
  "Research Monograph",
]);
export type PublicationStatus = z.infer<typeof PublicationStatusEnum>;

export const RepositoryEditionSchema = z.object({
  repoName: z.string(),
  fullName: z.string(),
  editionLabel: z.string(),
  description: z.string().optional(),
  htmlUrl: z.string(),
  stars: z.number().default(0),
  forks: z.number().default(0),
  pushedAt: z.string(),
  primaryLanguage: z.string().optional(),
  archetype: ArchetypeEnum,
  hasManuscript: z.boolean().default(false),
  isSubmissionCopy: z.boolean().optional(),
});
export type RepositoryEdition = z.infer<typeof RepositoryEditionSchema>;

export const WorkSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  abstract: z.string(),
  abstractProvenance: ProvenanceFieldSchema(z.string()),
  authors: z.array(AuthorSchema),
  authorsProvenance: ProvenanceFieldSchema(z.array(AuthorSchema)),
  domainId: z.string(),
  keywords: z.array(z.string()),
  type: PublicationTypeEnum,
  status: PublicationStatusEnum,
  publishedAt: z.string().nullable().optional(),
  publishedAtProvenance: ProvenanceFieldSchema(z.string().nullable()).optional(),
  lastPushedAt: z.string(),
  featured: z.boolean().default(false),
  readingTimeMinutes: z.number().optional(),
  wordCount: z.number().optional(),
  archetype: ArchetypeEnum,
  methodologySummary: z.string().optional(),
  manuscriptFile: z.string().optional(), // File name under src/content/generated/works/[slug].md
  editions: z.array(RepositoryEditionSchema),
  artifacts: z.array(ArtifactSchema),
  bibtexCitation: z.string().optional(),
  relatedWorkIds: z.array(z.string()).default([]),
});
export type Work = z.infer<typeof WorkSchema>;

export const CatalogSchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  totalWorks: z.number(),
  totalRepositories: z.number(),
  works: z.array(WorkSchema),
});
export type Catalog = z.infer<typeof CatalogSchema>;

