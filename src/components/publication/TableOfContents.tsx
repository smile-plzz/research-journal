"use client";

import { useEffect, useMemo, useState } from "react";
import { extractMarkdownHeadings, ExtractedHeading } from "@/lib/markdown/reader-prefs";
import { preprocessGithubMarkdown, RepoSourceContext } from "@/lib/markdown/refine";
import { Tooltip } from "@/components/ui/Tooltip";
import { ChevronDown, ChevronUp, List, Search, X } from "lucide-react";

export type TocItem = ExtractedHeading;

interface TableOfContentsProps {
  content: string;
  repoContext?: RepoSourceContext;
  stripLeadingHeading?: boolean;
  onNavigateHeading?: (id: string) => void;
}

export function TableOfContents({
  content,
  repoContext,
  stripLeadingHeading = false,
  onNavigateHeading,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [filterText, setFilterText] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const headings = useMemo(() => {
    const refined = preprocessGithubMarkdown(content, {
      repo: repoContext,
      stripLeadingHeading,
    });
    return extractMarkdownHeadings(refined);
  }, [content, repoContext, stripLeadingHeading]);

  const filteredHeadings = useMemo(() => {
    const q = filterText.toLowerCase().trim();
    if (!q) return headings;
    return headings.filter((h) => h.text.toLowerCase().includes(q));
  }, [headings, filterText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-90px 0% -70% 0%" }
    );

    const headingElements = document.querySelectorAll(
      ".prose-academic h1, .prose-academic h2, .prose-academic h3"
    );
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigateHeading?.(id);
  };

  return (
    <>
      {/* Mobile / Tablet Quick Section Jump Bar */}
      <div className="lg:hidden mb-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-stone-800 dark:text-stone-200"
        >
          <span className="inline-flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-academic" />
            <span>Jump to section ({headings.length})</span>
          </span>
          {mobileOpen ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </button>

        {mobileOpen && (
          <div className="px-4 pb-3 pt-1 border-t border-stone-200/80 dark:border-stone-800/80 max-h-64 overflow-y-auto space-y-1 text-xs">
            {headings.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={`#${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                className={`block py-1 truncate ${
                  activeId === item.id
                    ? "font-medium text-academic dark:text-academic-dark"
                    : "text-stone-600 dark:text-stone-400"
                }`}
              >
                {item.text}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto p-4 rounded-xl bg-stone-50/80 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800/80 text-xs space-y-3"
      >
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-1.5 font-serif font-semibold text-stone-900 dark:text-stone-100">
            <List className="w-3.5 h-3.5 text-academic" />
            <span>Section Guide</span>
          </div>
          <span className="font-mono text-[10px] text-stone-400">
            {headings.length}
          </span>
        </div>

        {headings.length >= 6 && (
          <div className="relative">
            <Search className="w-3 h-3 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter sections..."
              aria-label="Filter table of contents"
              className="w-full pl-6 pr-6 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 text-[11px] text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-academic"
            />
            {filterText && (
              <Tooltip content="Clear section filter">
                <button
                  type="button"
                  onClick={() => setFilterText("")}
                  aria-label="Clear section filter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </Tooltip>
            )}
          </div>
        )}

        <ul className="space-y-1 font-sans">
          {filteredHeadings.length === 0 ? (
            <li className="text-[11px] text-stone-400 py-2">
              No matching sections.
            </li>
          ) : (
            filteredHeadings.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={`${item.id}-${idx}`}
                  style={{ paddingLeft: `${(item.level - 1) * 0.65}rem` }}
                >
                  <Tooltip content={item.text}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleLinkClick(item.id)}
                      className={`block py-1 px-1.5 rounded leading-snug transition-colors truncate ${
                        isActive
                          ? "font-medium text-academic dark:text-academic-dark bg-academic/10 dark:bg-academic/15"
                          : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/40 dark:hover:bg-stone-800/40"
                      }`}
                    >
                      {item.text}
                    </a>
                  </Tooltip>
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </>
  );
}
