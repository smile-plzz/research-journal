import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Work } from "@/lib/catalog/schema";
import { getDomainById } from "@/config/domains";
import { ChipList } from "@/components/ui/Chip";

export type WorkCardData = Pick<
  Work,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "abstract"
  | "domainId"
  | "keywords"
  | "type"
  | "status"
  | "publishedAt"
  | "lastPushedAt"
  | "featured"
  | "readingTimeMinutes"
  | "authors"
  | "editions"
>;

interface PublicationCardProps {
  work: WorkCardData;
}

export function PublicationCard({ work }: PublicationCardProps) {
  const domain = getDomainById(work.domainId);

  const formattedDate = work.publishedAt
    ? new Date(work.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : new Date(work.lastPushedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

  return (
    <article className="rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors duration-150 p-5 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        {/* Quiet metadata line */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-secondary">
          {domain && <span>{domain.shortName}</span>}
          {domain && <span aria-hidden="true">·</span>}
          <span>{work.status}</span>
          {work.readingTimeMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{work.readingTimeMinutes} min read</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <time dateTime={work.publishedAt || work.lastPushedAt}>
            {formattedDate}
          </time>
        </div>

        {/* Title & summary */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">
            <Link
              href={`/works/${work.slug}`}
              className="hover:text-accent transition-colors duration-150"
            >
              {work.title}
            </Link>
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2">
            {work.abstract}
          </p>
        </div>

        {/* Max 2 visible tags + "+N" */}
        <ChipList items={work.keywords} maxVisible={2} />
      </div>

      <div className="pt-3 border-t border-hairline flex items-center justify-between gap-3 text-sm">
        <span className="text-xs text-ink-secondary truncate">
          {work.authors[0]?.name}
          {work.editions.length > 1 ? ` · ${work.editions.length} editions` : ""}
        </span>
        <Link
          href={`/works/${work.slug}`}
          className="min-h-[44px] inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors flex-shrink-0"
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
