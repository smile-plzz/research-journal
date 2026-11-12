import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { curatedCollections } from "@/config/collections";
import { getWorkBySlug } from "@/lib/catalog/queries";
import { getProjectBySlug } from "@/lib/showcase/queries";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Hand-curated groupings across research papers and software projects.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Breadcrumbs items={[{ label: "Collections" }]} />

      <header className="space-y-2 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Collections
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          Curated reading and software lists grouped by theme across both wings.
        </p>
      </header>

      <div className="divide-y divide-hairline">
        {curatedCollections.map((collection) => {
          const resolved = collection.items
            .map((ref) => {
              if (ref.kind === "work") {
                const w = getWorkBySlug(ref.slug);
                return w
                  ? {
                      key: `w:${w.slug}`,
                      kind: "Research" as const,
                      title: w.title,
                      summary: w.abstract,
                      href: `/works/${w.slug}`,
                    }
                  : null;
              }
              const p = getProjectBySlug(ref.slug);
              return p
                ? {
                    key: `p:${p.slug}`,
                    kind: "Showcase" as const,
                    title: p.name,
                    summary: p.tagline || p.description,
                    href: `/showcase/${p.slug}`,
                  }
                : null;
            })
            .filter((item): item is NonNullable<typeof item> => Boolean(item));

          if (resolved.length === 0) return null;

          return (
            <section key={collection.id} className="py-8 first:pt-0 space-y-4">
              <div className="space-y-1.5">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                  {collection.title}
                </h2>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {collection.description}
                </p>
              </div>

              <ul className="divide-y divide-hairline rounded-card border border-hairline bg-surface">
                {resolved.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="min-h-[52px] px-4 py-3.5 flex items-center justify-between gap-4 hover:bg-surface-muted/50 transition-colors"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <Chip>{item.kind}</Chip>
                          <span className="font-serif font-semibold text-base text-ink truncate">
                            {item.title}
                          </span>
                        </div>
                        {item.summary && (
                          <p className="text-xs text-ink-secondary line-clamp-1">
                            {item.summary}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        className="w-4 h-4 text-ink-secondary flex-shrink-0"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
