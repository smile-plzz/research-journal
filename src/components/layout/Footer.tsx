import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GitBranch, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-cream-100/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 text-sm mt-20 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Identity & Scope */}
          <div>
            <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Research Journal: Research and Projects
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              A two-wing publication archive and software showcase by Md. Ismail Hossain:
              academic research monographs alongside everyday web apps, desktop tools, and
              Android software.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Full metadata provenance transparency</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider mb-3">
              Explore Both Wings
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Wing A: Research Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Wing B: Project Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/research-areas"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Research Domains & Taxonomies
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Publishing Methodology & Open Science
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  About Md. Ismail Hossain
                </Link>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  target="_blank"
                  className="text-academic hover:underline transition-colors flex items-center gap-1"
                >
                  <span>Academic RSS Feed</span>
                  <span className="text-[10px] font-mono">XML</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Provenance & Synchronization */}
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider mb-3">
              Provenance & Sync
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3">
              Source of truth: GitHub (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-stone-900 dark:hover:text-stone-100"
              >
                @{siteConfig.author.githubUsername}
              </a>
              ). Synchronized via scheduled GitHub Actions workflow with static-first delivery and
              direct software releases.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Catalogs v1.0.0 · Static-First</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div>
            © {new Date().getFullYear()} Md. Ismail Hossain. Open research and open software.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Academic Portfolio
            </a>
            <span>·</span>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
