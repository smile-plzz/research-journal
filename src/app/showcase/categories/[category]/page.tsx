import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectsByCategory } from "@/lib/showcase/queries";
import {
  PROJECT_CATEGORIES,
  ProjectCategoryEnum,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import { ShowcaseBrowser } from "@/components/showcase/ShowcaseBrowser";
import { ProjectCardData } from "@/components/showcase/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return PROJECT_CATEGORIES.map((c) => ({
    category: c.id,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const parsed = ProjectCategoryEnum.safeParse(category);
  if (!parsed.success) return { title: "Category Not Found" };

  const meta = getCategoryMeta(parsed.data);
  return {
    title: `${meta.label} | Showcase`,
    description: meta.description,
    openGraph: {
      title: `${meta.label} | ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/showcase/categories/${parsed.data}`,
      type: "website",
    },
  };
}

export default async function ShowcaseCategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const parsed = ProjectCategoryEnum.safeParse(category);
  if (!parsed.success) {
    notFound();
  }

  const meta = getCategoryMeta(parsed.data);
  const categoryProjects = getProjectsByCategory(parsed.data);
  const allProjects = getAllProjects();

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
      <Breadcrumbs
        items={[
          { label: "Showcase", href: "/showcase" },
          { label: meta.label },
        ]}
      />

      <header className="space-y-2 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          {meta.label}
        </h1>
        <p className="text-base text-ink-secondary max-w-2xl leading-relaxed">
          {meta.description}
        </p>
        <p className="text-xs text-ink-secondary pt-1">
          {categoryProjects.length}{" "}
          {categoryProjects.length === 1 ? "project" : "projects"}
        </p>
      </header>

      <ShowcaseBrowser
        initialProjects={projectCards}
        defaultCategory={parsed.data}
        hideCategoryPills
      />
    </div>
  );
}
