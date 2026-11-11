import { repositoryInclusionList } from "@/config/repositories";
import {
  showcaseEditorialEntries,
  showcaseExclusionList,
  wingOverrides,
} from "@/config/showcase";
import { GitHubRepoMeta } from "@/lib/github/client";

export interface WingRoutingDecision {
  research: boolean;
  showcase: boolean;
  reason: string;
}

/**
 * Determines which wing(s) a repository belongs to.
 * Default rule:
 *   - Matches existing research inclusion list or `-paper` suffix -> Research only.
 *   - Otherwise -> Showcase only (unless excluded).
 *   - Explicit `wingOverrides` allow a repository to appear in both wings or override defaults.
 */
export function getRepoWingRouting(repoName: string): WingRoutingDecision {
  const override = wingOverrides[repoName];
  if (override) {
    return {
      research: Boolean(override.research),
      showcase: Boolean(override.showcase),
      reason: "wing-override",
    };
  }

  const isResearchRepo =
    repositoryInclusionList.includes(repoName) ||
    repoName.toLowerCase().endsWith("-paper");

  if (isResearchRepo) {
    return {
      research: true,
      showcase: false,
      reason: "research-paper",
    };
  }

  if (showcaseExclusionList.includes(repoName)) {
    return {
      research: false,
      showcase: false,
      reason: "showcase-excluded",
    };
  }

  return {
    research: false,
    showcase: true,
    reason: "software-default",
  };
}

/**
 * Evaluates whether a discovered GitHub repository should be included in the Showcase catalog.
 * Excludes by default:
 *   - Private repositories (safety guard)
 *   - Forks (unless explicitly overridden via wingOverrides)
 *   - Empty repositories (size === 0)
 *   - Archived repositories without an editorial entry
 *   - Repositories in showcaseExclusionList or routed exclusively to Research
 */
export function shouldIncludeRepoInShowcase(repo: GitHubRepoMeta): {
  include: boolean;
  reason: string;
} {
  if (repo.private) {
    return { include: false, reason: "private-repo" };
  }

  const routing = getRepoWingRouting(repo.name);
  if (!routing.showcase) {
    return { include: false, reason: routing.reason };
  }

  const hasEditorialEntry = Boolean(showcaseEditorialEntries[repo.name]);
  const hasExplicitOverride = Boolean(wingOverrides[repo.name]?.showcase);

  if (repo.fork && !hasEditorialEntry && !hasExplicitOverride) {
    return { include: false, reason: "fork-excluded" };
  }

  if (typeof repo.size === "number" && repo.size === 0 && !hasEditorialEntry) {
    return { include: false, reason: "empty-repo" };
  }

  if (repo.archived && !hasEditorialEntry && !hasExplicitOverride) {
    return { include: false, reason: "archived-without-editorial" };
  }

  return { include: true, reason: routing.reason };
}

