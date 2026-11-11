"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Download,
  Globe,
  Layers,
  Mail,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

export interface QuickJumpWorkItem {
  slug: string;
  title: string;
  status: string;
  domainId: string;
}

export interface QuickJumpProjectItem {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  hasLive: boolean;
  hasDownload: boolean;
}

interface QuickJumpModalProps {
  works: QuickJumpWorkItem[];
  projects: QuickJumpProjectItem[];
}

export function QuickJumpTrigger({ works, projects }: QuickJumpModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        works: works.slice(0, 4),
        projects: projects.slice(0, 5),
      };
    }

    return {
      works: works
        .filter(
          (w) =>
            w.title.toLowerCase().includes(q) ||
            w.status.toLowerCase().includes(q) ||
            w.domainId.toLowerCase().includes(q)
        )
        .slice(0, 6),
      projects: projects
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.status.toLowerCase().includes(q)
        )
        .slice(0, 8),
    };
  }, [query, works, projects]);

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Tooltip content="Quickly search or jump to any paper, app, or section" shortcut="Ctrl+K" position="bottom">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Quick navigation and global search"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/70 text-xs text-stone-600 dark:text-stone-300 hover:border-academic hover:text-stone-900 dark:hover:text-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
        >
          <Search className="w-3.5 h-3.5 text-stone-400" />
          <span className="hidden md:inline">Quick Jump</span>
          <kbd className="hidden lg:inline-block rounded bg-stone-100 dark:bg-stone-800 px-1 py-0.5 text-[10px] font-mono text-stone-500 dark:text-stone-400">
            Ctrl+K
          </kbd>
        </button>
      </Tooltip>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Quick site navigation"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-stone-200 dark:border-stone-800 bg-cream-50 dark:bg-stone-950 shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/70">
              <Search className="w-4 h-4 text-academic flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search publications, software apps, categories, or pages..."
                className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quick jump"
                className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5 text-xs">
              {/* Guided Shortcuts when query empty */}
              {!query.trim() && (
                <div className="space-y-2">
                  <div className="font-mono uppercase tracking-wider text-[10px] text-stone-400 px-1">
                    Guided Shortcuts
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => navigateTo("/showcase?status=live")}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-academic text-left transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Try Live Web Apps</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo("/showcase?status=downloadable")}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-academic text-left transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                        <Download className="w-3.5 h-3.5 text-sky-600" />
                        <span>Direct Software Downloads</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo("/research-areas")}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-academic text-left transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                        <Layers className="w-3.5 h-3.5 text-academic" />
                        <span>Explore 5 Research Domains</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo("/methodology")}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-academic text-left transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Publishing Methodology</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo("/about")}
                      className="sm:col-span-2 flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-academic text-left transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-stone-800 dark:text-stone-200">
                        <Mail className="w-3.5 h-3.5 text-academic" />
                        <span>About, Buy a Build, or Collaborate with Md. Ismail Hossain</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Showcase Matches */}
              {results.projects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="font-mono uppercase tracking-wider text-[10px] text-stone-400 px-1 flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-academic" />
                    <span>Software Showcase</span>
                  </div>
                  {results.projects.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => navigateTo(`/showcase/${p.slug}`)}
                      className="w-full flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/70 text-left transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-stone-900 dark:text-stone-100 truncate">
                          {p.name}
                        </div>
                        {p.tagline && (
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                            {p.tagline}
                          </div>
                        )}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-mono text-stone-600 dark:text-stone-300 flex-shrink-0">
                        {p.hasLive ? "Live" : p.hasDownload ? "Download" : p.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Research Matches */}
              {results.works.length > 0 && (
                <div className="space-y-1.5">
                  <div className="font-mono uppercase tracking-wider text-[10px] text-stone-400 px-1 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-academic" />
                    <span>Research Publications</span>
                  </div>
                  {results.works.map((w) => (
                    <button
                      key={w.slug}
                      type="button"
                      onClick={() => navigateTo(`/works/${w.slug}`)}
                      className="w-full flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800/70 text-left transition-colors"
                    >
                      <span className="font-serif font-medium text-stone-900 dark:text-stone-100 truncate">
                        {w.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-academic/10 text-academic dark:text-academic-dark text-[10px] font-mono flex-shrink-0">
                        {w.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {results.projects.length === 0 && results.works.length === 0 && (
                <p className="text-center py-6 text-stone-500 dark:text-stone-400">
                  No matching projects or papers found for &ldquo;{query}&rdquo;.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

