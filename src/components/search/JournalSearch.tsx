"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { researchDomains } from "@/config/domains";
import { PublicationCard, WorkCardData } from "../publication/PublicationCard";
import { buttonClasses } from "@/components/ui/Button";

interface JournalSearchProps {
  initialWorks: WorkCardData[];
}

export function JournalSearch({ initialWorks }: JournalSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "date" | "title">("featured");

  const filteredWorks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialWorks
      .filter((w) => {
        if (selectedDomain !== "all" && w.domainId !== selectedDomain) {
          return false;
        }
        if (selectedStatus !== "all" && w.status !== selectedStatus) {
          return false;
        }
        if (q) {
          return (
            w.title.toLowerCase().includes(q) ||
            w.abstract.toLowerCase().includes(q) ||
            w.keywords.some((k) => k.toLowerCase().includes(q)) ||
            w.authors.some((a) => a.name.toLowerCase().includes(q)) ||
            w.editions.some((e) => e.repoName.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return (
            new Date(b.lastPushedAt).getTime() - new Date(a.lastPushedAt).getTime()
          );
        }
        if (sortBy === "date") {
          return (
            new Date(b.lastPushedAt).getTime() - new Date(a.lastPushedAt).getTime()
          );
        }
        return a.title.localeCompare(b.title);
      });
  }, [initialWorks, searchQuery, selectedDomain, selectedStatus, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedDomain !== "all" ||
    selectedStatus !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDomain("all");
    setSelectedStatus("all");
    setSortBy("featured");
  };

  return (
    <div className="space-y-5">
      {/* Search Field */}
      <div className="relative">
        <label htmlFor="research-search-input" className="sr-only">
          Search publications
        </label>
        <Search
          className="w-4 h-4 text-ink-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          id="research-search-input"
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search publications by title, topic, or keyword..."
          className="w-full min-h-[48px] pl-10 pr-11 py-3 rounded-control border border-hairline-strong bg-surface text-base sm:text-sm text-ink placeholder:text-ink-secondary focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-ink-secondary hover:text-ink"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Scrollable Domain Pills on Mobile */}
      <div
        role="tablist"
        aria-label="Filter by research area"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedDomain === "all"}
          onClick={() => setSelectedDomain("all")}
          className={`min-h-[40px] px-3.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150 ${
            selectedDomain === "all"
              ? "bg-accent text-accent-ink"
              : "bg-surface border border-hairline text-ink-secondary hover:text-ink"
          }`}
        >
          All areas ({initialWorks.length})
        </button>

        {researchDomains.map((d) => {
          const active = selectedDomain === d.id;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedDomain(d.id)}
              className={`min-h-[40px] px-3.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150 ${
                active
                  ? "bg-accent text-accent-ink"
                  : "bg-surface border border-hairline text-ink-secondary hover:text-ink"
              }`}
            >
              {d.shortName}
            </button>
          );
        })}
      </div>

      {/* Status + Sort + Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter by status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-surface text-sm text-ink focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="Thesis">Master&apos;s Thesis</option>
            <option value="Research Monograph">Research Monograph</option>
            <option value="Preprint">Preprint</option>
            <option value="Working Paper">Working Paper</option>
          </select>

          <select
            aria-label="Sort publications"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "featured" | "date" | "title")
            }
            className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-surface text-sm text-ink focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="date">Newest first</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-secondary">
          <span>
            {filteredWorks.length}{" "}
            {filteredWorks.length === 1 ? "work" : "works"}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-[44px] inline-flex items-center text-accent hover:underline font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorks.map((work) => (
            <PublicationCard key={work.id} work={work} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center space-y-3">
          <p className="text-sm text-ink-secondary">
            No publications match your current filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className={buttonClasses({ variant: "quiet" })}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
