import { describe, it, expect } from "vitest";
import { GitHubReleaseMeta, GitHubRepoMeta } from "../../src/lib/github/client";
import { normalizeGitHubRepoToProject } from "../../src/lib/showcase/normalize";
import { ensureUniqueSlugs, mergeProjectWithEditorial } from "../../src/lib/showcase/merge";
import { parseReleaseAssets } from "../../src/lib/showcase/releases";
import { getRepoWingRouting, shouldIncludeRepoInShowcase } from "../../src/lib/showcase/routing";
import { ShowcaseCatalogSchema } from "../../src/lib/showcase/schema";
import { validateShowcaseCatalog } from "../../src/lib/showcase/validate";
import showcaseCatalog from "../../src/data/generated/showcase.json";
import researchCatalog from "../../src/data/generated/catalog.json";

function makeRepo(overrides: Partial<GitHubRepoMeta> = {}): GitHubRepoMeta {
  return {
    id: 1,
    name: "Sample-web-app",
    full_name: "smile-plzz/Sample-web-app",
    description: "A helpful sample web application for everyday tasks.",
    html_url: "https://github.com/smile-plzz/Sample-web-app",
    homepage: "https://sample.vercel.app",
    default_branch: "main",
    topics: ["typescript", "productivity"],
    stargazers_count: 5,
    forks_count: 1,
    language: "TypeScript",
    fork: false,
    archived: false,
    private: false,
    size: 200,
    license: { spdx_id: "MIT", name: "MIT License" },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-10-01T00:00:00Z",
    pushed_at: "2026-10-05T00:00:00Z",
    ...overrides,
  };
}

function makeRelease(overrides: Partial<GitHubReleaseMeta> = {}): GitHubReleaseMeta {
  return {
    id: 10,
    tag_name: "v1.0.0",
    name: "Release v1.0.0",
    html_url: "https://github.com/smile-plzz/Luma-windows-software/releases/tag/v1.0.0",
    draft: false,
    prerelease: false,
    published_at: "2026-10-10T00:00:00Z",
    created_at: "2026-10-10T00:00:00Z",
    assets: [],
    ...overrides,
  };
}

describe("Showcase Pipeline & Catalog Suite", () => {
  describe("Release Asset Parsing", () => {
    it("falls back to the latest release with assets when the newest tag has zero assets", () => {
      const releases: GitHubReleaseMeta[] = [
        makeRelease({
          id: 1,
          tag_name: "1.6",
          prerelease: false,
          assets: [],
        }),
        makeRelease({
          id: 2,
          tag_name: "v1.6.0-rc.2",
          prerelease: true,
          html_url: "https://github.com/smile-plzz/NowShowing-Stream-android-app-TV/releases/tag/v1.6.0-rc.2",
          assets: [
            {
              id: 21,
              name: "NowShowing-TV-1.6.0-rc.2-release.apk",
              size: 10502528,
              browser_download_url:
                "https://github.com/smile-plzz/NowShowing-Stream-android-app-TV/releases/download/v1.6.0-rc.2/NowShowing-TV-1.6.0-rc.2-release.apk",
            },
            {
              id: 22,
              name: "NowShowing-TV-1.6.0-rc.2-debug.apk",
              size: 22492697,
              browser_download_url:
                "https://github.com/smile-plzz/NowShowing-Stream-android-app-TV/releases/download/v1.6.0-rc.2/NowShowing-TV-1.6.0-rc.2-debug.apk",
            },
            {
              id: 23,
              name: "SHA256SUMS.txt",
              size: 204,
              browser_download_url:
                "https://github.com/smile-plzz/NowShowing-Stream-android-app-TV/releases/download/v1.6.0-rc.2/SHA256SUMS.txt",
            },
          ],
        }),
      ];

      const parsed = parseReleaseAssets(releases, { includePrereleases: true });
      expect(parsed.downloads).toHaveLength(1);
      expect(parsed.downloads[0].fileName).toBe("NowShowing-TV-1.6.0-rc.2-release.apk");
      expect(parsed.downloads[0].platform).toBe("android");
      expect(parsed.downloads[0].size).toBe("10.0 MB");
      expect(parsed.downloads[0].sha256Url).toContain("SHA256SUMS.txt");
      expect(parsed.releaseInfo?.isPrerelease).toBe(true);
    });

    it("prefers stable release over prerelease by default and excludes checksum sidecars", () => {
      const releases: GitHubReleaseMeta[] = [
        makeRelease({
          id: 1,
          tag_name: "v0.2.0-rc.1",
          prerelease: true,
          assets: [
            {
              id: 11,
              name: "App-v0.2.0-rc1-win-x64.zip",
              size: 5242880,
              browser_download_url:
                "https://github.com/smile-plzz/App/releases/download/v0.2.0-rc.1/App-v0.2.0-rc1-win-x64.zip",
            },
          ],
        }),
        makeRelease({
          id: 2,
          tag_name: "v0.1.0",
          prerelease: false,
          assets: [
            {
              id: 21,
              name: "App-v0.1.0-win-x64.zip",
              size: 4194304,
              browser_download_url:
                "https://github.com/smile-plzz/App/releases/download/v0.1.0/App-v0.1.0-win-x64.zip",
            },
            {
              id: 22,
              name: "App-v0.1.0-win-x64.zip.sha256",
              size: 96,
              browser_download_url:
                "https://github.com/smile-plzz/App/releases/download/v0.1.0/App-v0.1.0-win-x64.zip.sha256",
            },
          ],
        }),
      ];

      const parsed = parseReleaseAssets(releases);
      expect(parsed.downloads).toHaveLength(1);
      expect(parsed.downloads[0].version).toBe("v0.1.0");
      expect(parsed.downloads[0].platform).toBe("windows");
      expect(parsed.downloads[0].size).toBe("4.0 MB");
      expect(parsed.downloads[0].sha256Url).toContain(".sha256");
    });
  });

  describe("Showcase Normalizer & Editorial Merge Precedence", () => {
    it("normalizes GitHub metadata without fabricating missing fields", () => {
      const repo = makeRepo({
        name: "mystery-tool-windows-software",
        description: null,
        homepage: "",
        license: null,
      });

      const { project } = normalizeGitHubRepoToProject(repo, [], null);
      expect(project.slug).toBe("mystery-tool");
      expect(project.tagline).toBe("");
      expect(project.description).toBe("");
      expect(project.features).toEqual([]);
      expect(project.needsReview).toBe(true);
      expect(project.curated).toBe(false);
    });

    it("normalizes bare homepage domains and extracts README features", () => {
      const repo = makeRepo({
        name: "CineGemini-Stream-web-app",
        homepage: "cine-gemini.vercel.app",
      });
      const readme = `# CineGemini\n\nDiscover films tailored to your mood in seconds.\n\n## Features\n- Instant AI mood matching across genres\n- Zero signup required in the browser\n`;

      const { project } = normalizeGitHubRepoToProject(repo, [], readme);
      expect(project.liveUrl).toBe("https://cine-gemini.vercel.app/");
      expect(project.status).toBe("live");
      expect(project.features).toHaveLength(2);
      expect(project.provenance.features).toBe("readme");
    });

    it("ignores AI Studio template boilerplate headings and paragraphs", () => {
      const repo = makeRepo({
        name: "OmniStream-TV-web-app",
        description: "A streaming platform for live international TV channels.",
        homepage: "https://omni-stream-tv.vercel.app",
      });
      const readme = `# Run and deploy your AI Studio app\n\nThis contains everything you need to run your app locally.\n\nView your app in AI Studio: https://ai.studio/apps/drive/example\n`;

      const { project } = normalizeGitHubRepoToProject(repo, [], readme);
      expect(project.name).toBe("OmniStream TV");
      expect(project.category).toBe("web-app");
      expect(project.description).toBe("A streaming platform for live international TV channels.");
    });

    it("manual editorial overrides always win over auto-derived values", () => {
      const repo = makeRepo();
      const { project: autoProject } = normalizeGitHubRepoToProject(repo, [], null);

      const merged = mergeProjectWithEditorial(autoProject, {
        slug: "custom-product-slug",
        name: "Custom Product Name",
        tagline: "Plain-language tagline written by hand.",
        category: "tool",
        featured: true,
        needsReview: false,
      });

      expect(merged.slug).toBe("custom-product-slug");
      expect(merged.name).toBe("Custom Product Name");
      expect(merged.tagline).toBe("Plain-language tagline written by hand.");
      expect(merged.category).toBe("tool");
      expect(merged.featured).toBe(true);
      expect(merged.curated).toBe(true);
      expect(merged.needsReview).toBe(false);
      expect(merged.provenance.name).toBe("manual-override");
      expect(merged.provenance.tagline).toBe("manual-override");
    });
  });

  describe("Routing Rules & Exclusions", () => {
    it("routes -paper repos to Research only, software repos to Showcase only, and dual-wing overrides to both", () => {
      expect(getRepoWingRouting("hollow-knight-lore-paper")).toMatchObject({
        research: true,
        showcase: false,
      });
      expect(getRepoWingRouting("Luma-windows-software")).toMatchObject({
        research: false,
        showcase: true,
      });
      expect(getRepoWingRouting("bangladesh-music-evolution-paper")).toMatchObject({
        research: true,
        showcase: true,
      });
      expect(getRepoWingRouting("github-slideshow")).toMatchObject({
        research: false,
        showcase: false,
      });
      expect(getRepoWingRouting("TCRA-Code-Auditor-V3-web-app")).toMatchObject({
        research: false,
        showcase: false,
      });
    });

    it("excludes forks, empty repos, archived repos without editorial entry, and private repos", () => {
      expect(shouldIncludeRepoInShowcase(makeRepo({ fork: true })).include).toBe(false);
      expect(shouldIncludeRepoInShowcase(makeRepo({ size: 0 })).include).toBe(false);
      expect(shouldIncludeRepoInShowcase(makeRepo({ archived: true })).include).toBe(false);
      expect(shouldIncludeRepoInShowcase(makeRepo({ private: true })).include).toBe(false);
      expect(shouldIncludeRepoInShowcase(makeRepo()).include).toBe(true);
    });
  });

  describe("Slug Uniqueness & Schema Validation", () => {
    it("deduplicates colliding project slugs cleanly", () => {
      const repoA = makeRepo({ name: "MyApp-web-app" });
      const repoB = makeRepo({ name: "MyApp-windows-software" });
      const a = normalizeGitHubRepoToProject(repoA, [], null).project;
      const b = normalizeGitHubRepoToProject(repoB, [], null).project;

      const unique = ensureUniqueSlugs([a, b]);
      expect(new Set(unique.map((p) => p.slug)).size).toBe(2);
    });

    it("fails validation on duplicate slugs, missing featured taglines, broken liveUrl, and non-release download URLs", async () => {
      const base = normalizeGitHubRepoToProject(makeRepo(), [], null).project;
      const bad = {
        ...base,
        featured: true,
        tagline: "",
        liveUrl: "not-a-valid-url",
        downloads: [
          {
            label: "Bad Download",
            platform: "windows",
            url: "https://example.com/file.zip",
            isPrerelease: false,
          },
        ],
        relatedWorks: ["non-existent-work-slug"],
      };

      const report = await validateShowcaseCatalog(
        {
          version: "1.0.0",
          generatedAt: new Date().toISOString(),
          totalProjects: 2,
          curatedCount: 0,
          featuredCount: 1,
          projects: [base, bad as any],
        },
        {
          strict: true,
          knownWorkSlugs: ["tcra-intelligence-automation-boundary"],
        }
      );

      expect(report.valid).toBe(false);
      expect(report.errors.some((e) => e.field === "slug")).toBe(true);
      expect(report.errors.some((e) => e.field === "tagline")).toBe(true);
      expect(report.errors.some((e) => e.field === "downloads")).toBe(true);
      expect(report.errors.some((e) => e.field === "relatedWorks")).toBe(true);
    });
  });

  describe("Generated Catalogs Integrity (Showcase + Research Unchanged)", () => {
    it("validates generated showcase.json strictly with unique slugs", async () => {
      const parsed = ShowcaseCatalogSchema.parse(showcaseCatalog);
      expect(parsed.totalProjects).toBe(parsed.projects.length);
      expect(parsed.totalProjects).toBeGreaterThan(0);

      const slugs = parsed.projects.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);

      const report = await validateShowcaseCatalog(parsed, {
        strict: true,
        knownWorkSlugs: researchCatalog.works.map((w) => w.slug),
      });
      expect(report.valid).toBe(true);
    });

    it("keeps existing Research wing catalog.json intact", () => {
      expect(researchCatalog.totalWorks).toBeGreaterThanOrEqual(12);
      expect(researchCatalog.totalRepositories).toBeGreaterThanOrEqual(15);
      expect(
        researchCatalog.works.some(
          (w) => w.slug === "tcra-intelligence-automation-boundary"
        )
      ).toBe(true);
      expect(
        researchCatalog.works.some(
          (w) => w.slug === "digitally-cancelled-bangladesh-2024"
        )
      ).toBe(true);
    });
  });
});
