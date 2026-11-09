"use client";

import { useState, useMemo } from "react";
import { Work } from "@/lib/catalog/schema";
import { researchDomains } from "@/config/domains";
import { PublicationCard } from "../publication/PublicationCard";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface JournalSearchProps {
  initialWorks: Work[];
}

export function JournalSearch({ initialWorks }: JournalSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "date" | "title">("featured");

  const filteredWorks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialWorks
      .filter((w) => {
        // Domain match
        if (selectedDomain !== "all" && w.domainId !== selectedDomain) {
          return false;
        }

        // Status match
        if (selectedStatus !== "all" && w.status !== selectedStatus) {
          return false;
        }

        // Type match
        if (selectedType !== "all" && w.type !== selectedType) {
          return false;
        }

        // Query match
        if (q) {
          const matchTitle = w.title.toLowerCase().includes(q);
          const matchAbstract = w.abstract.toLowerCase().includes(q);
          const matchKeywords = w.keywords.some((k) => k.toLowerCase().includes(q));
          const matchAuthors = w.authors.some((a) => a.name.toLowerCase().includes(q));
          const matchRepos = w.editions.some((e) => e.repoName.toLowerCase().includes(q));

          return matchTitle || matchAbstract || matchKeywords || matchAuthors || matchRepos;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.lastPushedAt).getTime() - new Date(a.lastPushedAt).getTime();
        }
        if (sortBy === "date") {
          return new Date(b.lastPushedAt).getTime() - new Date(a.lastPushedAt).getTime();
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [initialWorks, searchQuery, selectedDomain, selectedStatus, selectedType, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedDomain !== "all" ||
    selectedStatus !== "all" ||
    selectedType !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDomain("all");
    setSelectedStatus("all");
    setSelectedType("all");
    setSortBy("featured");
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research titles, abstracts, authors, keywords (#tcra, #gradcam, #ludology)..."
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-academic/50 focus:border-academic transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-b border-stone-200 dark:border-stone-800 pb-4">
        {/* Domain Select */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-stone-500 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Domain:
          </span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Research Domains ({initialWorks.length})</option>
            {researchDomains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Publication Statuses</option>
            <option value="Thesis">Master's Thesis</option>
            <option value="Research Monograph">Research Monograph</option>
            <option value="Preprint">Preprint</option>
            <option value="Working Paper">Working Paper</option>
          </select>

          {/* Sort Select */}
          <div className="flex items-center gap-1 ml-1 text-stone-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
            >
              <option value="featured">Featured First</option>
              <option value="date">Newest First</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-stone-500 dark:text-stone-400">
            Showing <strong className="text-stone-800 dark:text-stone-200">{filteredWorks.length}</strong> of {initialWorks.length} publications
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-academic dark:text-academic-dark hover:underline font-medium text-xs"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Publications Listing */}
      {filteredWorks.length > 0 ? (
        <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
          {filteredWorks.map((work) => (
            <PublicationCard key={work.id} work={work} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-stone-500 dark:text-stone-400">
          <p className="font-serif text-lg text-stone-800 dark:text-stone-200 mb-2">
            No research works match your query.
          </p>
          <p className="text-sm mb-4">
            Try adjusting your search keywords, clearing status filters, or browsing by research domain.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

