import { z } from "zod";

export const ProjectCategoryEnum = z.enum([
  "web-app",
  "desktop-app",
  "mobile-app",
  "tool",
  "game",
  "automation",
  "data",
  "other",
]);
export type ProjectCategory = z.infer<typeof ProjectCategoryEnum>;

export const ProjectStatusEnum = z.enum([
  "live",
  "downloadable",
  "in-development",
  "prototype",
  "archived",
]);
export type ProjectStatus = z.infer<typeof ProjectStatusEnum>;

export const ProjectPlatformEnum = z.enum([
  "web",
  "windows",
  "android",
  "macos",
  "linux",
  "cli",
  "browser-extension",
]);
export type ProjectPlatform = z.infer<typeof ProjectPlatformEnum>;

export const ShowcaseProvenanceEnum = z.enum([
  "github-api",
  "readme",
  "manual-override",
  "release",
]);
export type ShowcaseProvenanceSource = z.infer<typeof ShowcaseProvenanceEnum>;

export const DownloadAssetSchema = z.object({
  label: z.string(),
  platform: z.string(),
  url: z.string().url(),
  fileName: z.string().optional(),
  size: z.string().optional(),
  sizeBytes: z.number().optional(),
  version: z.string().optional(),
  isPrerelease: z.boolean().default(false),
  sha256Url: z.string().url().optional(),
});
export type DownloadAsset = z.infer<typeof DownloadAssetSchema>;

export const ProjectReleaseInfoSchema = z.object({
  tag: z.string(),
  name: z.string().optional(),
  publishedAt: z.string().optional(),
  isPrerelease: z.boolean().default(false),
  releaseUrl: z.string().url(),
});
export type ProjectReleaseInfo = z.infer<typeof ProjectReleaseInfoSchema>;

export const ProjectRepoSchema = z.object({
  owner: z.string(),
  name: z.string(),
  url: z.string().url(),
  license: z.string().optional(),
  defaultBranch: z.string().default("main"),
  isArchived: z.boolean().default(false),
});
export type ProjectRepo = z.infer<typeof ProjectRepoSchema>;

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().max(160).default(""),
  description: z.string().default(""),
  audience: z.string().optional(),
  features: z.array(z.string()).default([]),
  category: ProjectCategoryEnum,
  status: ProjectStatusEnum,
  platforms: z.array(ProjectPlatformEnum).default([]),
  tech: z.array(z.string()).default([]),
  cover: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
  screenshotAlts: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional(),
  downloads: z.array(DownloadAssetSchema).default([]),
  releaseInfo: ProjectReleaseInfoSchema.optional(),
  safetyNote: z.boolean().default(false),
  statusNote: z.string().optional(),
  readmeFile: z.string().optional(),
  repo: ProjectRepoSchema,
  curated: z.boolean().default(false),
  needsReview: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().optional(),
  updatedAt: z.string(),
  relatedWorks: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  provenance: z.record(z.string(), ShowcaseProvenanceEnum),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ShowcaseCatalogSchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  totalProjects: z.number(),
  curatedCount: z.number(),
  featuredCount: z.number(),
  projects: z.array(ProjectSchema),
});
export type ShowcaseCatalog = z.infer<typeof ShowcaseCatalogSchema>;

export interface CategoryMeta {
  id: ProjectCategory;
  label: string;
  shortLabel: string;
  description: string;
  gradient: string;
}

export const PROJECT_CATEGORIES: CategoryMeta[] = [
  {
    id: "web-app",
    label: "Web Apps",
    shortLabel: "Web App",
    description: "Interactive applications that run directly in your browser with no installation.",
    gradient: "from-amber-100 via-stone-100 to-orange-50 dark:from-amber-950/50 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "desktop-app",
    label: "Desktop Software",
    shortLabel: "Desktop App",
    description: "Native Windows, macOS, and Linux applications you can download and run locally.",
    gradient: "from-stone-200 via-cream-100 to-amber-50 dark:from-stone-800 dark:via-stone-900 dark:to-amber-950/30",
  },
  {
    id: "mobile-app",
    label: "Mobile & TV Apps",
    shortLabel: "Mobile & TV",
    description: "Android and Android TV apps designed for phones, tablets, and living room screens.",
    gradient: "from-emerald-100 via-stone-100 to-teal-50 dark:from-emerald-950/40 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "tool",
    label: "Tools & Extensions",
    shortLabel: "Tool",
    description: "Focused utilities, browser extensions, and developer productivity helpers.",
    gradient: "from-sky-100 via-stone-100 to-slate-50 dark:from-sky-950/40 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "game",
    label: "Games & Interactive",
    shortLabel: "Game",
    description: "Browser games, interactive story worlds, and 3D visual experiments.",
    gradient: "from-rose-100 via-stone-100 to-amber-50 dark:from-rose-950/40 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "automation",
    label: "Automation & Workflows",
    shortLabel: "Automation",
    description: "Background scripts, schedulers, and AI routing workflows.",
    gradient: "from-violet-100 via-stone-100 to-stone-50 dark:from-violet-950/40 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "data",
    label: "Data & AI Systems",
    shortLabel: "Data & AI",
    description: "Analytics dashboards, retrieval systems, simulations, and data explorers.",
    gradient: "from-indigo-100 via-stone-100 to-slate-50 dark:from-indigo-950/40 dark:via-stone-900 dark:to-stone-900",
  },
  {
    id: "other",
    label: "Other Projects",
    shortLabel: "Project",
    description: "Experiments, sandboxes, and specialized software prototypes.",
    gradient: "from-stone-200 via-stone-100 to-cream-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-900",
  },
];

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; badgeClass: string }
> = {
  live: {
    label: "Live",
    badgeClass:
      "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
  },
  downloadable: {
    label: "Downloadable",
    badgeClass:
      "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800/60",
  },
  "in-development": {
    label: "In development",
    badgeClass:
      "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
  },
  prototype: {
    label: "Prototype",
    badgeClass:
      "bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-300 dark:border-stone-700",
  },
  archived: {
    label: "Archived",
    badgeClass:
      "bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-400 border-stone-200 dark:border-stone-800",
  },
};

export const PROJECT_PLATFORM_LABELS: Record<ProjectPlatform, string> = {
  web: "Web Browser",
  windows: "Windows",
  android: "Android",
  macos: "macOS",
  linux: "Linux",
  cli: "Command Line",
  "browser-extension": "Browser Extension",
};

export function getCategoryMeta(category: ProjectCategory): CategoryMeta {
  return (
    PROJECT_CATEGORIES.find((c) => c.id === category) ||
    PROJECT_CATEGORIES[PROJECT_CATEGORIES.length - 1]
  );
}

