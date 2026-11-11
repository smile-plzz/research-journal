"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";
import { ArrowRight, BookOpen, Compass, Download, Globe, Layers, ShieldCheck } from "lucide-react";

export function GuidedSubnav() {
  const pathname = usePathname();
  const isShowcase = pathname.startsWith("/showcase");
  const isAbout = pathname.startsWith("/about");

  return (
    <div className="border-b border-stone-200/70 dark:border-stone-800/70 bg-cream-100/50 dark:bg-stone-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        {isShowcase ? (
          <>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hidden sm:inline">
                Showcase Guide:
              </span>
              <Tooltip content="View the complete software showcase gallery">
                <Link
                  href="/showcase"
                  className={`px-2 py-0.5 rounded transition-colors ${
                    pathname === "/showcase"
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  All Projects
                </Link>
              </Tooltip>
              <Tooltip content="Filter to web apps you can launch right in your browser">
                <Link
                  href="/showcase?status=live"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <Globe className="w-3 h-3 text-emerald-600" />
                  <span>Live Web Apps</span>
                </Link>
              </Tooltip>
              <Tooltip content="Filter to Windows, macOS, Android, and extension installers">
                <Link
                  href="/showcase?status=downloadable"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <Download className="w-3 h-3 text-sky-600" />
                  <span>Direct Downloads</span>
                </Link>
              </Tooltip>
              <Tooltip content="Desktop apps for Windows, macOS, and Linux">
                <Link
                  href="/showcase/categories/desktop-app"
                  className={`px-2 py-0.5 rounded transition-colors hidden sm:inline ${
                    pathname === "/showcase/categories/desktop-app"
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  Desktop
                </Link>
              </Tooltip>
              <Tooltip content="Android and Android TV apps">
                <Link
                  href="/showcase/categories/mobile-app"
                  className={`px-2 py-0.5 rounded transition-colors hidden sm:inline ${
                    pathname === "/showcase/categories/mobile-app"
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  Mobile & TV
                </Link>
              </Tooltip>
            </div>

            <Tooltip content="Switch over to academic papers, theses, and datasets">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-academic hover:underline"
              >
                <BookOpen className="w-3 h-3" />
                <span>Research Wing</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Tooltip>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hidden sm:inline">
                {isAbout ? "Quick Navigation:" : "Research Guide:"}
              </span>
              <Tooltip content="View all publications and filterable archive">
                <Link
                  href="/"
                  className={`px-2 py-0.5 rounded transition-colors ${
                    pathname === "/"
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  Publications
                </Link>
              </Tooltip>
              <Tooltip content="Browse works grouped across 5 academic domains">
                <Link
                  href="/research-areas"
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                    pathname.startsWith("/research-areas")
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Research Areas</span>
                </Link>
              </Tooltip>
              <Tooltip content="Learn how GitHub provenance and zero-fabrication rules work">
                <Link
                  href="/methodology"
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                    pathname.startsWith("/methodology")
                      ? "font-medium text-academic bg-academic/10"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Methodology</span>
                </Link>
              </Tooltip>
            </div>

            <Tooltip content="Try live web apps or download desktop & Android software">
              <Link
                href="/showcase"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-academic hover:underline"
              >
                <Compass className="w-3 h-3" />
                <span>Software Showcase</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
}

