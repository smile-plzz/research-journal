import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import {
  Project,
  PROJECT_PLATFORM_LABELS,
  PROJECT_STATUS_META,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import { formatRelativeDate } from "@/lib/format-date";
import { Chip, ChipList } from "@/components/ui/Chip";

export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "name"
  | "tagline"
  | "description"
  | "category"
  | "status"
  | "platforms"
  | "tech"
  | "cover"
  | "liveUrl"
  | "downloads"
  | "updatedAt"
  | "curated"
  | "needsReview"
  | "featured"
  | "order"
>;

interface ProjectCardProps {
  project: ProjectCardData;
  showCover?: boolean;
}

export function ProjectCard({ project, showCover = false }: ProjectCardProps) {
  const categoryMeta = getCategoryMeta(project.category);
  const statusMeta = PROJECT_STATUS_META[project.status];
  const primaryDownload = project.downloads[0];
  const summaryText =
    project.tagline ||
    project.description ||
    "Open details to see how it works.";
  const updatedLabel = formatRelativeDate(project.updatedAt);

  const platformBadge = project.liveUrl
    ? "Web"
    : project.platforms[0]
    ? PROJECT_PLATFORM_LABELS[project.platforms[0]] || project.platforms[0]
    : null;

  const isDev = process.env.NODE_ENV === "development";

  return (
    <article className="rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors duration-150 flex flex-col justify-between overflow-hidden">
      <div>
        {showCover && project.cover && (
          <Link
            href={`/showcase/${project.slug}`}
            className="block relative w-full aspect-[16/9] bg-surface-muted border-b border-hairline overflow-hidden"
            aria-label={`Open ${project.name}`}
          >
            <Image
              src={project.cover}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </Link>
        )}

        <div className="p-5 space-y-3">
          {/* Quiet metadata line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-secondary">
            <span>{categoryMeta.shortLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{statusMeta.label}</span>
            {platformBadge && (
              <>
                <span aria-hidden="true">·</span>
                <span>{platformBadge}</span>
              </>
            )}
            {updatedLabel && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {updatedLabel}</span>
              </>
            )}
            {isDev && project.needsReview && (
              <Chip className="ml-auto">Needs review</Chip>
            )}
          </div>

          {/* Title + one-line summary */}
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">
              <Link
                href={`/showcase/${project.slug}`}
                className="hover:text-accent transition-colors duration-150"
              >
                {project.name}
              </Link>
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2">
              {summaryText}
            </p>
          </div>

          {/* Max 2 visible tags + "+N" */}
          <ChipList items={project.tech} maxVisible={2} />
        </div>
      </div>

      {/* Quiet footer action */}
      <div className="px-5 py-3 border-t border-hairline flex items-center justify-between gap-3 text-sm">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <span>Try live</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        ) : primaryDownload ? (
          <a
            href={primaryDownload.url}
            className="min-h-[44px] inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Download</span>
          </a>
        ) : (
          <Link
            href={`/showcase/${project.slug}`}
            className="min-h-[44px] inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <span>Open project</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        )}

        <Link
          href={`/showcase/${project.slug}`}
          className="min-h-[44px] inline-flex items-center gap-1 text-xs font-medium text-ink-secondary hover:text-ink transition-colors"
        >
          <span>Details</span>
        </Link>
      </div>
    </article>
  );
}
