import { notFound } from "next/navigation";
import { getAllWorks, getWorkBySlug, getManuscriptContent } from "@/lib/catalog/queries";
import { getRelatedProjectsForWork } from "@/lib/showcase/queries";
import { getDomainById } from "@/config/domains";
import { getArchetypeDescription } from "@/lib/classification/detect-archetype";
import { MetadataProvenancePill } from "@/components/publication/MetadataProvenancePill";
import { EditionSelector } from "@/components/publication/EditionSelector";
import { CitationBox } from "@/components/publication/CitationBox";
import { ArtifactList } from "@/components/publication/ArtifactList";
import { TableOfContents } from "@/components/publication/TableOfContents";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { ReadingToolbar } from "@/components/publication/ReadingToolbar";
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

  const domain = getDomainById(work.domainId);
  const manuscriptContent = getManuscriptContent(work.slug);
  const archetypeDesc = getArchetypeDescription(work.archetype);
  const relatedProjects = getRelatedProjectsForWork(work.slug);

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

      <article className="space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-sans text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Publications Index</span>
          </Link>

          {domain && (
            <Link
              href={`/research-areas/${domain.slug}`}
              className="hover:text-academic transition-colors font-medium"
            >
              {domain.name}
            </Link>
          )}
        </div>

        {/* Publication Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-academic/10 text-academic dark:text-academic-dark">
              {work.status}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800">
              {work.type.replace("-", " ").toUpperCase()}
            </span>
            {work.editions.length > 1 && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                <Layers className="w-3 h-3" />
                {work.editions.length} Editions Grouped
              </span>
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
                      — {author.affiliation}
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
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{displayDate}</span>
            </div>

            {work.readingTimeMinutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>~{work.readingTimeMinutes} min reading time ({work.wordCount?.toLocaleString()} words)</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span className="capitalize">{work.archetype.replace(/-/g, " ")}</span>
            </div>
          </div>
        </header>

        {/* Abstract Box */}
        <section className="p-6 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
            <h2 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Abstract
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
        <EditionSelector editions={work.editions} />

        {/* Architecture & Pipeline Summary */}
        <section className="p-4 rounded-lg border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/20 text-xs space-y-2">
          <div className="flex items-center gap-2 font-serif font-semibold text-stone-900 dark:text-stone-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Repository Architecture & Research Pipeline</span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {archetypeDesc}
          </p>
        </section>

        {/* Long-form Manuscript Reader, Reading Toolbar & Sticky TOC */}
        {manuscriptContent && (
          <section className="pt-6 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/80 dark:border-stone-800/80">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-academic" />
                <span>Primary Research Manuscript</span>
              </h2>
              <span className="text-xs font-mono text-stone-400">
                Extracted Markdown Source
              </span>
            </div>

            {/* Reading Toolbar with Progress & Font Controls */}
            <ReadingToolbar
              readingTimeMinutes={work.readingTimeMinutes}
              wordCount={work.wordCount}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
              {/* Main Reading Column */}
              <div className="lg:col-span-3 min-w-0">
                <MarkdownRenderer content={manuscriptContent} />
              </div>

              {/* Sticky TOC Sidebar */}
              <aside className="hidden lg:block lg:col-span-1">
                <TableOfContents content={manuscriptContent} />
              </aside>
            </div>
          </section>
        )}

        {/* Research Artifacts, Datasets & Supplementary Files with Interactive Modal */}
        <ArtifactList artifacts={work.artifacts} />

        {/* Citation Box (BibTeX, APA, IEEE, Chicago & Download) */}
        <CitationBox work={work} />

        {/* Cross-link to Companion Software in Showcase Wing */}
        {relatedProjects.length > 0 && (
          <section className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <h2 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-academic" />
              <span>Companion Software in Project Showcase</span>
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
      </article>
    </>
  );
}
