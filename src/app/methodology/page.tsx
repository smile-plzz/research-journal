import { ShieldCheck, GitBranch, Database, FileText, Lock, RefreshCw, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing Methodology & Open Science",
  description:
    "How GitHub serves as an auditable, reproducible single source of truth for academic publication records and empirical research.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <header className="pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Open Science & Academic Reproducibility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
          Publishing Methodology & Open Science Architecture
        </h1>
        <p className="font-serif italic text-base text-stone-600 dark:text-stone-400">
          How GitHub repositories serve as the immutable single source of truth for scholarly publications.
        </p>
      </header>

      {/* Philosophy */}
      <section className="prose-academic space-y-4">
        <p>
          Conventional academic publication systems frequently divorce the final PDF manuscript
          from the underlying computational code, analytical matrices, and versioned git commit histories
          that produced it. This platform inverts that paradigm by treating the <strong>GitHub repository as the
          primary, auditable source of truth</strong> for scholarly research.
        </p>
        <p>
          Rather than relying on manual data entry or proprietary CMS databases, this application runs an
          automated ingestion pipeline that continuously discovers eligible research repositories, extracts verified
          bibliographic metadata, normalizes multi-stage thesis revisions, and publishes a structured scholarly reading
          interface.
        </p>
      </section>

      {/* The 4-Document Project Workflow */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-academic" />
          <span>The Four-Document Project Governance Framework</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Every research repository in this ecosystem implements a rigorous four-document governance protocol
          governing research scope, execution traceability, versioning, and methodology:
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between font-mono text-xs mb-1">
              <strong className="text-stone-900 dark:text-stone-100 text-sm">README.md</strong>
              <span className="text-stone-500">Public Entrypoint</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Provides the formal project overview, research brief, primary methodology, key results, and
              the reference bibliography. Serves as the primary public entrypoint for literature review and repository navigation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between font-mono text-xs mb-1">
              <strong className="text-stone-900 dark:text-stone-100 text-sm">context.md</strong>
              <span className="text-stone-500">Theoretical Scope</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Specifies the epistemological foundations, research questions, theoretical constraints, and academic hypotheses
              governing the investigation before experimentation begins.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between font-mono text-xs mb-1">
              <strong className="text-stone-900 dark:text-stone-100 text-sm">CHANGELOG.md</strong>
              <span className="text-stone-500">Versioned Milestones</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Documents semantic versions, manuscript revisions, benchmark calibrations, and peer review adjustments
              following standard Keep-a-Changelog protocols.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between font-mono text-xs mb-1">
              <strong className="text-stone-900 dark:text-stone-100 text-sm">dev-log.md</strong>
              <span className="text-amber-600 dark:text-amber-400">Provenance Ledger (Internal)</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Maintains an immutable execution record with timestamps and test verification receipts.
              <strong> Privacy safeguard:</strong> Recognized by the ingestion system to verify reproducibility, but strictly
              shielded from automatic public web rendering.
            </p>
          </div>
        </div>
      </section>

      {/* Metadata Extraction Priority & Verification */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-academic" />
          <span>Metadata Extraction Priority & Zero Fabrication</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          To maintain strict academic integrity, this platform <strong>never fabricates</strong> DOIs, academic affiliations,
          publication dates, peer-review outcomes, or co-authors. Every extracted item is mapped to an auditable source:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
          <li>
            <strong className="text-stone-900 dark:text-stone-100">.publication.json:</strong> Highest priority manifest providing explicit publication metadata and document paths.
          </li>
          <li>
            <strong className="text-stone-900 dark:text-stone-100">CITATION.cff:</strong> Official machine-readable citation format recognized by Zenodo and GitHub.
          </li>
          <li>
            <strong className="text-stone-900 dark:text-stone-100">.zenodo.json:</strong> Archival DOI deposit manifests containing verified creators and license schemas.
          </li>
          <li>
            <strong className="text-stone-900 dark:text-stone-100">Structured README Metadata:</strong> Formal section extraction for abstracts, hypotheses, and BibTeX blocks.
          </li>
          <li>
            <strong className="text-stone-900 dark:text-stone-100">Heuristic Extraction:</strong> Heuristic analysis of file trees to detect the 5 repository archetypes.
          </li>
        </ol>
      </section>

      {/* Content vs. Metadata Layer */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Lock className="w-5 h-5 text-academic" />
          <span>Decoupled Storage & Performance</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          In typical repositories, game studies monographs or thesis drafts may exceed 90,000 words.
          Loading complete manuscript bodies into the global catalog would severely degrade page load speed.
          The platform resolves this through a dual-tier content architecture:
        </p>

        <ul className="space-y-3 text-xs pt-1">
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">Tier 1: catalog.json (Fast Metadata Layer)</strong>
            <span>
              Contains lightweight metadata, abstracts, keywords, edition listings, and artifact URLs (~30 KB total).
              Enables instantaneous search and filtering with zero database latency.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">Tier 2: Cached Manuscripts (works/[slug].md)</strong>
            <span>
              Long-form manuscripts are cached in isolated markdown files and read on demand only when a reader navigates to that specific publication page.
            </span>
          </li>
        </ul>
      </section>

      {/* Daily Automated Sync */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-academic" />
          <span>Automated Daily Synchronization</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          The publication archive runs a scheduled GitHub Actions workflow every 24 hours.
          The workflow inspects the repository file trees, normalizes new editions, validates schemas with Zod,
          and pushes updates to Vercel only when actual catalog content changes. If any source repository is temporarily
          unavailable, the pipeline safely preserves the last good catalog without data loss.
        </p>
      </section>
    </div>
  );
}

