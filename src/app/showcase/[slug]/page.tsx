import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
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
import { formatRelativeDate } from "@/lib/format-date";
import { siteConfig } from "@/config/site";
import { DownloadPanel } from "@/components/showcase/DownloadPanel";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import { ServerMarkdown } from "@/components/markdown/ServerMarkdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonClasses } from "@/components/ui/Button";
import { Chip, ChipList } from "@/components/ui/Chip";
import { ShareButton } from "@/components/ui/ShareButton";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
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

  return {
    title: `${project.name} | Showcase`,
    description,
    alternates: {
      canonical: `${siteConfig.url}/showcase/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      type: "website",
      url: `${siteConfig.url}/showcase/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${siteConfig.name}`,
      description,
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

  const allProjects = getAllProjects();
  const navPool = project.curated
    ? allProjects.filter((p) => p.curated)
    : allProjects;
  const currentIndex = navPool.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? navPool[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < navPool.length - 1
      ? navPool[currentIndex + 1]
      : null;

  const categoryMeta = getCategoryMeta(project.category);
  const statusMeta = PROJECT_STATUS_META[project.status];
  const readmeContent = getProjectReadme(project.slug);
  const relatedProjects = getRelatedProjects(project, 3);
  const relatedWorks = getRelatedWorksForProject(project);
  const primaryDownload = project.downloads[0];
  const updatedLabel = formatRelativeDate(project.updatedAt);

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

      <article className="max-w-3xl mx-auto space-y-10">
        <Breadcrumbs
          items={[
            { label: "Showcase", href: "/showcase" },
            {
              label: categoryMeta.label,
              href: `/showcase/categories/${project.category}`,
            },
            { label: project.name },
          ]}
        />

        {/* Hero: What is this, who is it for, how do I try it */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-secondary">
            <span>{categoryMeta.shortLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{statusMeta.label}</span>
            {project.platforms.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {project.platforms
                    .map((pl) => PROJECT_PLATFORM_LABELS[pl] || pl)
                    .join(", ")}
                </span>
              </>
            )}
            {updatedLabel && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {updatedLabel}</span>
              </>
            )}
          </div>

          <div className="space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
              {project.name}
            </h1>
            {project.tagline && (
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
                {project.tagline}
              </p>
            )}
            {project.audience && (
              <p className="text-sm text-ink-secondary">
                <span className="font-medium text-ink">Built for:</span>{" "}
                {project.audience}
              </p>
            )}
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "primary" })}
              >
                <span>Open live app</span>
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </a>
            )}

            {primaryDownload && (
              <a
                href="#how-to-use"
                className={buttonClasses({
                  variant: project.liveUrl ? "quiet" : "primary",
                })}
              >
                <span>
                  Download{primaryDownload.size ? ` (${primaryDownload.size})` : ""}
                </span>
              </a>
            )}

            <ShareButton
              title={project.name}
              text={project.tagline || project.description}
              url={`${siteConfig.url}/showcase/${project.slug}`}
            />
          </div>

          {project.cover && (
            <div className="rounded-card overflow-hidden border border-hairline bg-surface-muted">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={project.cover}
                  alt={`${project.name} preview`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </header>

        {/* How to use it / Downloads */}
        <section id="how-to-use" className="space-y-4 pt-6 border-t border-hairline scroll-mt-20">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Get started
          </h2>

          {project.downloads.length > 0 ? (
            <DownloadPanel
              downloads={project.downloads}
              releaseInfo={project.releaseInfo}
              safetyNote={project.safetyNote}
              platforms={project.platforms}
              projectName={project.name}
              repoUrl={project.repo.url}
            />
          ) : project.liveUrl ? (
            <p className="text-sm text-ink-secondary leading-relaxed">
              This project runs in your browser with no download or account needed. Use{" "}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                the live link
              </a>{" "}
              above to launch it.
            </p>
          ) : (
            <p className="text-sm text-ink-secondary leading-relaxed">
              No prebuilt download or live demo is published yet. Setup instructions are inside
              the developer documentation below.
            </p>
          )}
        </section>

        {/* Screenshots (when available) */}
        {project.screenshots.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-hairline">
            <h2 className="font-serif text-xl font-semibold text-ink">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, idx) => (
                <figure
                  key={src}
                  className="rounded-card overflow-hidden border border-hairline bg-surface-muted"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={src}
                      alt={
                        project.screenshotAlts?.[idx] ||
                        `${project.name} screenshot ${idx + 1}`
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Plain-language Description & Features */}
        {(project.description || project.features.length > 0) && (
          <section className="space-y-4 pt-6 border-t border-hairline">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
              About this project
            </h2>
            {project.description && (
              <p className="text-base text-ink-secondary leading-relaxed">
                {project.description}
              </p>
            )}
            {project.features.length > 0 && (
              <ul className="space-y-2.5 text-sm sm:text-base text-ink">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-accent flex-shrink-0 mt-1"
                      strokeWidth={1.5}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Collapsed Dev Docs */}
        <section id="for-developers" className="pt-6 border-t border-hairline">
          <details className="group rounded-card border border-hairline bg-surface">
            <summary className="list-none cursor-pointer px-4 sm:px-5 py-3.5 min-h-[48px] flex items-center justify-between gap-4 select-none">
              <div>
                <span className="font-serif font-semibold text-base text-ink block">
                  Developer documentation
                </span>
                <span className="text-xs text-ink-secondary">
                  Tech stack, license, source repository, and README
                </span>
              </div>
              <ChevronDown
                className="w-4 h-4 text-ink-secondary transition-transform duration-150 group-open:rotate-180 flex-shrink-0"
                strokeWidth={1.5}
              />
            </summary>

            <div className="px-4 sm:px-5 pb-6 pt-4 border-t border-hairline space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1.5">
                  <span className="block text-xs text-ink-secondary">Stack</span>
                  {project.tech.length > 0 ? (
                    <ChipList items={project.tech} maxVisible={4} />
                  ) : (
                    <Chip>Not specified</Chip>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="block text-xs text-ink-secondary">License</span>
                  <span className="text-sm text-ink">
                    {project.repo.license || "See repository"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="block text-xs text-ink-secondary">Source</span>
                  <a
                    href={project.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline break-all"
                  >
                    <span>
                      {project.repo.owner}/{project.repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {readmeContent && (
                <div className="pt-4 border-t border-hairline prose-academic">
                  <ServerMarkdown
                    content={readmeContent}
                    repoContext={{
                      owner: project.repo.owner,
                      name: project.repo.name,
                      defaultBranch: project.repo.defaultBranch,
                    }}
                    stripLeadingHeading
                    stripAiStudioBanner
                    baseHeadingLevel={2}
                  />
                </div>
              )}
            </div>
          </details>
        </section>

        {/* Related Research & Projects */}
        {(relatedWorks.length > 0 || relatedProjects.length > 0) && (
          <section className="space-y-6 pt-6 border-t border-hairline">
            {relatedWorks.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-serif text-lg font-semibold text-ink">
                  Related research
                </h2>
                <div className="space-y-3">
                  {relatedWorks.map((work) => (
                    <Link
                      key={work.slug}
                      href={`/works/${work.slug}`}
                      className="block p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors"
                    >
                      <div className="text-xs text-ink-secondary mb-1">
                        {work.status}
                      </div>
                      <div className="font-serif font-semibold text-base text-ink">
                        {work.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedProjects.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-serif text-lg font-semibold text-ink">
                  Related projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedProjects.map((rel) => (
                    <ProjectCard key={rel.slug} project={rel} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Quiet Prev / Next */}
        {(prevProject || nextProject) && (
          <nav
            aria-label="Neighboring projects"
            className="pt-6 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {prevProject ? (
              <Link
                href={`/showcase/${prevProject.slug}`}
                className="min-h-[44px] p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors text-left"
              >
                <span className="inline-flex items-center gap-1 text-xs text-ink-secondary">
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Previous
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-ink truncate">
                  {prevProject.name}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/showcase/${nextProject.slug}`}
                className="min-h-[44px] p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors text-left sm:text-right"
              >
                <span className="inline-flex items-center gap-1 text-xs text-ink-secondary">
                  Next
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-ink truncate">
                  {nextProject.name}
                </p>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  );
}
