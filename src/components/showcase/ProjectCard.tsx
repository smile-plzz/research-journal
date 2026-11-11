import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Project,
  PROJECT_STATUS_META,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import { CategoryCoverFallback, CategoryIcon } from "./CategoryVisuals";
import { ArrowRight, Download, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const categoryMeta = getCategoryMeta(project.category);
  const statusMeta = PROJECT_STATUS_META[project.status];
  const primaryDownload = project.downloads[0];
  const summaryText =
    project.tagline ||
    project.description ||
    "Open-source software project. Open details to learn more.";

  let updatedLabel = "";
  try {
    updatedLabel = `Updated ${formatDistanceToNow(parseISO(project.updatedAt), {
      addSuffix: true,
    })}`;
  } catch {
    updatedLabel = "";
  }

  return (
    <article className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 overflow-hidden hover:border-academic/60 dark:hover:border-academic-dark/60 hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      <div>
        {/* Cover or Generated Category Fallback */}
        <Link
          href={`/showcase/${project.slug}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
          aria-label={`Open ${project.name} details`}
        >
          {project.cover ? (
            <div
              className={`relative w-full ${
                compact ? "h-36" : "h-44 sm:h-48"
              } bg-stone-100 dark:bg-stone-800 overflow-hidden border-b border-stone-200/80 dark:border-stone-800/80`}
            >
              <Image
                src={project.cover}
                alt={`${project.name} cover preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          ) : (
            <CategoryCoverFallback
              category={project.category}
              name={project.name}
              compact={compact}
            />
          )}
        </Link>

        <div className="p-5 space-y-3">
          {/* Status + Category Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${statusMeta.badgeClass}`}
              >
                {statusMeta.label}
              </span>
              <Link
                href={`/showcase/categories/${project.category}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-academic dark:hover:text-academic-dark text-[11px] transition-colors"
              >
                <CategoryIcon category={project.category} className="w-3 h-3" />
                <span>{categoryMeta.shortLabel}</span>
              </Link>
            </div>

            {updatedLabel && (
              <span className="text-[11px] text-stone-400 dark:text-stone-500">
                {updatedLabel}
              </span>
            )}
          </div>

          {/* Name & Plain-Language Tagline */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 leading-snug mb-1.5">
              <Link
                href={`/showcase/${project.slug}`}
                className="hover:text-academic dark:hover:text-academic-dark transition-colors focus:outline-none focus-visible:underline"
              >
                {project.name}
              </Link>
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
              {summaryText}
            </p>
          </div>

          {/* Optional Tech Tags (max 3) */}
          {project.tech.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[11px] text-stone-400 dark:text-stone-500">
                Built with:
              </span>
              {project.tech.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] bg-stone-100/90 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Footer */}
      <div className="px-5 py-3.5 border-t border-stone-100 dark:border-stone-800/80 bg-cream-100/40 dark:bg-stone-900/30 flex items-center justify-between gap-3 text-xs">
        {project.liveUrl ? (
          <>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-academic hover:bg-academic-hover text-white font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
            >
              <span>Try it live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href={`/showcase/${project.slug}`}
              className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        ) : primaryDownload ? (
          <>
            <a
              href={primaryDownload.url}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-academic hover:bg-academic-hover text-white font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <Link
              href={`/showcase/${project.slug}`}
              className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors"
            >
              <span>How to use</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        ) : (
          <Link
            href={`/showcase/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-700 hover:border-academic text-stone-800 dark:text-stone-200 font-medium transition-colors"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

