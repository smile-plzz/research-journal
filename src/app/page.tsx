import { getAllWorks, getFeaturedWorks } from "@/lib/catalog/queries";
import { getAllProjects, getFeaturedProjects } from "@/lib/showcase/queries";
import { JournalSearch } from "@/components/search/JournalSearch";
import { ProjectCard } from "@/components/showcase/ProjectCard";
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
  Compass,
  Code2,
  Download,
  Globe,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const allWorks = getAllWorks();
  const featuredWorks = getFeaturedWorks();
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="space-y-14">
      {/* Two-Wing Hero */}
      <section className="pt-4 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono bg-academic/10 text-academic dark:text-academic-dark mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Research and Projects by Md. Ismail Hossain</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight max-w-3xl mb-4">
          Scholarly research monographs alongside software built for everyday use.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed mb-7">
          Browse two equal wings of work by{" "}
          <strong className="text-stone-800 dark:text-stone-200 font-medium">
            Md. Ismail Hossain
          </strong>
          : peer-style research publications and empirical studies in the Research wing, or
          browser-ready web apps and downloadable tools in the Project Showcase.
        </p>

        {/* Two Equal-Weight Wing Entry Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="#research-archive"
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic transition-all group flex flex-col justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-academic dark:text-academic-dark">
                <span>Wing A: Research</span>
                <span>{allWorks.length} Works</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-academic" />
                <span>Research Library</span>
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Master&apos;s thesis frameworks, game studies monographs, public health GIS studies, and
                computational investigations.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors">
              <span>Browse publications below</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <Link
            href="/showcase"
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic transition-all group flex flex-col justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-academic dark:text-academic-dark">
                <span>Wing B: Showcase</span>
                <span>{allProjects.length} Projects</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-academic" />
                <span>Project Showcase</span>
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Web apps to try in your browser and Windows or Android software you can download
                directly, with no developer setup needed.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors">
              <span>Open project showcase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Quick Highlights / Stats Bar */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-stone-500 dark:text-stone-400">
          <Tooltip content="Peer-style theses, preprints, monographs, and computational studies">
            <div className="flex items-center gap-1.5 cursor-default">
              <BookOpen className="w-4 h-4 text-academic" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">{allWorks.length}</strong>{" "}
                Scholarly Works
              </span>
            </div>
          </Tooltip>
          <Tooltip content="Plain-language apps, desktop utilities, and developer tools">
            <div className="flex items-center gap-1.5 cursor-default">
              <Code2 className="w-4 h-4 text-academic" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">{allProjects.length}</strong>{" "}
                Software Projects
              </span>
            </div>
          </Tooltip>
          <Tooltip content="Five interdisciplinary subject taxonomies organizing the research catalog">
            <div className="flex items-center gap-1.5 cursor-default">
              <Layers className="w-4 h-4 text-stone-500" />
              <span>
                <strong className="text-stone-800 dark:text-stone-200">5</strong> Research Domains
              </span>
            </div>
          </Tooltip>
          <Tooltip content="Metadata provenance tracking + direct OS installer and APK release downloads">
            <div className="flex items-center gap-1.5 cursor-default">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Auditable Provenance & Direct Releases</span>
            </div>
          </Tooltip>
        </div>

        {/* Guided Quick-Start Strip */}
        <div className="mt-6 pt-5 border-t border-stone-200/70 dark:border-stone-800/70 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-500 dark:text-stone-400 font-medium mr-1">
            I want to:
          </span>
          <Tooltip content="Filter projects to live web apps you can open immediately">
            <Link
              href="/showcase?status=live"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic text-stone-700 dark:text-stone-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Try a web app</span>
            </Link>
          </Tooltip>
          <Tooltip content="See packaged Windows apps and Android APKs ready for direct download">
            <Link
              href="/showcase?status=downloadable"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic text-stone-700 dark:text-stone-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Download software</span>
            </Link>
          </Tooltip>
          <Tooltip content="Open Ismail's signature Master's thesis manuscript on AI automation trust">
            <Link
              href="/works/tcra-intelligence-automation-boundary"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic text-stone-700 dark:text-stone-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-academic" />
              <span>Read the TCRA thesis</span>
            </Link>
          </Tooltip>
          <Tooltip content="Explore publications grouped across all five academic topics">
            <Link
              href="/research-areas"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 hover:border-academic text-stone-700 dark:text-stone-300 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>Browse by research topic</span>
            </Link>
          </Tooltip>
        </div>
      </section>

      {/* Featured Projects Strip (Wing B) */}
      {featuredProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-sm uppercase tracking-wider font-mono font-medium text-stone-500 dark:text-stone-400 flex items-center gap-2">
              <span>Featured Projects</span>
              <InfoHint text="Highlighted everyday software tools you can launch online or download directly." />
            </h2>
            <Tooltip content="Open the full searchable software gallery">
              <Link
                href="/showcase"
                className="text-xs text-academic hover:underline flex items-center gap-1 font-sans"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </section>
      )}

      {/* Latest Research / Selected Research Highlights Strip (Wing A) */}
      {featuredWorks.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-sm uppercase tracking-wider font-mono font-medium text-stone-500 dark:text-stone-400">
              Latest Research Highlights
            </h2>
            <div className="flex items-center gap-4 text-xs font-sans">
              <Link
                href="/research-areas"
                className="text-academic hover:underline flex items-center gap-1"
              >
                <span>Research Areas</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/methodology"
                className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:underline"
              >
                Methodology
              </Link>
            </div>
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
      <section id="research-archive" className="space-y-6 pt-4 scroll-mt-24">
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
