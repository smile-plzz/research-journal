import { getAllWorks, getFeaturedWorks } from "@/lib/catalog/queries";
import { researchDomains } from "@/config/domains";
import { JournalSearch } from "@/components/search/JournalSearch";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { BookOpen, Sparkles, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export default function HomePage() {
  const allWorks = getAllWorks();
  const featuredWorks = getFeaturedWorks();

  return (
    <div className="space-y-12">
      {/* Editorial Header / Scholarly Hero Statement */}
      <section className="pt-4 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-academic/10 text-academic dark:text-academic-dark mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Academic Publication Archive</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight max-w-3xl mb-4">
          Scholarly investigations into software trust, interactive ludology, and empirical data science.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed mb-6">
          This platform functions as a peer research journal and publication record for{" "}
          <strong className="text-stone-800 dark:text-stone-200 font-medium">
            Md. Ismail Hossain
          </strong>
          . Manuscripts, empirical models, thesis frameworks, and cultural datasets are
          automatically ingested, validated, and normalized from source GitHub repositories.
        </p>

        {/* Quick Highlights / Stats Bar */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-academic" />
            <span>
              <strong className="text-stone-800 dark:text-stone-200">{allWorks.length}</strong> Works
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-stone-500" />
            <span>
              <strong className="text-stone-800 dark:text-stone-200">5</strong> Research Domains
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Auditable CFF & Zenodo Provenance</span>
          </div>
        </div>
      </section>

      {/* Featured Research Spotlight */}
      {featuredWorks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-sm uppercase tracking-wider font-mono font-medium text-stone-500 dark:text-stone-400">
              Selected Research Highlights
            </h2>
            <Link
              href="/research-areas"
              className="text-xs text-academic hover:underline flex items-center gap-1 font-sans"
            >
              <span>Explore All Domains</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredWorks.slice(0, 2).map((work) => (
              <div
                key={work.id}
                className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 hover:border-academic dark:hover:border-academic-dark transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[11px] text-academic font-medium">
                      {work.status}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px]">
                      {work.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                    <Link
                      href={`/works/${work.slug}`}
                      className="hover:text-academic transition-colors"
                    >
                      {work.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4">
                    {work.abstract}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs">
                  <span className="text-stone-500 dark:text-stone-400 truncate max-w-[200px]">
                    {work.authors[0]?.name}
                  </span>
                  <Link
                    href={`/works/${work.slug}`}
                    className="font-serif font-medium text-stone-900 dark:text-stone-100 hover:text-academic transition-colors flex items-center gap-1"
                  >
                    <span>Read Paper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Publication Index with Search & Faceted Filtering */}
      <section className="space-y-6 pt-4">
        <div className="flex items-baseline justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Scholarly Publications & Monograph Archive
          </h2>
        </div>

        <JournalSearch initialWorks={allWorks} />
      </section>
    </div>
  );
}

