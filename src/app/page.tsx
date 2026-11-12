import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllWorks } from "@/lib/catalog/queries";
import { getAllProjects } from "@/lib/showcase/queries";
import { formatRelativeDate } from "@/lib/format-date";
import { JournalSearch } from "@/components/search/JournalSearch";
import { WorkCardData } from "@/components/publication/PublicationCard";
import { Chip } from "@/components/ui/Chip";

interface RecentFeedItem {
  id: string;
  wing: "Research" | "Showcase";
  title: string;
  summary: string;
  href: string;
  timestamp: string;
}

export default function HomePage() {
  const allWorks = getAllWorks();
  const allProjects = getAllProjects();

  const workCards: WorkCardData[] = allWorks.map((w) => ({
    id: w.id,
    slug: w.slug,
    title: w.title,
    subtitle: w.subtitle,
    abstract: w.abstract,
    domainId: w.domainId,
    keywords: w.keywords,
    type: w.type,
    status: w.status,
    publishedAt: w.publishedAt,
    lastPushedAt: w.lastPushedAt,
    featured: w.featured,
    readingTimeMinutes: w.readingTimeMinutes,
    authors: w.authors.slice(0, 1),
    editions: w.editions,
  }));

  const recentlyUpdated: RecentFeedItem[] = [
    ...allWorks.map((w) => ({
      id: `work-${w.slug}`,
      wing: "Research" as const,
      title: w.title,
      summary: w.abstract,
      href: `/works/${w.slug}`,
      timestamp: w.lastPushedAt,
    })),
    ...allProjects
      .filter((p) => p.curated)
      .map((p) => ({
        id: `project-${p.slug}`,
        wing: "Showcase" as const,
        title: p.name,
        summary: p.tagline || p.description,
        href: `/showcase/${p.slug}`,
        timestamp: p.updatedAt,
      })),
  ]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Short Editorial Intro */}
      <section className="space-y-6">
        <div className="space-y-2.5 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
            Md. Ismail Hossain
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            An archive of scholarly research monographs alongside everyday software tools built to
            run in your browser or on your desktop.
          </p>
          <div className="pt-0.5">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1 min-h-[36px] text-sm text-accent hover:underline"
            >
              <span>How this site works</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Two Equal, Quiet Entry Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="#research-archive"
            className="group rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors duration-150 p-6 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="text-xs text-ink-secondary">
                Research · {allWorks.length} works
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                Research Archive
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Master&apos;s theses, game studies monographs, public health GIS studies, and
                empirical investigations.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
              <span>Browse publications</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </span>
          </a>

          <Link
            href="/showcase"
            className="group rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors duration-150 p-6 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="text-xs text-ink-secondary">
                Showcase · {allProjects.length} projects
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                Project Showcase
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Browser-ready web apps and direct Windows or Android downloads with no developer
                setup needed.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
              <span>Explore software</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </section>

      {/* Recently Updated Feed Mixing Both Wings */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-hairline">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Recently updated
          </h2>
          <Link
            href="/showcase"
            className="text-xs text-ink-secondary hover:text-ink transition-colors"
          >
            View showcase
          </Link>
        </div>

        <ul className="divide-y divide-hairline rounded-card border border-hairline bg-surface">
          {recentlyUpdated.map((item) => {
            const rel = formatRelativeDate(item.timestamp);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-4 sm:px-5 py-4 hover:bg-surface-muted/50 transition-colors duration-150"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <Chip>{item.wing}</Chip>
                    {rel && (
                      <span className="text-xs text-ink-secondary">
                        Updated {rel}
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug">
                    {item.title}
                  </div>
                  {item.summary && (
                    <p className="text-sm text-ink-secondary line-clamp-1 mt-1">
                      {item.summary}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Full Research Archive */}
      <section id="research-archive" className="space-y-6 scroll-mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-hairline">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Publications
          </h2>
          <Link
            href="/research-areas"
            className="text-sm text-accent hover:underline"
          >
            Browse by area
          </Link>
        </div>

        <JournalSearch initialWorks={workCards} />
      </section>
    </div>
  );
}
