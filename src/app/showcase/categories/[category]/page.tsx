import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectsByCategory } from "@/lib/showcase/queries";
import {
  PROJECT_CATEGORIES,
  ProjectCategoryEnum,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import { ShowcaseBrowser } from "@/components/showcase/ShowcaseBrowser";
import { CategoryIcon } from "@/components/showcase/CategoryVisuals";
import { siteConfig } from "@/config/site";
import { ArrowLeft } from "lucide-react";

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
    title: `${meta.label} | Project Showcase`,
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

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between text-xs font-sans text-stone-500 pb-4 border-b border-stone-200 dark:border-stone-800">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Showcase Projects</span>
        </Link>
        <span className="font-mono">{categoryProjects.length} Projects</span>
      </div>

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-academic/10 text-academic dark:text-academic-dark">
          <CategoryIcon category={parsed.data} className="w-3.5 h-3.5" />
          <span>{meta.shortLabel}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          {meta.label}
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          {meta.description}
        </p>
      </header>

      <ShowcaseBrowser
        initialProjects={allProjects}
        defaultCategory={parsed.data}
      />
    </div>
  );
}

