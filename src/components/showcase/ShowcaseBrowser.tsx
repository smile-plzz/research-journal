"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

interface ShowcaseBrowserProps {
  initialProjects: Project[];
  defaultCategory?: ProjectCategory | "all";
}

function SearchParamsSync({
  onParamsChange,
}: {
  onParamsChange: (params: {
    status: string | null;
    platform: string | null;
    q: string | null;
  }) => void;
}) {
  const searchParams = useSearchParams();
  const prevRef = useRef<string | null>(null);

  useEffect(() => {
    const serialized = searchParams.toString();
    if (prevRef.current === null && serialized === "") {
      prevRef.current = serialized;
      return;
    }
    if (prevRef.current !== serialized) {
      prevRef.current = serialized;
      onParamsChange({
        status: searchParams.get("status"),
        platform: searchParams.get("platform"),
        q: searchParams.get("q"),
      });
    }
  }, [searchParams, onParamsChange]);

  return null;
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

  const handleParamsChange = useCallback(
    ({
      status,
      platform,
      q,
    }: {
      status: string | null;
      platform: string | null;
      q: string | null;
    }) => {
      if (status && status in PROJECT_STATUS_META) {
        setSelectedStatus(status);
      } else if (status === null) {
        setSelectedStatus("all");
      }

      if (platform) {
        setSelectedPlatform(platform);
      } else {
        setSelectedPlatform("all");
      }

      if (q !== null) {
        setSearchQuery(q);
      }
    },
    []
  );

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

  const applyQuickPreset = (preset: {
    status?: string;
    platform?: string;
  }) => {
    setSelectedCategory(defaultCategory);
    setSelectedStatus(preset.status || "all");
    setSelectedPlatform(preset.platform || "all");
    setSelectedTech("all");
  };

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <SearchParamsSync onParamsChange={handleParamsChange} />
      </Suspense>

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
          <Tooltip content="Clear search text">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          </Tooltip>
        )}
      </div>

      {/* Guided One-Click Quick Filter Presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 font-medium mr-1">
          <Sparkles className="w-3.5 h-3.5 text-academic" />
          <span>Quick views:</span>
        </span>

        <Tooltip content="Show all projects with default ordering">
          <button
            type="button"
            onClick={clearFilters}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              !hasActiveFilters
                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent font-medium"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-academic"
            }`}
          >
            All Projects
          </button>
        </Tooltip>

        <Tooltip content="Web apps you can try right away in your browser">
          <button
            type="button"
            onClick={() => applyQuickPreset({ status: "live" })}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors ${
              selectedStatus === "live" && selectedPlatform === "all"
                ? "bg-emerald-700 text-white border-transparent font-medium"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-emerald-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Ready in Browser</span>
          </button>
        </Tooltip>

        <Tooltip content="Projects with direct Windows or Android installer downloads">
          <button
            type="button"
            onClick={() => applyQuickPreset({ status: "downloadable" })}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors ${
              selectedStatus === "downloadable" && selectedPlatform === "all"
                ? "bg-sky-700 text-white border-transparent font-medium"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-sky-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span>Direct Downloads</span>
          </button>
        </Tooltip>

        {availablePlatforms.includes("windows") && (
          <Tooltip content="Desktop utilities and apps for Windows">
            <button
              type="button"
              onClick={() => applyQuickPreset({ platform: "windows" })}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                selectedPlatform === "windows" && selectedStatus === "all"
                  ? "bg-academic text-white border-transparent font-medium"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-academic"
              }`}
            >
              Windows
            </button>
          </Tooltip>
        )}

        {availablePlatforms.includes("android") && (
          <Tooltip content="Mobile & Android TV apps ready to install on Android devices">
            <button
              type="button"
              onClick={() => applyQuickPreset({ platform: "android" })}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                selectedPlatform === "android" && selectedStatus === "all"
                  ? "bg-academic text-white border-transparent font-medium"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-academic"
              }`}
            >
              Android / TV
            </button>
          </Tooltip>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-stone-500 font-medium flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          <Tooltip content="Filter projects by software type">
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
          </Tooltip>

          <Tooltip content="Filter by availability (Live web demo, Downloadable build, Prototype, etc.)">
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
          </Tooltip>

          <Tooltip content="Filter by target operating system or browser">
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
          </Tooltip>

          <Tooltip content="Filter by core language, framework, or runtime">
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
          </Tooltip>

          <Tooltip content="Change display ordering of matching projects">
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
          </Tooltip>
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
            <Tooltip content="Reset search text, filters, and sorting">
              <button
                type="button"
                onClick={clearFilters}
                className="text-academic dark:text-academic-dark hover:underline font-medium text-xs"
              >
                Clear filters
              </button>
            </Tooltip>
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
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>Curated Projects ({curatedMatches.length})</span>
                  <InfoHint text="Hand-reviewed entries with plain-language descriptions, feature lists, and direct downloads or live web links." />
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
                  <h2 className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                    <span>More Projects ({uncuratedMatches.length})</span>
                    <InfoHint text="Smaller prototypes, utilities, and experiments indexed directly from repository metadata." />
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Additional public experiments and utilities indexed automatically from source code.
                  </p>
                </div>

                {!hasActiveFilters && curatedMatches.length > 0 && (
                  <Tooltip content={shouldShowUncuratedGrid ? "Collapse uncurated repository list" : "Expand all auto-indexed experiments and helper tools"}>
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
                  </Tooltip>
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

