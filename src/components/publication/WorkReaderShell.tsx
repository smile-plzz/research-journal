"use client";

import React, { useEffect, useState } from "react";
import { List, Quote, Type, ExternalLink, CheckCircle2 } from "lucide-react";
import { Work } from "@/lib/catalog/schema";
import { ExtractedHeading } from "@/lib/markdown/reader-prefs";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { CitationBox } from "@/components/publication/CitationBox";

interface WorkReaderShellProps {
  work: Work;
  headings: ExtractedHeading[];
  archetypeDesc: string;
  children: React.ReactNode;
}

type FontFamilyOption = "serif" | "sans";
type FontSizeOption = "sm" | "base" | "lg" | "xl";

const PREFS_KEY = "rj-reader-prefs-v2";
const FONT_SIZE_ORDER: FontSizeOption[] = ["sm", "base", "lg", "xl"];

export function WorkReaderShell({
  work,
  headings,
  archetypeDesc,
  children,
}: WorkReaderShellProps) {
  const [fontFamily, setFontFamily] = useState<FontFamilyOption>("serif");
  const [fontSize, setFontSize] = useState<FontSizeOption>("base");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [citeOpen, setCiteOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);

  // Restore saved typography prefs and scroll position for this work
  useEffect(() => {
    try {
      const savedPrefs = window.localStorage.getItem(PREFS_KEY);
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs) as {
          fontFamily?: FontFamilyOption;
          fontSize?: FontSizeOption;
        };
        if (parsed.fontFamily === "serif" || parsed.fontFamily === "sans") {
          setFontFamily(parsed.fontFamily);
        }
        if (parsed.fontSize && FONT_SIZE_ORDER.includes(parsed.fontSize)) {
          setFontSize(parsed.fontSize);
        }
      }

      const savedScroll = window.localStorage.getItem(`rj-scroll-${work.slug}`);
      if (savedScroll && window.scrollY < 40 && !window.location.hash) {
        const y = Number(savedScroll);
        if (!Number.isNaN(y) && y > 160) {
          window.scrollTo({ top: y, behavior: "auto" });
        }
      }
    } catch {
      // ignore storage failures
    }
  }, [work.slug]);

  const persistPrefs = (nextFamily: FontFamilyOption, nextSize: FontSizeOption) => {
    try {
      window.localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({ fontFamily: nextFamily, fontSize: nextSize })
      );
    } catch {
      // ignore
    }
  };

  const stepFontSize = (delta: -1 | 1) => {
    const idx = FONT_SIZE_ORDER.indexOf(fontSize);
    const nextIdx = Math.min(
      FONT_SIZE_ORDER.length - 1,
      Math.max(0, idx + delta)
    );
    const nextSize = FONT_SIZE_ORDER[nextIdx];
    setFontSize(nextSize);
    persistPrefs(fontFamily, nextSize);
  };

  const changeFontFamily = (nextFamily: FontFamilyOption) => {
    setFontFamily(nextFamily);
    persistPrefs(nextFamily, fontSize);
  };

  // Thin top reading progress line + remember scroll position
  useEffect(() => {
    let saveTimer: number | undefined;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        try {
          window.localStorage.setItem(
            `rj-scroll-${work.slug}`,
            String(Math.round(window.scrollY))
          );
        } catch {
          // ignore
        }
      }, 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(saveTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [work.slug]);

  // Active section tracking for TOC (deferred so initial hydration stays responsive)
  useEffect(() => {
    if (headings.length < 2) return;
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: "-80px 0% -70% 0%" }
      );

      const nodes = document.querySelectorAll(
        ".prose-academic h1, .prose-academic h2, .prose-academic h3"
      );
      nodes.forEach((n) => observer?.observe(n));
    }, 150);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [headings]);

  const scrollToSection = (id: string) => {
    setTocOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const sizeClass =
    fontSize === "sm"
      ? "reader-size-sm"
      : fontSize === "lg"
      ? "reader-size-lg"
      : fontSize === "xl"
      ? "reader-size-xl"
      : "reader-size-base";

  const familyClass =
    fontFamily === "sans" ? "reader-font-sans" : "reader-font-serif";

  const handleProseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
      "a[data-copy-anchor]"
    );
    if (!target) return;
    const id = target.getAttribute("data-copy-anchor");
    if (!id || typeof window === "undefined") return;
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url);
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Thin hairline reading progress */}
      <div
        data-no-print="true"
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Desktop quick reader controls bar (quiet, minimal) */}
      <div
        data-no-print="true"
        className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-hairline text-xs"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCiteOpen(true)}
            className="min-h-[44px] px-3 rounded-control border border-hairline bg-surface hover:bg-surface-muted inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors"
          >
            <Quote className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Cite / Sources</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5">
          <div className="inline-flex items-center rounded-control border border-hairline bg-surface p-0.5">
            <button
              type="button"
              onClick={() => changeFontFamily("serif")}
              className={`min-h-[36px] px-2.5 rounded-lg text-xs transition-colors ${
                fontFamily === "serif"
                  ? "bg-surface-muted font-medium text-ink"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Serif
            </button>
            <button
              type="button"
              onClick={() => changeFontFamily("sans")}
              className={`min-h-[36px] px-2.5 rounded-lg text-xs transition-colors ${
                fontFamily === "sans"
                  ? "bg-surface-muted font-medium text-ink"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Sans
            </button>
          </div>

          <div className="inline-flex items-center rounded-control border border-hairline bg-surface p-0.5">
            <button
              type="button"
              onClick={() => stepFontSize(-1)}
              disabled={fontSize === "sm"}
              aria-label="Decrease text size"
              className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg text-xs text-ink-secondary hover:text-ink disabled:opacity-40"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => stepFontSize(1)}
              disabled={fontSize === "xl"}
              aria-label="Increase text size"
              className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg text-xs text-ink-secondary hover:text-ink disabled:opacity-40"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Reader Grid (Content + Desktop Sticky Side Rail TOC) */}
      <div
        className={
          headings.length >= 2
            ? "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-10 items-start"
            : "block"
        }
      >
        <div
          onClick={handleProseClick}
          className={`prose-academic ${familyClass} ${sizeClass} min-w-0`}
        >
          {children}
        </div>

        {headings.length >= 2 && (
          <aside
            data-no-print="true"
            className="hidden lg:block sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pl-4 border-l border-hairline text-xs"
          >
            <div className="font-medium text-ink mb-3">Contents</div>
            <nav aria-label="Table of contents">
              <ul className="space-y-1.5">
                {headings.map((h, idx) => {
                  const isActive = activeId === h.id;
                  return (
                    <li
                      key={`${h.id}-${idx}`}
                      style={{ paddingLeft: `${(h.level - 1) * 0.65}rem` }}
                    >
                      <a
                        href={`#${h.id}`}
                        className={`block py-1 leading-snug transition-colors ${
                          isActive
                            ? "text-accent font-medium"
                            : "text-ink-secondary hover:text-ink"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {/* Mobile Thumb-Reach Floating Action Bar */}
      <div
        data-no-print="true"
        className="lg:hidden fixed bottom-4 left-4 right-4 z-30 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]"
      >
        <div className="pointer-events-auto inline-flex items-center gap-1 p-1 rounded-full border border-hairline-strong bg-surface/95 backdrop-blur-sm shadow-sheet">
          {headings.length >= 2 && (
            <button
              type="button"
              onClick={() => setTocOpen(true)}
              className="min-h-[44px] px-4 rounded-full inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:bg-surface-muted transition-colors"
            >
              <List className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span>Contents</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setDisplayOpen(true)}
            aria-label="Text size and font settings"
            className="min-h-[44px] px-3.5 rounded-full inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors"
          >
            <Type className="w-4 h-4" strokeWidth={1.5} />
            <span>Text</span>
          </button>
          <button
            type="button"
            onClick={() => setCiteOpen(true)}
            className="min-h-[44px] px-3.5 rounded-full inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors"
          >
            <Quote className="w-4 h-4" strokeWidth={1.5} />
            <span>Cite</span>
          </button>
        </div>
      </div>

      {/* Mobile Contents Bottom Sheet */}
      <BottomSheet
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        title="Contents"
        subtitle={`${headings.length} sections`}
      >
        <nav aria-label="Mobile table of contents">
          <ul className="divide-y divide-hairline">
            {headings.map((h, idx) => (
              <li key={`${h.id}-${idx}`}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(h.id);
                  }}
                  style={{ paddingLeft: `${(h.level - 1) * 0.85}rem` }}
                  className={`min-h-[44px] flex items-center py-2.5 text-sm transition-colors ${
                    activeId === h.id
                      ? "text-accent font-medium"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </BottomSheet>

      {/* Mobile Reading Display Bottom Sheet */}
      <BottomSheet
        open={displayOpen}
        onClose={() => setDisplayOpen(false)}
        title="Reading settings"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-medium text-ink-secondary block">
              Typeface
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => changeFontFamily("serif")}
                className={`min-h-[44px] rounded-control border text-sm font-serif transition-colors ${
                  fontFamily === "serif"
                    ? "border-accent bg-accent-soft text-ink font-medium"
                    : "border-hairline bg-bg text-ink-secondary"
                }`}
              >
                Serif
              </button>
              <button
                type="button"
                onClick={() => changeFontFamily("sans")}
                className={`min-h-[44px] rounded-control border text-sm font-sans transition-colors ${
                  fontFamily === "sans"
                    ? "border-accent bg-accent-soft text-ink font-medium"
                    : "border-hairline bg-bg text-ink-secondary"
                }`}
              >
                Sans
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-ink-secondary block">
              Text size
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => stepFontSize(-1)}
                disabled={fontSize === "sm"}
                className="min-h-[44px] rounded-control border border-hairline bg-bg text-sm text-ink disabled:opacity-40"
              >
                Smaller (A-)
              </button>
              <button
                type="button"
                onClick={() => stepFontSize(1)}
                disabled={fontSize === "xl"}
                className="min-h-[44px] rounded-control border border-hairline bg-bg text-sm text-ink disabled:opacity-40"
              >
                Larger (A+)
              </button>
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Cite / Sources Bottom Sheet */}
      <BottomSheet
        open={citeOpen}
        onClose={() => setCiteOpen(false)}
        title="Cite and sources"
        subtitle={work.title}
      >
        <div className="space-y-6">
          <CitationBox work={work} />

          {/* Provenance */}
          <div className="pt-4 border-t border-hairline space-y-2 text-xs">
            <div className="font-medium text-ink">Metadata provenance</div>
            <ul className="space-y-1.5 text-ink-secondary">
              <li className="flex items-center justify-between gap-2">
                <span>Authorship</span>
                <span className="inline-flex items-center gap-1 text-ink">
                  {work.authorsProvenance.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  )}
                  {work.authorsProvenance.source} ({work.authorsProvenance.method})
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Abstract</span>
                <span className="text-ink">
                  {work.abstractProvenance.source} ({work.abstractProvenance.method})
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Structure</span>
                <span className="text-ink capitalize">
                  {work.archetype.replace(/-/g, " ")}
                </span>
              </li>
            </ul>
            <p className="text-xs text-ink-secondary leading-relaxed pt-1">
              {archetypeDesc}
            </p>
          </div>

          {/* Editions */}
          {work.editions.length > 0 && (
            <div className="pt-4 border-t border-hairline space-y-2.5 text-xs">
              <div className="font-medium text-ink">
                Source repositories ({work.editions.length})
              </div>
              <ul className="space-y-2">
                {work.editions.map((ed) => (
                  <li
                    key={ed.repoName}
                    className="flex items-center justify-between gap-3 p-3 rounded-control border border-hairline bg-bg"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-ink truncate">
                        {ed.editionLabel}
                      </div>
                      <div className="font-mono text-ink-secondary truncate">
                        {ed.repoName}
                      </div>
                    </div>
                    <a
                      href={ed.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[36px] inline-flex items-center gap-1 text-accent hover:underline flex-shrink-0"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
