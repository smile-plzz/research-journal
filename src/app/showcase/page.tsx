import type { Metadata } from "next";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  getAllProjects,
  getCuratedProjects,
  getFeaturedProjects,
} from "@/lib/showcase/queries";
import { PROJECT_CATEGORIES } from "@/lib/showcase/schema";
import { ShowcaseBrowser } from "@/components/showcase/ShowcaseBrowser";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import { CategoryIcon } from "@/components/showcase/CategoryVisuals";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import { siteConfig } from "@/config/site";
import { Layers, Sparkles, ArrowRight, Globe, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Project Showcase | Software, Apps & Interactive Tools",
  description:
    "Browse web apps, desktop software, Android TV apps, and everyday utilities built by Md. Ismail Hossain. Try live in your browser or download directly with no GitHub account needed.",
  openGraph: {
    title: `Project Showcase | ${siteConfig.name}`,
    description:
      "Web apps, Windows software, Android TV apps, and everyday tools you can try live or download directly.",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/showcase`,
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Project Showcase" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Project Showcase | ${siteConfig.name}`,
    description:
      "Web apps, Windows software, Android TV apps, and everyday tools you can try live or download directly.",
    images: [siteConfig.ogImage],
  },
};

export default function ShowcasePage() {
  const allProjects = getAllProjects();
  const curatedProjects = getCuratedProjects();
  const featuredProjects = getFeaturedProjects();
  const liveCount = allProjects.filter((p) => Boolean(p.liveUrl)).length;
  const downloadableCount = allProjects.filter(
    (p) => p.downloads.length > 0
  ).length;

  let latestUpdateLabel = "";
  if (allProjects.length > 0) {
    try {
      const sortedDates = [...allProjects].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      latestUpdateLabel = formatDistanceToNow(
        parseISO(sortedDates[0].updatedAt),
        { addSuffix: true }
      );
    } catch {
      latestUpdateLabel = "";
    }
  }

  return (
    <div className="space-y-10">
      <div className="pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
        <Breadcrumbs items={[{ label: "Project Showcase" }]} />
      </div>

      {/* Friendly Non-Technical Hero */}
      <section className="pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-academic/10 text-academic dark:text-academic-dark mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Software & Projects Library</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight max-w-3xl mb-4">
          Apps, desktop tools, and interactive projects built for everyday use.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed mb-6">
          Explore software built by{" "}
          <strong className="text-stone-800 dark:text-stone-200 font-medium">
            Md. Ismail Hossain
          </strong>
          . Launch web apps directly in your browser or download ready-to-run desktop and Android
          packages with no account or technical setup required.
        </p>

        {/* Plain-language stats */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-stone-500 dark:text-stone-400">
          <Tooltip content="Hand-curated software entries with plain-language descriptions alongside automatically indexed tools">
            <div className="flex items-center gap-1.5 cursor-default">
              <Layers className="w-4 h-4 text-academic" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">
                  {curatedProjects.length}
                </strong>{" "}
                Curated Projects ({allProjects.length} total indexed)
              </span>
            </div>
          </Tooltip>
          <Tooltip content="Hosted online so you can test or use them directly without installing">
            <div className="flex items-center gap-1.5 cursor-default">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">
                  {liveCount}
                </strong>{" "}
                Live in Browser
              </span>
            </div>
          </Tooltip>
          <Tooltip content="Projects with direct Windows ZIP installers, Android APKs, or packaged releases">
            <div className="flex items-center gap-1.5 cursor-default">
              <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">
                  {downloadableCount}
                </strong>{" "}
                Direct Downloads
              </span>
            </div>
          </Tooltip>
          {latestUpdateLabel && (
            <span className="text-stone-400 dark:text-stone-500">
              Latest project updated {latestUpdateLabel}
            </span>
          )}
        </div>
      </section>

      {/* Quick Category Browse Pills */}
      <section className="space-y-3" aria-label="Browse by category">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider font-mono font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2">
            <span>Browse by Category</span>
            <InfoHint text="Click any category pill to open a dedicated filtered gallery page." />
          </h2>
          <Tooltip content="Return to academic papers and research monographs">
            <Link
              href="/"
              className="text-xs text-academic hover:underline inline-flex items-center gap-1"
            >
              <span>Switch to Research Wing</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((cat) => {
            const count = allProjects.filter((p) => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <Tooltip key={cat.id} content={cat.description}>
                <Link
                  href={`/showcase/categories/${cat.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 hover:border-academic text-xs text-stone-700 dark:text-stone-300 transition-colors"
                >
                  <CategoryIcon category={cat.id} className="w-3.5 h-3.5 text-academic" />
                  <span>{cat.label}</span>
                  <span className="font-mono text-[11px] text-stone-400">({count})</span>
                </Link>
              </Tooltip>
            );
          })}
        </div>
      </section>

      {/* Featured Spotlight */}
      {featuredProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-sm uppercase tracking-wider font-mono font-medium text-stone-500 dark:text-stone-400">
              Featured Projects
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Highlights ready to try or download
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Full Searchable & Filterable Showcase Gallery */}
      <section className="space-y-4 pt-2">
        <ShowcaseBrowser initialProjects={allProjects} />
      </section>
    </div>
  );
}

