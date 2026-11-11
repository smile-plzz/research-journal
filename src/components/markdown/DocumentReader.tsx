"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_READER_PREFERENCES,
  extractMarkdownHeadings,
  ReaderAlignment,
  ReaderFontFamily,
  ReaderFontSize,
  ReaderLineSpacing,
  ReaderPreferences,
  ReaderViewMode,
  ReaderWidth,
} from "@/lib/markdown/reader-prefs";
import { preprocessGithubMarkdown, RepoSourceContext } from "@/lib/markdown/refine";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { TableOfContents } from "../publication/TableOfContents";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  AlignJustify,
  AlignLeft,
  BookOpen,
  Check,
  Code2,
  Copy,
  ListTree,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  Share2,
  SlidersHorizontal,
  X,
} from "lucide-react";

const STORAGE_KEY = "rj-reader-prefs-v1";

interface DocumentReaderProps {
  content: string;
  repoContext?: RepoSourceContext;
  stripLeadingHeading?: boolean;
  stripAiStudioBanner?: boolean;
  readingTimeMinutes?: number;
  wordCount?: number;
  showToc?: boolean;
  showReadingProgress?: boolean;
  defaultFocusMode?: boolean;
  documentLabel?: string;
}

export function DocumentReader({
  content,
  repoContext,
  stripLeadingHeading = false,
  stripAiStudioBanner = true,
  readingTimeMinutes,
  wordCount,
  showToc = true,
  showReadingProgress = true,
  defaultFocusMode = false,
  documentLabel = "Document",
}: DocumentReaderProps) {
  const [prefs, setPrefs] = useState<ReaderPreferences>(DEFAULT_READER_PREFERENCES);
  const [viewMode, setViewMode] = useState<ReaderViewMode>("reader");
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [focusMode, setFocusMode] = useState(defaultFocusMode);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hydrate persisted preferences safely
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ReaderPreferences>;
        setPrefs((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const updatePrefs = (patch: Partial<ReaderPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const resetPrefs = () => {
    setPrefs(DEFAULT_READER_PREFERENCES);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!showReadingProgress) return;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showReadingProgress]);

  const refinedMarkdown = useMemo(
    () =>
      preprocessGithubMarkdown(content, {
        repo: repoContext,
        stripLeadingHeading,
        stripAiStudioBanner,
      }),
    [content, repoContext, stripLeadingHeading, stripAiStudioBanner]
  );

  const outlineHeadings = useMemo(
    () => extractMarkdownHeadings(refinedMarkdown),
    [refinedMarkdown]
  );

  const searchMatchesCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return 0;
    return refinedMarkdown
      .split(/\n{2,}/)
      .filter((block) => block.toLowerCase().includes(q)).length;
  }, [refinedMarkdown, searchQuery]);

  const computedWordCount = useMemo(() => {
    if (wordCount) return wordCount;
    return refinedMarkdown.split(/\s+/).filter(Boolean).length;
  }, [wordCount, refinedMarkdown]);

  const computedReadMins = useMemo(() => {
    if (readingTimeMinutes) return readingTimeMinutes;
    return Math.max(1, Math.round(computedWordCount / 200));
  }, [readingTimeMinutes, computedWordCount]);

  const handleCopyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1800);
    }
  };

  const handleCopyRaw = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 1800);
    }
  };

  const jumpToHeadingFromOutline = (id: string) => {
    setViewMode("reader");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <div className="space-y-5">
      {showReadingProgress && (
        <div
          className="fixed top-0 left-0 h-1 bg-academic z-50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        />
      )}

      {/* Unified Reader Customization & View Bar */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-900/60 p-3 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-academic" />
              <span>{documentLabel}</span>
            </span>
            <span>·</span>
            <span>~{computedReadMins} min read</span>
            <span>·</span>
            <span>{computedWordCount.toLocaleString()} words</span>
            {showReadingProgress && (
              <>
                <span>·</span>
                <span>{Math.round(scrollProgress)}%</span>
              </>
            )}
          </div>

          {/* Primary View Mode & Utility Controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* View Mode Segmented Switch */}
            <div
              role="tablist"
              aria-label="Document view mode"
              className="inline-flex items-center rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5"
            >
              <Tooltip content="Refined reading view with interactive tables and resolved GitHub links">
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === "reader"}
                  onClick={() => setViewMode("reader")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    viewMode === "reader"
                      ? "bg-academic text-white"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Reader</span>
                </button>
              </Tooltip>

              <Tooltip content="Structured outline of all document sections with previews">
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === "outline"}
                  onClick={() => setViewMode("outline")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    viewMode === "outline"
                      ? "bg-academic text-white"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <ListTree className="w-3 h-3" />
                  <span>Outline</span>
                </button>
              </Tooltip>

              <Tooltip content="View original unformatted Markdown or LaTeX source from GitHub">
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === "raw"}
                  onClick={() => setViewMode("raw")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    viewMode === "raw"
                      ? "bg-academic text-white"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  <span>Raw</span>
                </button>
              </Tooltip>
            </div>

            <Tooltip content="Search and highlight text inside this document">
              <button
                type="button"
                onClick={() => setShowSearch((s) => !s)}
                aria-expanded={showSearch}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  showSearch || searchQuery
                    ? "border-academic bg-academic/10 text-academic dark:text-academic-dark"
                    : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-400"
                }`}
              >
                <Search className="w-3 h-3" />
                <span className="hidden sm:inline">Find</span>
              </button>
            </Tooltip>

            <Tooltip content="Customize font, text size, spacing, line width, and alignment">
              <button
                type="button"
                onClick={() => setShowCustomizer((s) => !s)}
                aria-expanded={showCustomizer}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  showCustomizer
                    ? "border-academic bg-academic/10 text-academic dark:text-academic-dark"
                    : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-400"
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Display</span>
              </button>
            </Tooltip>

            {showToc && (
              <Tooltip content={focusMode ? "Show section guide sidebar" : "Focus mode: hide sidebar and expand reader"}>
                <button
                  type="button"
                  onClick={() => setFocusMode((f) => !f)}
                  aria-pressed={focusMode}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    focusMode
                      ? "border-academic bg-academic/10 text-academic dark:text-academic-dark"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-400"
                  }`}
                  aria-label="Toggle focus reading mode"
                >
                  {focusMode ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </Tooltip>
            )}

            <Tooltip content={copiedLink ? "Page link copied" : "Copy shareable link to this page"}>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-400 transition-colors"
                aria-label="Copy link"
              >
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* In-Document Find Bar */}
        {showSearch && (
          <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (viewMode === "outline") setViewMode("reader");
                }}
                placeholder="Highlight paragraphs or list items containing..."
                aria-label="Find text in document"
                className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
              />
              {searchQuery && (
                <Tooltip content="Clear highlight search">
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear find query"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              )}
            </div>
            <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
              {searchQuery
                ? `${searchMatchesCount} matching ${searchMatchesCount === 1 ? "block" : "blocks"}`
                : "Type to highlight matches"}
            </span>
          </div>
        )}

        {/* Display Customization Drawer */}
        {showCustomizer && (
          <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-[11px]">
            {/* Typeface */}
            <div className="space-y-1">
              <span className="block font-mono text-stone-500 dark:text-stone-400">
                Typeface
              </span>
              <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5">
                {(["serif", "sans", "mono"] as ReaderFontFamily[]).map((ff) => (
                  <Tooltip key={ff} content={`Use ${ff} font`}>
                    <button
                      type="button"
                      onClick={() => updatePrefs({ fontFamily: ff })}
                      className={`px-2 py-1 rounded capitalize transition-colors ${
                        prefs.fontFamily === ff
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {ff}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-1">
              <span className="block font-mono text-stone-500 dark:text-stone-400">
                Text Size
              </span>
              <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5">
                {(
                  [
                    { id: "sm", label: "S" },
                    { id: "base", label: "M" },
                    { id: "lg", label: "L" },
                    { id: "xl", label: "XL" },
                  ] as { id: ReaderFontSize; label: string }[]
                ).map((sz) => (
                  <Tooltip key={sz.id} content={`Text size: ${sz.label}`}>
                    <button
                      type="button"
                      onClick={() => updatePrefs({ fontSize: sz.id })}
                      className={`px-2 py-1 rounded transition-colors ${
                        prefs.fontSize === sz.id
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {sz.label}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Line Spacing */}
            <div className="space-y-1">
              <span className="block font-mono text-stone-500 dark:text-stone-400">
                Line Spacing
              </span>
              <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5">
                {(["compact", "relaxed", "spacious"] as ReaderLineSpacing[]).map((sp) => (
                  <Tooltip key={sp} content={`Line height: ${sp}`}>
                    <button
                      type="button"
                      onClick={() => updatePrefs({ lineSpacing: sp })}
                      className={`px-2 py-1 rounded capitalize transition-colors ${
                        prefs.lineSpacing === sp
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {sp}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Column Width */}
            <div className="space-y-1">
              <span className="block font-mono text-stone-500 dark:text-stone-400">
                Column Width
              </span>
              <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5">
                {(["narrow", "standard", "wide"] as ReaderWidth[]).map((w) => (
                  <Tooltip key={w} content={`Reading column width: ${w}`}>
                    <button
                      type="button"
                      onClick={() => updatePrefs({ width: w })}
                      className={`px-2 py-1 rounded capitalize transition-colors ${
                        prefs.width === w
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {w}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Alignment + Reset */}
            <div className="space-y-1">
              <span className="block font-mono text-stone-500 dark:text-stone-400">
                Alignment & Reset
              </span>
              <div className="flex items-center gap-1.5">
                <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 p-0.5">
                  {(
                    [
                      { id: "left", icon: AlignLeft, tip: "Left-aligned prose" },
                      { id: "justify", icon: AlignJustify, tip: "Journal-justified prose" },
                    ] as { id: ReaderAlignment; icon: typeof AlignLeft; tip: string }[]
                  ).map((al) => {
                    const Icon = al.icon;
                    return (
                      <Tooltip key={al.id} content={al.tip}>
                        <button
                          type="button"
                          onClick={() => updatePrefs({ alignment: al.id })}
                          aria-label={al.tip}
                          className={`p-1 rounded transition-colors ${
                            prefs.alignment === al.id
                              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                              : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </button>
                      </Tooltip>
                    );
                  })}
                </div>

                <Tooltip content="Reset typography and layout settings to defaults">
                  <button
                    type="button"
                    onClick={resetPrefs}
                    aria-label="Reset display settings"
                    className="p-1.5 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area by Selected View Mode */}
      {viewMode === "raw" ? (
        <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-xs font-mono">
            <span className="text-stone-500 dark:text-stone-400">
              Original Source ({content.split(/\r?\n/).length} lines)
            </span>
            <Tooltip content="Copy entire raw source text">
              <button
                type="button"
                onClick={handleCopyRaw}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:border-academic transition-colors"
              >
                {copiedRaw ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Source</span>
                  </>
                )}
              </button>
            </Tooltip>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed text-stone-800 dark:text-stone-200 overflow-x-auto max-h-[75vh] whitespace-pre-wrap break-words">
            {content}
          </pre>
        </div>
      ) : viewMode === "outline" ? (
        <div className="space-y-3">
          {outlineHeadings.length === 0 ? (
            <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 text-sm text-stone-500 text-center">
              No section headings found in this document. Switch back to Reader view to read the full text.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5">
              {outlineHeadings.map((item, idx) => (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onClick={() => jumpToHeadingFromOutline(item.id)}
                  style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
                  className="text-left p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/40 hover:border-academic transition-colors group space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-semibold text-sm sm:text-base text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors">
                      {item.text}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                      H{item.level}
                    </span>
                  </div>
                  {item.preview && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {item.preview}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className={
            showToc && !focusMode
              ? "grid grid-cols-1 lg:grid-cols-4 gap-8"
              : "block"
          }
        >
          {showToc && !focusMode && (
            <aside className="lg:col-span-1 lg:order-2">
              <TableOfContents
                content={content}
                repoContext={repoContext}
                stripLeadingHeading={stripLeadingHeading}
              />
            </aside>
          )}
          <div className={showToc && !focusMode ? "lg:col-span-3 lg:order-1 min-w-0" : "min-w-0"}>
            <MarkdownRenderer
              content={content}
              repoContext={repoContext}
              stripLeadingHeading={stripLeadingHeading}
              stripAiStudioBanner={stripAiStudioBanner}
              readerPrefs={prefs}
              highlightQuery={searchQuery}
            />
          </div>
        </div>
      )}
    </div>
  );
}

