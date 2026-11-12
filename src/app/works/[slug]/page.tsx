import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllWorks,
  getManuscriptContent,
  getWorkBySlug,
} from "@/lib/catalog/queries";
import { getRelatedProjectsForWork } from "@/lib/showcase/queries";
import { getDomainById } from "@/config/domains";
import { siteConfig } from "@/config/site";
import { getArchetypeDescription } from "@/lib/classification/detect-archetype";
import { preprocessGithubMarkdown } from "@/lib/markdown/refine";
import { extractMarkdownHeadings } from "@/lib/markdown/reader-prefs";
import { ServerMarkdown } from "@/components/markdown/ServerMarkdown";
import { WorkReaderShell } from "@/components/publication/WorkReaderShell";
import { ArtifactList } from "@/components/publication/ArtifactList";
import { formatWorkCitation } from "@/lib/catalog/citations";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ChipList } from "@/components/ui/Chip";
import { ShareButton } from "@/components/ui/ShareButton";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Publication Not Found" };

  const pdfArtifact = work.artifacts.find((a) => a.type === "pdf");
  const scholarTags: Record<string, string> = {
    citation_title: work.title,
    citation_publication_date: work.publishedAt || "2026",
    citation_technical_report_institution: "Jahangirnagar University",
    citation_keywords: work.keywords.join(", "),
  };

  if (pdfArtifact) {
    scholarTags.citation_pdf_url = pdfArtifact.url;
  }

  work.authors.forEach((a, index) => {
    scholarTags[`citation_author_${index}`] = a.name;
    if (a.affiliation) {
      scholarTags[`citation_author_institution_${index}`] = a.affiliation;
    }
  });

  return {
    title: work.title,
    description: work.abstract.slice(0, 160),
    authors: work.authors.map((a) => ({ name: a.name })),
    keywords: work.keywords,
    alternates: {
      canonical: `${siteConfig.url}/works/${work.slug}`,
    },
    openGraph: {
      title: work.title,
      description: work.abstract.slice(0, 200),
      type: "article",
      url: `${siteConfig.url}/works/${work.slug}`,
      authors: work.authors.map((a) => a.name),
      publishedTime: work.publishedAt || undefined,
    },
    other: scholarTags,
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const allWorks = getAllWorks();
  const currentIndex = allWorks.findIndex((w) => w.slug === work.slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork =
    currentIndex >= 0 && currentIndex < allWorks.length - 1
      ? allWorks[currentIndex + 1]
      : null;

  const domain = getDomainById(work.domainId);
  const manuscriptContent = getManuscriptContent(work.slug);
  const archetypeDesc = getArchetypeDescription(work.archetype);
  const relatedProjects = getRelatedProjectsForWork(work.slug);
  const primaryEdition = work.editions[0];
  const [repoOwner, repoName] = (
    primaryEdition?.fullName || `smile-plzz/${primaryEdition?.repoName || work.slug}`
  ).split("/");

  const primaryRepoContext = {
    owner: repoOwner || "smile-plzz",
    name: repoName || work.slug,
    defaultBranch: "main",
  };

  const headings = manuscriptContent
    ? extractMarkdownHeadings(
        preprocessGithubMarkdown(manuscriptContent, {
          repo: primaryRepoContext,
          stripLeadingHeading: false,
          stripAiStudioBanner: true,
        })
      )
    : [];

  const displayDate = work.publishedAt
    ? new Date(work.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(work.lastPushedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: work.title,
    description: work.abstract,
    author: work.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: a.affiliation
        ? { "@type": "Organization", name: a.affiliation }
        : undefined,
    })),
    datePublished: work.publishedAt || work.lastPushedAt,
    keywords: work.keywords.join(", "),
    url: `${siteConfig.url}/works/${work.slug}`,
    publisher: {
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

      <article className="space-y-8 pb-16 lg:pb-0">
        <Breadcrumbs
          items={[
            { label: "Research", href: "/#research-archive" },
            ...(domain
              ? [{ label: domain.shortName, href: `/research-areas/${domain.slug}` }]
              : []),
            { label: work.title },
          ]}
        />

        {/* Reading-first Publication Header */}
        <header className="space-y-4 max-w-[68ch]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-secondary">
            <span>{work.status}</span>
            {domain && (
              <>
                <span aria-hidden="true">·</span>
                <Link
                  href={`/research-areas/${domain.slug}`}
                  className="hover:text-ink transition-colors"
                >
                  {domain.shortName}
                </Link>
              </>
            )}
            <span aria-hidden="true">·</span>
            <time dateTime={work.publishedAt || work.lastPushedAt}>
              {displayDate}
            </time>
            {work.readingTimeMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{work.readingTimeMinutes} min read</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-[1.16]">
            {work.title}
          </h1>

          {work.subtitle && (
            <p className="font-serif italic text-lg text-ink-secondary leading-relaxed">
              {work.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-sm text-ink-secondary">
              <span className="font-medium text-ink">
                {work.authors.map((a) => a.name).join(", ")}
              </span>
              {work.authors[0]?.affiliation && (
                <span> · {work.authors[0].affiliation}</span>
              )}
            </div>

            <ShareButton
              title={work.title}
              text={work.abstract.slice(0, 140)}
              url={`${siteConfig.url}/works/${work.slug}`}
            />
          </div>

          <ChipList items={work.keywords} maxVisible={2} />
        </header>

        {/* Abstract */}
        <section
          aria-labelledby="abstract-heading"
          className="max-w-[68ch] space-y-2 pt-2"
        >
          <h2
            id="abstract-heading"
            className="text-xs font-medium uppercase tracking-wider text-ink-secondary"
          >
            Abstract
          </h2>
          <p className="font-serif text-base sm:text-[17px] text-ink leading-relaxed">
            {work.abstract}
          </p>
        </section>

        {/* Body + Controls (Cite/Sources sheet, Reading progress, TOC sheet) */}
        <WorkReaderShell
          work={work}
          headings={headings}
          archetypeDesc={archetypeDesc}
        >
          {manuscriptContent ? (
            <ServerMarkdown
              content={manuscriptContent}
              repoContext={primaryRepoContext}
              stripLeadingHeading={false}
              stripAiStudioBanner
              baseHeadingLevel={2}
            />
          ) : (
            <p className="text-sm text-ink-secondary">
              Full text is hosted in the source repository. Open Cite / Sources above to
              view repository links.
            </p>
          )}
        </WorkReaderShell>

        {/* Print-only expanded citation */}
        <section
          data-print-citation="true"
          className="hidden print:block space-y-2 text-xs"
        >
          <h2 className="font-serif font-semibold text-sm">Citation</h2>
          <p>{formatWorkCitation(work, "apa")}</p>
          <pre className="whitespace-pre-wrap font-mono text-[9pt]">
            {formatWorkCitation(work, "bibtex")}
          </pre>
        </section>

        {/* Files and datasets */}
        <ArtifactList artifacts={work.artifacts} />

        {/* Companion Software */}
        {relatedProjects.length > 0 && (
          <section className="space-y-3 pt-6 border-t border-hairline max-w-[68ch]">
            <h2 className="font-serif text-lg font-semibold text-ink">
              Companion software
            </h2>
            <div className="space-y-2.5">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/showcase/${proj.slug}`}
                  className="block p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors"
                >
                  <div className="font-serif font-semibold text-base text-ink">
                    {proj.name}
                  </div>
                  {proj.tagline && (
                    <p className="text-xs text-ink-secondary mt-0.5">
                      {proj.tagline}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Prev / Next Publication */}
        {(prevWork || nextWork) && (
          <nav
            data-no-print="true"
            aria-label="Neighboring publications"
            className="pt-6 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[68ch]"
          >
            {prevWork ? (
              <Link
                href={`/works/${prevWork.slug}`}
                className="min-h-[44px] p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors text-left"
              >
                <span className="inline-flex items-center gap-1 text-xs text-ink-secondary">
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Previous
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-ink line-clamp-2">
                  {prevWork.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextWork && (
              <Link
                href={`/works/${nextWork.slug}`}
                className="min-h-[44px] p-4 rounded-card border border-hairline bg-surface hover:border-hairline-strong transition-colors text-left sm:text-right"
              >
                <span className="inline-flex items-center gap-1 text-xs text-ink-secondary">
                  Next
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-ink line-clamp-2">
                  {nextWork.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  );
}
