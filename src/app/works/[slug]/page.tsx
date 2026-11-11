import { notFound } from "next/navigation";
import { getAllWorks, getWorkBySlug, getManuscriptContent } from "@/lib/catalog/queries";
import { getRelatedProjectsForWork } from "@/lib/showcase/queries";
import { getDomainById } from "@/config/domains";
import { getArchetypeDescription } from "@/lib/classification/detect-archetype";
import { MetadataProvenancePill } from "@/components/publication/MetadataProvenancePill";
import { EditionSelector } from "@/components/publication/EditionSelector";
import { CitationBox } from "@/components/publication/CitationBox";
import { ArtifactList } from "@/components/publication/ArtifactList";
import { DocumentReader } from "@/components/markdown/DocumentReader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Layers,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  ShieldCheck,
  Compass,
} from "lucide-react";
import type { Metadata } from "next";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
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

  // Add individual author meta tags
  work.authors.forEach((a, index) => {
    scholarTags[`citation_author_${index}`] = a.name;
    if (a.affiliation) {
      scholarTags[`citation_author_institution_${index}`] = a.affiliation;
    }
  });

  return {
    title: `${work.title} | Md. Ismail Hossain Research`,
    description: work.abstract.slice(0, 160),
    authors: work.authors.map((a) => ({ name: a.name })),
    keywords: work.keywords,
    openGraph: {
      title: work.title,
      description: work.abstract.slice(0, 200),
      type: "article",
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

  const displayDate = work.publishedAt
    ? new Date(work.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Academic Research Archive (2026)";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: work.title,
    description: work.abstract,
    author: work.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: a.affiliation ? { "@type": "Organization", name: a.affiliation } : undefined,
    })),
    datePublished: work.publishedAt || "2026",
    keywords: work.keywords.join(", "),
    publisher: {
      "@type": "Person",
      name: "Md. Ismail Hossain",
      url: "https://github.com/smile-plzz",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-9">
        {/* Guided Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <Breadcrumbs
            items={[
              { label: "Research Publications", href: "/#research-archive" },
              ...(domain
                ? [{ label: domain.name, href: `/research-areas/${domain.slug}` }]
                : []),
              { label: work.title },
            ]}
          />

          <Tooltip content="Return to searchable publication list">
            <Link
              href="/#research-archive"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Publications</span>
            </Link>
          </Tooltip>
        </div>

        {/* Publication Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tooltip content="Editorial publication stage derived from manuscript status or manifest">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-academic/10 text-academic dark:text-academic-dark cursor-default">
                {work.status}
              </span>
            </Tooltip>
            <Tooltip content="Format classification for this research record">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 cursor-default">
                {work.type.replace("-", " ").toUpperCase()}
              </span>
            </Tooltip>
            {work.editions.length > 1 && (
              <Tooltip content="Multiple related source editions or versions are grouped under this single study">
                <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 cursor-default">
                  <Layers className="w-3 h-3" />
                  {work.editions.length} Editions Grouped
                </span>
              </Tooltip>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-[1.15] tracking-tight">
            {work.title}
          </h1>

          {work.subtitle && (
            <p className="text-lg sm:text-xl font-serif italic text-stone-600 dark:text-stone-300">
              {work.subtitle}
            </p>
          )}

          {/* Authors & Affiliations */}
          <div className="pt-2 text-sm text-stone-700 dark:text-stone-300">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {work.authors.map((author, index) => (
                <div key={index} className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {author.name}
                  </span>
                  {author.affiliation && (
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      ({author.affiliation})
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <MetadataProvenancePill
                label="Authorship"
                source={work.authorsProvenance.source}
                method={work.authorsProvenance.method}
                verified={work.authorsProvenance.verified}
              />
            </div>
          </div>

          {/* Chronological & Reading Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
            <Tooltip content="Publication date or archive year">
              <div className="flex items-center gap-1.5 cursor-default">
                <Calendar className="w-3.5 h-3.5" />
                <span>{displayDate}</span>
              </div>
            </Tooltip>

            {work.readingTimeMinutes && (
              <Tooltip content="Estimated full-text reading duration at ~220 words per minute">
                <div className="flex items-center gap-1.5 cursor-default">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{work.readingTimeMinutes} min reading time ({work.wordCount?.toLocaleString()} words)</span>
                </div>
              </Tooltip>
            )}

            <Tooltip content="Detected repository structural pattern used during automated ingestion">
              <div className="flex items-center gap-1.5 cursor-default">
                <Cpu className="w-3.5 h-3.5" />
                <span className="capitalize">{work.archetype.replace(/-/g, " ")}</span>
              </div>
            </Tooltip>
          </div>
        </header>

        {/* Guided Quick-Jump Section Bar */}
        <nav
          aria-label="Jump to publication section"
          className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl border border-stone-200/90 dark:border-stone-800/90 bg-white/80 dark:bg-stone-900/50 text-xs"
        >
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 px-1.5">
            On this page:
          </span>
          <a
            href="#abstract"
            className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-academic dark:hover:text-academic-dark transition-colors"
          >
            Abstract
          </a>
          <a
            href="#editions"
            className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-academic dark:hover:text-academic-dark transition-colors"
          >
            Source Editions
          </a>
          {manuscriptContent && (
            <a
              href="#manuscript"
              className="px-2.5 py-1 rounded-md bg-academic/10 text-academic dark:text-academic-dark font-medium hover:bg-academic/20 transition-colors"
            >
              Read Manuscript
            </a>
          )}
          {work.artifacts.length > 0 && (
            <a
              href="#artifacts"
              className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-academic dark:hover:text-academic-dark transition-colors"
            >
              Files & Datasets ({work.artifacts.length})
            </a>
          )}
          <a
            href="#citation"
            className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-academic dark:hover:text-academic-dark transition-colors"
          >
            Cite
          </a>
          {relatedProjects.length > 0 && (
            <a
              href="#related-projects"
              className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:underline transition-colors"
            >
              Companion Software ({relatedProjects.length})
            </a>
          )}
        </nav>

        {/* Abstract Box */}
        <section
          id="abstract"
          className="p-6 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 space-y-3 scroll-mt-28"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
            <h2 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <span>Abstract</span>
              <InfoHint text="Summary extracted or normalized from the primary publication record." />
            </h2>
            <MetadataProvenancePill
              label="Summary"
              source={work.abstractProvenance.source}
              method={work.abstractProvenance.method}
              verified={work.abstractProvenance.verified}
            />
          </div>

          <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">
            {work.abstract}
          </p>

          {/* Keywords */}
          {work.keywords.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-stone-500 font-mono">Keywords:</span>
              {work.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded text-xs bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Associated Editions (TCRA Series, etc.) */}
        <div id="editions" className="scroll-mt-28">
          <EditionSelector editions={work.editions} />
        </div>

        {/* Architecture & Pipeline Summary */}
        <section className="p-4 rounded-lg border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/20 text-xs space-y-2">
          <div className="flex items-center gap-2 font-serif font-semibold text-stone-900 dark:text-stone-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Repository Architecture & Research Pipeline</span>
            <InfoHint text="Explains how source files, figures, and metadata were normalized into this publication view." />
          </div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {archetypeDesc}
          </p>
        </section>

        {/* Customizable Long-form Manuscript Reader */}
        {manuscriptContent && (
          <section
            id="manuscript"
            className="pt-6 border-t border-stone-200 dark:border-stone-800 scroll-mt-28 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200/80 dark:border-stone-800/80">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-academic" />
                <span>Primary Research Manuscript</span>
                <InfoHint text="Customize font family, size, spacing, alignment, view mode, search text, or sort any table below." />
              </h2>
              <Tooltip content="LaTeX preambles, comments, and relative GitHub asset links are automatically refined for web reading">
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400 cursor-default">
                  Interactive Reader View
                </span>
              </Tooltip>
            </div>

            <DocumentReader
              content={manuscriptContent}
              repoContext={primaryRepoContext}
              readingTimeMinutes={work.readingTimeMinutes}
              wordCount={work.wordCount}
              showToc
              showReadingProgress
              documentLabel="Research Manuscript"
            />
          </section>
        )}

        {/* Research Artifacts, Datasets & Supplementary Files with Interactive Modal */}
        <div id="artifacts" className="scroll-mt-28">
          <ArtifactList artifacts={work.artifacts} />
        </div>

        {/* Citation Box (BibTeX, APA, IEEE, Chicago & Download) */}
        <div id="citation" className="scroll-mt-28">
          <CitationBox work={work} />
        </div>

        {/* Cross-link to Companion Software in Showcase Wing */}
        {relatedProjects.length > 0 && (
          <section
            id="related-projects"
            className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3 scroll-mt-28"
          >
            <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-academic" />
              <span>Companion Software in Project Showcase</span>
              <InfoHint text="Interactive apps or downloadable tools related to this publication." />
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/showcase/${proj.slug}`}
                  className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-academic transition-colors flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">
                      {proj.name}
                    </div>
                    {proj.tagline && (
                      <p className="text-xs text-stone-600 dark:text-stone-400">
                        {proj.tagline}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Publication Navigation */}
        {(prevWork || nextWork) && (
          <nav
            aria-label="Browse neighboring publications"
            className="pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {prevWork ? (
              <Link
                href={`/works/${prevWork.slug}`}
                className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-academic transition-colors text-left"
              >
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  <ArrowLeft className="w-3 h-3" />
                  Previous publication
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-academic line-clamp-2">
                  {prevWork.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextWork && (
              <Link
                href={`/works/${nextWork.slug}`}
                className="group p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-academic transition-colors text-left sm:text-right"
              >
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  Next publication
                  <ArrowRight className="w-3 h-3" />
                </span>
                <p className="mt-1 font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-academic line-clamp-2">
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
