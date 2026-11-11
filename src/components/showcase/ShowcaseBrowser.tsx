"use client";

import { useMemo, useState } from "react";
import {
  Project,
  PROJECT_CATEGORIES,
  PROJECT_PLATFORM_LABELS,
  PROJECT_STATUS_META,
  ProjectCategory,
  ProjectPlatform,
  ProjectStatus,
} from "@/lib/showcase/schema";
import { ProjectCard } from "./ProjectCard";
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

interface ShowcaseBrowserProps {
  initialProjects: Project[];
  defaultCategory?: ProjectCategory | "all";
}

export function ShowcaseBrowser({
  initialProjects,
  defaultCategory = "all",
}: ShowcaseBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "date" | "name">("featured");
  const [showUncurated, setShowUncurated] = useState(false);

  const availableTechTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of initialProjects) {
      for (const t of p.tech) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [initialProjects]);

  const availablePlatforms = useMemo(() => {
    const set = new Set<ProjectPlatform>();
    for (const p of initialProjects) {
      for (const pl of p.platforms) set.add(pl);
    }
    return Array.from(set);
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialProjects
      .filter((p) => {
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }
        if (selectedStatus !== "all" && p.status !== selectedStatus) {
          return false;
        }
        if (
          selectedPlatform !== "all" &&
          !p.platforms.includes(selectedPlatform as ProjectPlatform)
        ) {
          return false;
        }
        if (selectedTech !== "all" && !p.tech.includes(selectedTech)) {
          return false;
        }
        if (q) {
          const inName = p.name.toLowerCase().includes(q);
          const inTagline = p.tagline.toLowerCase().includes(q);
          const inDesc = p.description.toLowerCase().includes(q);
          const inFeatures = p.features.some((f) => f.toLowerCase().includes(q));
          const inTech = p.tech.some((t) => t.toLowerCase().includes(q));
          const inCategory = p.category.toLowerCase().includes(q);
          const inPlatforms = p.platforms.some((pl) => pl.toLowerCase().includes(q));
          return (
            inName ||
            inTagline ||
            inDesc ||
            inFeatures ||
            inTech ||
            inCategory ||
            inPlatforms
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          if (a.curated !== b.curated) return a.curated ? -1 : 1;
          if (a.curated && b.curated) {
            const orderA = a.order ?? 999;
            const orderB = b.order ?? 999;
            if (orderA !== orderB) return orderA - orderB;
          }
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        if (sortBy === "date") {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  }, [
    initialProjects,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedPlatform,
    selectedTech,
    sortBy,
  ]);

  const curatedMatches = useMemo(
    () => filteredProjects.filter((p) => p.curated),
    [filteredProjects]
  );

  const uncuratedMatches = useMemo(
    () => filteredProjects.filter((p) => !p.curated),
    [filteredProjects]
  );

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== defaultCategory ||
    selectedStatus !== "all" ||
    selectedPlatform !== "all" ||
    selectedTech !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(defaultCategory);
    setSelectedStatus("all");
    setSelectedPlatform("all");
    setSelectedTech("all");
    setSortBy("featured");
  };

  const shouldShowUncuratedGrid =
    showUncurated || hasActiveFilters || curatedMatches.length === 0;

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <label htmlFor="showcase-search-input" className="sr-only">
          Search projects
        </label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="showcase-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps, desktop software, utilities, platforms, or technologies..."
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-academic/50 focus:border-academic transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-stone-500 font-medium flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <select
            aria-label="Filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Categories</option>
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Statuses</option>
            {(Object.keys(PROJECT_STATUS_META) as ProjectStatus[]).map((status) => (
              <option key={status} value={status}>
                {PROJECT_STATUS_META[status].label}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by platform"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Platforms</option>
            {availablePlatforms.map((pl) => (
              <option key={pl} value={pl}>
                {PROJECT_PLATFORM_LABELS[pl] || pl}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by technology"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
          >
            <option value="all">All Technologies</option>
            {availableTechTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 ml-1 text-stone-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              aria-label="Sort projects"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "date" | "name")
              }
              className="px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-academic"
            >
              <option value="featured">Featured First</option>
              <option value="date">Recently Updated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-stone-500 dark:text-stone-400">
            Showing{" "}
            <strong className="text-stone-800 dark:text-stone-200">
              {filteredProjects.length}
            </strong>{" "}
            of {initialProjects.length} projects
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-academic dark:text-academic-dark hover:underline font-medium text-xs"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center text-stone-500 dark:text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
          <p className="font-serif text-lg text-stone-800 dark:text-stone-200 mb-2">
            No projects match.
          </p>
          <p className="text-sm mb-4">
            Try clearing your filters or searching with different keywords.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Curated Projects Grid */}
          {curatedMatches.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Curated Projects ({curatedMatches.length})
                </h2>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Ready to explore, try, or download
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curatedMatches.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Uncurated Fallback Section (Visibly Lower Priority) */}
          {uncuratedMatches.length > 0 && (
            <section className="pt-8 border-t border-stone-200/80 dark:border-stone-800/80 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200">
                    More Projects ({uncuratedMatches.length})
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Additional public experiments and utilities indexed automatically from source code.
                  </p>
                </div>

                {!hasActiveFilters && curatedMatches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowUncurated((prev) => !prev)}
                    aria-expanded={shouldShowUncuratedGrid}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-academic transition-colors self-start sm:self-auto"
                  >
                    <span>
                      {shouldShowUncuratedGrid
                        ? "Hide additional projects"
                        : `Browse ${uncuratedMatches.length} more projects`}
                    </span>
                    {shouldShowUncuratedGrid ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {shouldShowUncuratedGrid && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {uncuratedMatches.map((project) => (
                    <ProjectCard key={project.slug} project={project} compact />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}

