"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import {
  PROJECT_CATEGORIES,
  PROJECT_PLATFORM_LABELS,
  PROJECT_STATUS_META,
  ProjectCategory,
  ProjectPlatform,
  ProjectStatus,
} from "@/lib/showcase/schema";
import { ProjectCard, ProjectCardData } from "./ProjectCard";
import { buttonClasses } from "@/components/ui/Button";

interface ShowcaseBrowserProps {
  initialProjects: ProjectCardData[];
  defaultCategory?: ProjectCategory | "all";
  hideCategoryPills?: boolean;
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
  hideCategoryPills = false,
}: ShowcaseBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "date" | "name">("featured");
  const [showMore, setShowMore] = useState(false);

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

  const availablePlatforms = useMemo(() => {
    const set = new Set<ProjectPlatform>();
    for (const p of initialProjects) {
      for (const pl of p.platforms) set.add(pl);
    }
    return Array.from(set);
  }, [initialProjects]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of initialProjects) {
      map.set(p.category, (map.get(p.category) || 0) + 1);
    }
    return map;
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
        if (q) {
          return (
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tech.some((t) => t.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q) ||
            p.platforms.some((pl) => pl.toLowerCase().includes(q))
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
    selectedPlatform !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(defaultCategory);
    setSelectedStatus("all");
    setSelectedPlatform("all");
    setSortBy("featured");
  };

  const showUncuratedGrid =
    showMore || hasActiveFilters || curatedMatches.length === 0;

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <SearchParamsSync onParamsChange={handleParamsChange} />
      </Suspense>

      {/* Large Search Field on Top */}
      <div className="relative">
        <label htmlFor="showcase-search-input" className="sr-only">
          Search projects
        </label>
        <Search
          className="w-4 h-4 text-ink-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          id="showcase-search-input"
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps, desktop software, platforms, or tools..."
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

      {/* Horizontally Scrollable Category Pills on Mobile */}
      {!hideCategoryPills && (
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            className={`min-h-[40px] px-3.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150 ${
              selectedCategory === "all"
                ? "bg-accent text-accent-ink"
                : "bg-surface border border-hairline text-ink-secondary hover:text-ink"
            }`}
          >
            All ({initialProjects.length})
          </button>

          {PROJECT_CATEGORIES.map((cat) => {
            const count = categoryCounts.get(cat.id) || 0;
            if (count === 0) return null;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[40px] px-3.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-150 ${
                  active
                    ? "bg-accent text-accent-ink"
                    : "bg-surface border border-hairline text-ink-secondary hover:text-ink"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Compact Secondary Filters + Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter by status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-surface text-sm text-ink focus:outline-none"
          >
            <option value="all">All statuses</option>
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
            className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-surface text-sm text-ink focus:outline-none"
          >
            <option value="all">All platforms</option>
            {availablePlatforms.map((pl) => (
              <option key={pl} value={pl}>
                {PROJECT_PLATFORM_LABELS[pl] || pl}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort projects"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "featured" | "date" | "name")
            }
            className="min-h-[44px] px-3 py-2 rounded-control border border-hairline bg-surface text-sm text-ink focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="date">Recently updated</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-secondary">
          <span>
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
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

      {/* Results */}
      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <p className="text-sm text-ink-secondary">
            No projects match your current filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className={buttonClasses({ variant: "quiet" })}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {curatedMatches.length > 0 && (
            <section className="space-y-4">
              <h2 className="sr-only">Curated projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {curatedMatches.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          )}

          {uncuratedMatches.length > 0 && (
            <section className="pt-6 border-t border-hairline space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    More projects ({uncuratedMatches.length})
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Smaller prototypes and utilities indexed directly from source repositories.
                  </p>
                </div>

                {!hasActiveFilters && curatedMatches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowMore((prev) => !prev)}
                    aria-expanded={showUncuratedGrid}
                    className={buttonClasses({ variant: "quiet" })}
                  >
                    <span>
                      {showUncuratedGrid
                        ? "Hide list"
                        : `Show ${uncuratedMatches.length} more`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-150 ${
                        showUncuratedGrid ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                )}
              </div>

              {showUncuratedGrid && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uncuratedMatches.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
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
