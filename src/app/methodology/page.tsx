import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How GitHub serves as an auditable, static-first single source of truth for academic publications and software showcase pages.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <Breadcrumbs items={[{ label: "Methodology" }]} />

      <header className="space-y-2 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          How this site works
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          GitHub repositories serve as the single, auditable source of truth with zero runtime
          database.
        </p>
      </header>

      <section className="prose-academic space-y-4">
        <p>
          Every research publication and software project on this site is generated statically from
          public or explicitly configured repositories. A daily automated sync inspects repository
          metadata, normalizes manuscripts and release assets, validates schemas, and commits
          updates for static deployment.
        </p>
        <p>
          To maintain academic integrity, the pipeline never fabricates DOIs, affiliations,
          publication dates, or peer-review claims. Missing fields remain empty and carry provenance
          records pointing to their exact source.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-hairline">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Metadata extraction priority
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-ink-secondary leading-relaxed">
          <li>
            <strong className="text-ink">.publication.json</strong>: Explicit publication manifest
            and document paths.
          </li>
          <li>
            <strong className="text-ink">CITATION.cff</strong>: Machine-readable citation file.
          </li>
          <li>
            <strong className="text-ink">.zenodo.json</strong>: Archival deposit metadata.
          </li>
          <li>
            <strong className="text-ink">README.md</strong>: Structured abstracts, links, and
            project documentation.
          </li>
          <li>
            <strong className="text-ink">Repository heuristics</strong>: File-tree inspection for
            datasets, PDFs, and release binaries.
          </li>
        </ol>
      </section>

      <section className="space-y-4 pt-4 border-t border-hairline">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Separated content layers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-card border border-hairline bg-surface space-y-1">
            <div className="font-medium text-ink">Metadata index</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Lightweight catalog JSON powers fast client filtering and lazy-loaded search without
              shipping manuscript bodies.
            </p>
          </div>
          <div className="p-4 rounded-card border border-hairline bg-surface space-y-1">
            <div className="font-medium text-ink">Pre-rendered manuscripts</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Full texts and READMEs are compiled on the server at build time per route, keeping
              browser JavaScript minimal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
