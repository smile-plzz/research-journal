import { notFound } from "next/navigation";
import { researchDomains, getDomainById } from "@/config/domains";
import { getWorksByDomain } from "@/lib/catalog/queries";
import { PublicationCard } from "@/components/publication/PublicationCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface DomainPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return researchDomains.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = getDomainById(slug);
  if (!domain) return { title: "Domain Not Found" };

  return {
    title: `${domain.name} | Research Areas`,
    description: domain.description,
  };
}

export default async function DomainDetailPage({ params }: DomainPageProps) {
  const { slug } = await params;
  const domain = getDomainById(slug);

  if (!domain) {
    notFound();
  }

  const works = getWorksByDomain(domain.id);

  return (
    <div className="space-y-10">
      {/* Guided Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
        <Breadcrumbs
          items={[
            { label: "Research Areas", href: "/research-areas" },
            { label: domain.name },
          ]}
        />
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-stone-500">{works.length} Works</span>
          <Tooltip content="Return to all five research areas">
            <Link
              href="/research-areas"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Areas</span>
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* Domain Header */}
      <header className="space-y-4">
        <span
          className={`inline-block px-2.5 py-0.5 rounded border text-xs font-medium ${domain.color.bg} ${domain.color.text} ${domain.color.border}`}
        >
          {domain.shortName}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          {domain.name}
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 font-sans max-w-3xl leading-relaxed">
          {domain.longDescription}
        </p>

        {/* Domain Keywords */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          {domain.keywords.map((kw) => (
            <span
              key={kw}
              className="px-2 py-0.5 rounded text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
            >
              #{kw}
            </span>
          ))}
        </div>
      </header>

      {/* Works Listing in Domain */}
      <section className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
          Publications & Monograph Records ({works.length})
        </h2>

        {works.length > 0 ? (
          <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
            {works.map((work) => (
              <PublicationCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-500 py-8">
            No research works currently indexed under this domain.
          </p>
        )}
      </section>
    </div>
  );
}

