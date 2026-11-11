import { researchDomains } from "@/config/domains";
import { getAllWorks, getWorksByDomain } from "@/lib/catalog/queries";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Areas & Academic Taxonomies",
  description:
    "Explore scholarly research domains across AI/HCI Software Trust, Critical Game Studies, Spatial Public Health, Digital Forensics, and Computational Musicology.",
};

export default function ResearchAreasPage() {
  const allWorks = getAllWorks();

  return (
    <div className="space-y-10">
      <div className="pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
        <Breadcrumbs items={[{ label: "Research Areas" }]} />
      </div>

      {/* Page Header */}
      <header className="pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <span>Research Areas & Academic Taxonomies</span>
          <InfoHint text="Five thematic domains mapping each repository to a scholarly discipline." />
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 font-sans max-w-3xl leading-relaxed">
          The publication archive ({allWorks.length} indexed works) is organized into five foundational academic domains.
          Each domain encapsulates distinct theoretical frameworks, computational pipelines,
          and empirical datasets.
        </p>
      </header>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 gap-8">
        {researchDomains.map((domain) => {
          const worksInDomain = getWorksByDomain(domain.id);

          return (
            <section
              key={domain.id}
              className="p-6 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/40 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded border text-xs font-medium ${domain.color.bg} ${domain.color.text} ${domain.color.border}`}
                  >
                    {domain.shortName}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    {worksInDomain.length} Works
                  </span>
                </div>

                <Link
                  href={`/research-areas/${domain.slug}`}
                  className="text-xs font-medium text-academic hover:underline inline-flex items-center gap-1 font-sans"
                >
                  <span>View All Works in Domain</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                <Link
                  href={`/research-areas/${domain.slug}`}
                  className="hover:text-academic transition-colors"
                >
                  {domain.name}
                </Link>
              </h2>

              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                {domain.longDescription}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                {domain.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Sample Works list */}
              {worksInDomain.length > 0 && (
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
                    Publications in this Domain:
                  </h3>
                  <ul className="space-y-2">
                    {worksInDomain.map((w) => (
                      <li key={w.id} className="flex items-baseline justify-between gap-4 text-xs">
                        <Link
                          href={`/works/${w.slug}`}
                          className="font-serif font-medium text-stone-800 dark:text-stone-200 hover:text-academic transition-colors line-clamp-1"
                        >
                          {w.title}
                        </Link>
                        <span className="font-mono text-stone-400 text-[11px] flex-shrink-0">
                          {w.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

