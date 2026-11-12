import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { researchDomains, getDomainById } from "@/config/domains";
import { getWorksByDomain } from "@/lib/catalog/queries";
import { PublicationCard } from "@/components/publication/PublicationCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ChipList } from "@/components/ui/Chip";

interface DomainPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return researchDomains.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: DomainPageProps): Promise<Metadata> {
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
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Research Areas", href: "/research-areas" },
          { label: domain.shortName },
        ]}
      />

      <header className="max-w-2xl space-y-3 pb-6 border-b border-hairline">
        <div className="text-xs text-ink-secondary">
          {domain.shortName} · {works.length}{" "}
          {works.length === 1 ? "work" : "works"}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          {domain.name}
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          {domain.longDescription}
        </p>
        <ChipList items={domain.keywords} maxVisible={4} />
      </header>

      <section className="space-y-4">
        {works.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {works.map((work) => (
              <PublicationCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-secondary py-8">
            No research works indexed under this area yet.
          </p>
        )}
      </section>
    </div>
  );
}
