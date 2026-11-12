import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { researchDomains } from "@/config/domains";
import { getAllWorks, getWorksByDomain } from "@/lib/catalog/queries";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Research Areas",
  description:
    "Explore scholarly research domains across AI/HCI Software Trust, Critical Game Studies, Spatial Public Health, Digital Forensics, and Computational Musicology.",
};

export default function ResearchAreasPage() {
  const allWorks = getAllWorks();

  return (
    <div className="max-w-3xl space-y-10">
      <Breadcrumbs items={[{ label: "Research Areas" }]} />

      <header className="space-y-2.5 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Research Areas
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          {allWorks.length} works organized across five research areas.
        </p>
      </header>

      <div className="divide-y divide-hairline">
        {researchDomains.map((domain) => {
          const worksInDomain = getWorksByDomain(domain.id);

          return (
            <section key={domain.id} className="py-7 first:pt-0 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                  <Link
                    href={`/research-areas/${domain.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {domain.name}
                  </Link>
                </h2>
                <Link
                  href={`/research-areas/${domain.slug}`}
                  className="min-h-[36px] inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                >
                  <span>{worksInDomain.length} works</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>

              <p className="text-sm text-ink-secondary leading-relaxed">
                {domain.description}
              </p>

              {worksInDomain.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {worksInDomain.map((w) => (
                    <li key={w.id}>
                      <Link
                        href={`/works/${w.slug}`}
                        className="min-h-[40px] py-1.5 flex items-baseline justify-between gap-4 text-sm group"
                      >
                        <span className="font-serif text-ink group-hover:text-accent transition-colors">
                          {w.title}
                        </span>
                        <span className="text-xs text-ink-secondary flex-shrink-0">
                          {w.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
