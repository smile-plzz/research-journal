import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/showcase/queries";
import { PROJECT_CATEGORIES } from "@/lib/showcase/schema";
import { ShowcaseBrowser } from "@/components/showcase/ShowcaseBrowser";
import { ProjectCardData } from "@/components/showcase/ProjectCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Showcase",
  description:
    "Web apps, desktop software, and mobile tools built by Md. Ismail Hossain. Try live in your browser or download directly.",
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/showcase/feed.xml`,
    },
  },
  openGraph: {
    title: `Project Showcase | ${siteConfig.name}`,
    description:
      "Web apps, Windows software, Android TV apps, and everyday tools you can try live or download directly.",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/showcase`,
    type: "website",
  },
};

export default function ShowcasePage() {
  const allProjects = getAllProjects();
  const liveCount = allProjects.filter((p) => Boolean(p.liveUrl)).length;
  const downloadCount = allProjects.filter((p) => p.downloads.length > 0).length;

  const projectCards: ProjectCardData[] = allProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    status: p.status,
    platforms: p.platforms,
    tech: p.tech,
    cover: p.cover,
    liveUrl: p.liveUrl,
    downloads: p.downloads.slice(0, 1),
    updatedAt: p.updatedAt,
    curated: p.curated,
    needsReview: p.needsReview,
    featured: p.featured,
    order: p.order,
  }));

  return (
    <div className="space-y-8">
      <header className="space-y-3 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Project Showcase
        </h1>
        <p className="text-base text-ink-secondary max-w-2xl leading-relaxed">
          Web apps you can try right away and desktop or Android software you can download directly.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-secondary">
          <span>{allProjects.length} projects</span>
          <span aria-hidden="true">·</span>
          <span>{liveCount} live in browser</span>
          <span aria-hidden="true">·</span>
          <span>{downloadCount} direct downloads</span>
        </div>

        <nav
          aria-label="Category pages"
          className="pt-1 flex items-center gap-3 overflow-x-auto no-scrollbar text-xs"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const count = allProjects.filter((p) => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <Link
                key={cat.id}
                href={`/showcase/categories/${cat.id}`}
                className="min-h-[36px] inline-flex items-center whitespace-nowrap text-ink-secondary hover:text-accent transition-colors"
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <ShowcaseBrowser initialProjects={projectCards} />
    </div>
  );
}
