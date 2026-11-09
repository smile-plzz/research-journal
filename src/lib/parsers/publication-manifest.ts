import { z } from "zod";
import {
  ArchetypeEnum,
  ArtifactSchema,
  AuthorSchema,
  PublicationStatusEnum,
  PublicationTypeEnum,
} from "../catalog/schema";

export const PublicationManifestSchema = z.object({
  schemaVersion: z.number().default(1),
  workId: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  type: PublicationTypeEnum.optional(),
  status: PublicationStatusEnum.optional(),
  abstract: z.string().optional(),
  authors: z.array(AuthorSchema).optional(),
  publishedAt: z.string().nullable().optional(),
  domains: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  archetype: ArchetypeEnum.optional(),
  primaryManuscriptPath: z.string().optional(),
  artifacts: z.array(ArtifactSchema).optional(),
  relatedRepositories: z.array(z.string()).optional(),
  relatedWorks: z.array(z.string()).optional(),
});

export type PublicationManifest = z.infer<typeof PublicationManifestSchema>;

export function parsePublicationManifest(
  rawJson: string
): PublicationManifest | null {
  try {
    const parsed = JSON.parse(rawJson);
    return PublicationManifestSchema.parse(parsed);
  } catch (error) {
    console.warn("Failed to parse .publication.json:", error);
    return null;
  }
}

