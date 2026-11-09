import Link from "next/link";
import { Work } from "@/lib/catalog/schema";
import { getDomainById } from "@/config/domains";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BookOpen, FileCode, Layers, ArrowUpRight } from "lucide-react";

interface PublicationCardProps {
  work: Work;
}

export function PublicationCard({ work }: PublicationCardProps) {
  const domain = getDomainById(work.domainId);

  // Human friendly status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Thesis":
        return "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50";
      case "Preprint":
        return "bg-rose-100 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/50";
      case "Research Monograph":
        return "bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700";
      case "Published":
        return "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50";
      default:
        return "bg-stone-100 text-stone-800 dark:bg-stone-800/60 dark:text-stone-300 border-stone-200 dark:border-stone-700";
    }
  };

  const formattedDate = work.publishedAt
    ? new Date(work.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Academic Archive";

  return (
    <article className="group py-6 border-b border-stone-200/80 dark:border-stone-800/80 last:border-b-0 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
        {/* Domain & Status meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {domain && (
            <Link
              href={`/research-areas/${domain.slug}`}
              className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${domain.color.bg} ${domain.color.text} ${domain.color.border} hover:opacity-80`}
            >
              {domain.shortName}
            </Link>
          )}

          <span
            className={`px-2 py-0.5 rounded border text-[11px] font-medium ${getStatusBadge(
              work.status
            )}`}
          >
            {work.status}
          </span>

          {work.editions.length > 1 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 dark:text-stone-400">
              <Layers className="w-3 h-3" />
              {work.editions.length} editions
            </span>
          )}

          {work.readingTimeMinutes && (
            <span className="text-stone-400 dark:text-stone-500 text-[11px]">
              · {work.readingTimeMinutes} min read
            </span>
          )}
        </div>

        <time className="text-xs font-mono text-stone-400 dark:text-stone-500">
          {formattedDate}
        </time>
      </div>

      {/* Main Title */}
      <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors leading-tight mb-1.5">
        <Link
          href={`/works/${work.slug}`}
          className="inline-flex items-baseline gap-1.5"
        >
          <span>{work.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-academic inline self-center" />
        </Link>
      </h2>

      {/* Subtitle if available */}
      {work.subtitle && (
        <p className="text-sm font-serif italic text-stone-600 dark:text-stone-400 mb-2">
          {work.subtitle}
        </p>
      )}

      {/* Authors list */}
      <div className="text-xs text-stone-600 dark:text-stone-400 mb-2.5">
        <span className="font-medium text-stone-700 dark:text-stone-300">
          {work.authors.map((a) => a.name).join(", ")}
        </span>
        {work.authors[0]?.affiliation && (
          <span className="text-stone-400 dark:text-stone-500 ml-1.5">
            ({work.authors[0].affiliation})
          </span>
        )}
      </div>

      {/* Abstract preview */}
      <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed mb-3 font-sans">
        {work.abstract}
      </p>

      {/* Keywords and quick artifact links */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {work.keywords.slice(0, 4).map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 font-sans"
            >
              #{kw}
            </span>
          ))}
          {work.keywords.length > 4 && (
            <span className="text-[11px] text-stone-400">
              +{work.keywords.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          {work.artifacts.some((a) => a.type === "pdf") && (
            <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1 text-[11px]">
              <BookOpen className="w-3 h-3" />
              PDF Available
            </span>
          )}
          {work.artifacts.some((a) => a.type === "dataset") && (
            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
              <FileCode className="w-3 h-3" />
              Dataset
            </span>
          )}
          <Link
            href={`/works/${work.slug}`}
            className="text-stone-900 dark:text-stone-100 font-serif hover:underline text-xs"
          >
            Read Publication →
          </Link>
        </div>
      </div>
    </article>
  );
}

