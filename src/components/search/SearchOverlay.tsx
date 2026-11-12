"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, BookOpen, Compass } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Chip } from "@/components/ui/Chip";
import { filterAndRankSearch } from "@/lib/search/fuzzy";
import type { SearchIndexItem, SearchIndexPayload } from "@/app/search-index.json/route";

let cachedIndex: SearchIndexItem[] | null = null;

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchIndexItem[]>(cachedIndex || []);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loadIndex = useCallback(async () => {
    if (cachedIndex) {
      setItems(cachedIndex);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/search-index.json");
      if (res.ok) {
        const data = (await res.json()) as SearchIndexPayload;
        cachedIndex = data.items || [];
        setItems(cachedIndex);
      }
    } catch {
      // ignore offline/network errors gracefully
    } finally {
      setLoading(false);
    }
  }, []);

  const openOverlay = useCallback(() => {
    setOpen(true);
    void loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) void loadIndex();
          return next;
        });
      } else if (e.key === "/" && !isTypingField && !open) {
        e.preventDefault();
        openOverlay();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loadIndex, open, openOverlay]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const ranked = useMemo(() => {
    if (!query.trim()) {
      const research = items.filter((i) => i.wing === "research").slice(0, 4);
      const showcase = items.filter((i) => i.wing === "showcase").slice(0, 4);
      return [...showcase, ...research];
    }
    return filterAndRankSearch(items, query, 14);
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (ranked.length ? (prev + 1) % ranked.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        ranked.length ? (prev - 1 + ranked.length) % ranked.length : 0
      );
    } else if (e.key === "Enter" && ranked[activeIndex]) {
      e.preventDefault();
      navigate(ranked[activeIndex].href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openOverlay}
        aria-label="Search papers and projects"
        className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:px-3 rounded-control border border-hairline bg-surface hover:bg-surface-muted text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
      >
        <Search className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
        <span className="hidden md:inline text-xs">Search</span>
        <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-surface-muted text-[11px] font-mono text-ink-secondary">
          /
        </kbd>
      </button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Search"
        subtitle="Research papers, software projects, and topics"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="w-4 h-4 text-ink-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.5}
            />
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search titles, summaries, or tags..."
              aria-label="Search research and software"
              className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-control border border-hairline-strong bg-bg text-base sm:text-sm text-ink placeholder:text-ink-secondary focus:outline-none"
            />
          </div>

          {!query.trim() && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => navigate("/showcase?status=live")}
                className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-bg hover:bg-surface-muted text-left flex items-center justify-between text-ink transition-colors"
              >
                <span>Live web apps</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/research-areas")}
                className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-bg hover:bg-surface-muted text-left flex items-center justify-between text-ink transition-colors"
              >
                <span>Research areas</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-sm text-ink-secondary py-6 text-center">
              Loading index...
            </p>
          ) : ranked.length === 0 ? (
            <p className="text-sm text-ink-secondary py-6 text-center">
              No matching research or projects found.
            </p>
          ) : (
            <ul className="divide-y divide-hairline" role="listbox">
              {ranked.map((item, idx) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={idx === activeIndex}
                    onClick={() => navigate(item.href)}
                    className={`w-full min-h-[44px] py-3 px-2.5 rounded-control text-left flex items-start justify-between gap-3 transition-colors ${
                      idx === activeIndex ? "bg-surface-muted" : "hover:bg-surface-muted/70"
                    }`}
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        {item.wing === "research" ? (
                          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                        ) : (
                          <Compass className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                        )}
                        <span>
                          {item.wing === "research" ? "Research" : "Showcase"} · {item.meta}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-ink truncate">
                        {item.title}
                      </div>
                      {item.summary && (
                        <p className="text-xs text-ink-secondary line-clamp-1">
                          {item.summary}
                        </p>
                      )}
                    </div>
                    {item.badge && (
                      <Chip className="flex-shrink-0 mt-1">{item.badge}</Chip>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
