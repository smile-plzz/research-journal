import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectReadme,
  getRelatedProjects,
  getRelatedWorksForProject,
} from "@/lib/showcase/queries";
import {
  PROJECT_PLATFORM_LABELS,
  PROJECT_STATUS_META,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import { siteConfig } from "@/config/site";
import { CategoryCoverFallback, CategoryIcon } from "@/components/showcase/CategoryVisuals";
import { DownloadPanel } from "@/components/showcase/DownloadPanel";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Info,
  MessageSquare,
  Users,
} from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const description =
    project.tagline ||
    project.description.slice(0, 155) ||
    `${project.name} by Md. Ismail Hossain.`;

  const ogImageUrl = project.cover
    ? `${siteConfig.url}${project.cover}`
    : siteConfig.ogImage;

  return {
    title: `${project.name} | Project Showcase`,
    description,
    openGraph: {
      title: project.name,
      description,
      type: "website",
      url: `${siteConfig.url}/showcase/${project.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const categoryMeta = getCategoryMeta(project.category);
  const statusMeta = PROJECT_STATUS_META[project.status];
  const readmeContent = getProjectReadme(project.slug);
  const relatedProjects = getRelatedProjects(project, 3);
  const relatedWorks = getRelatedWorksForProject(project);
  const primaryDownload = project.downloads[0];

  let updatedLabel = "";
  try {
    updatedLabel = `Updated ${formatDistanceToNow(parseISO(project.updatedAt), {
      addSuffix: true,
    })}`;
  } catch {
    updatedLabel = "";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline || project.description,
    applicationCategory: categoryMeta.label,
    operatingSystem:
      project.platforms.length > 0
        ? project.platforms.map((p) => PROJECT_PLATFORM_LABELS[p] || p).join(", ")
        : "Web",
    url: project.liveUrl || `${siteConfig.url}/showcase/${project.slug}`,
    downloadUrl: primaryDownload?.url,
    softwareVersion: project.releaseInfo?.tag,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.githubUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto space-y-12">
        {/* Top Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Project Showcase</span>
          </Link>

          <Link
            href={`/showcase/categories/${project.category}`}
            className="inline-flex items-center gap-1 hover:text-academic transition-colors font-medium"
          >
            <CategoryIcon category={project.category} className="w-3.5 h-3.5" />
            <span>{categoryMeta.label}</span>
          </Link>
        </div>

        {/* 1. Hero: Name, One-Liner, Cover Image, Primary CTAs */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-2.5 py-0.5 rounded-full border font-medium ${statusMeta.badgeClass}`}
            >
              {statusMeta.label}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
              {categoryMeta.shortLabel}
            </span>
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="px-2 py-0.5 rounded bg-stone-100/80 dark:bg-stone-800/70 text-stone-600 dark:text-stone-400 text-[11px]"
              >
                {PROJECT_PLATFORM_LABELS[platform] || platform}
              </span>
            ))}
            {updatedLabel && (
              <span className="text-stone-400 dark:text-stone-500 ml-auto font-mono text-[11px]">
                {updatedLabel}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
              {project.name}
            </h1>
            {project.tagline && (
              <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-academic hover:bg-academic-hover text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
              >
                <span>Try it live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {primaryDownload && (
              <a
                href="#how-to-use"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic ${
                  project.liveUrl
                    ? "border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 hover:border-academic"
                    : "bg-academic hover:bg-academic-hover text-white"
                }`}
              >
                <Download className="w-4 h-4" />
                <span>
                  {primaryDownload.label}
                  {primaryDownload.size ? ` (${primaryDownload.size})` : ""}
                </span>
              </a>
            )}

            <a
              href="#for-developers"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical details</span>
            </a>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
            {project.cover ? (
              <div className="relative w-full aspect-[16/9] bg-stone-100 dark:bg-stone-800">
                <Image
                  src={project.cover}
                  alt={`${project.name} visual preview`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            ) : (
              <CategoryCoverFallback category={project.category} name={project.name} />
            )}
          </div>
        </header>

        {/* 2. What is this? */}
        <section className="space-y-3 pt-2">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            What is this?
          </h2>
          {project.description ? (
            <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          ) : (
            <p className="text-sm text-stone-500 dark:text-stone-400 italic">
              A plain-language overview for this project has not been written yet. Open the technical
              details section below to view the project documentation.
            </p>
          )}
        </section>

        {/* 3. Who is it for? and What can it do? */}
        {(project.audience || project.features.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
            {project.audience && (
              <div className="md:col-span-1 p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 space-y-2 h-fit">
                <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-academic" />
                  <span>Who is it for?</span>
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {project.audience}
                </p>
              </div>
            )}

            {project.features.length > 0 && (
              <div
                className={`${
                  project.audience ? "md:col-span-2" : "md:col-span-3"
                } p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 space-y-3`}
              >
                <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                  What can it do?
                </h2>
                <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 4. Screenshots or Demo Gallery (only when available) */}
        {project.screenshots.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, idx) => {
                const altText =
                  project.screenshotAlts?.[idx] ||
                  `${project.name} screenshot ${idx + 1}`;
                return (
                  <figure
                    key={src}
                    className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={src}
                        alt={altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 440px"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. How to use it (Non-GitHub Access) */}
        <section
          id="how-to-use"
          className="space-y-5 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 scroll-mt-24"
        >
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              How to use it
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Get started directly without needing any developer tools or accounts.
            </p>
          </div>

          {project.liveUrl && (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">
                  Run directly in your browser
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  No download or installation needed. Opens the live web application in a new tab.
                </p>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition-colors flex-shrink-0"
              >
                <span>Open live app</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {project.downloads.length > 0 && (
            <DownloadPanel
              downloads={project.downloads}
              releaseInfo={project.releaseInfo}
              safetyNote={project.safetyNote}
              platforms={project.platforms}
            />
          )}

          {!project.liveUrl && project.downloads.length === 0 && (
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/30 p-5 text-sm text-stone-600 dark:text-stone-400">
              <p>
                This project does not have a live web demo or prebuilt download package published yet.
                You can inspect the setup notes and source files inside the{" "}
                <a href="#for-developers" className="text-academic hover:underline font-medium">
                  For developers
                </a>{" "}
                section below.
              </p>
            </div>
          )}
        </section>

        {/* 6. Status and roadmap snippet */}
        <section className="space-y-3 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
          <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Info className="w-4 h-4 text-academic" />
            <span>Status & Progress</span>
          </h2>
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 text-sm text-stone-700 dark:text-stone-300 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full border text-xs font-medium ${statusMeta.badgeClass}`}
              >
                {statusMeta.label}
              </span>
              {updatedLabel && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {updatedLabel}
                </span>
              )}
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {project.statusNote ||
                `Current state: ${statusMeta.label}. Maintained openly with regular updates.`}
            </p>
          </div>
        </section>

        {/* 7. Tech details (Collapsed by default "For developers" accordion) */}
        <section
          id="for-developers"
          className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 scroll-mt-24"
        >
          <details className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/30">
            <summary className="list-none cursor-pointer p-5 flex items-center justify-between gap-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-academic rounded-xl">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-stone-500" />
                <div>
                  <span className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100 block">
                    For developers
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Technology stack, license, source code link, and full documentation
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-500 transition-transform group-open:rotate-180" />
            </summary>

            <div className="px-5 pb-6 pt-2 border-t border-stone-200/80 dark:border-stone-800/80 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="block text-stone-400 font-mono uppercase mb-1.5">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.length > 0 ? (
                      project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-stone-500">Not specified</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block text-stone-400 font-mono uppercase mb-1.5">
                    License
                  </span>
                  <span className="font-mono text-stone-700 dark:text-stone-300">
                    {project.repo.license || "See repository"}
                  </span>
                </div>

                <div>
                  <span className="block text-stone-400 font-mono uppercase mb-1.5">
                    Source Code
                  </span>
                  <a
                    href={project.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-academic hover:underline font-medium"
                  >
                    <span>
                      {project.repo.owner}/{project.repo.name}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {readmeContent && (
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-4">
                    Repository Documentation
                  </h3>
                  <div className="rounded-lg border border-stone-200/70 dark:border-stone-800/70 bg-cream-50/70 dark:bg-stone-950/60 p-5 overflow-x-auto">
                    <MarkdownRenderer content={readmeContent} />
                  </div>
                </div>
              )}
            </div>
          </details>
        </section>

        {/* 8. Related research & related projects */}
        {(relatedWorks.length > 0 || relatedProjects.length > 0) && (
          <section className="space-y-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
            {relatedWorks.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-academic" />
                  <span>Related Research</span>
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {relatedWorks.map((work) => (
                    <Link
                      key={work.slug}
                      href={`/works/${work.slug}`}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-academic transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-academic">
                          {work.status}
                        </span>
                        <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">
                          {work.title}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                          {work.abstract}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedProjects.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                  Related Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedProjects.map((rel) => (
                    <ProjectCard key={rel.slug} project={rel} compact />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 9. Footer CTA */}
        <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-cream-100/60 dark:bg-stone-900/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-academic" />
              <span>Want to talk about this project?</span>
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Questions, collaboration inquiries, or feedback for Md. Ismail Hossain are welcome.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <span>Contact & About</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </article>
    </>
  );
}

