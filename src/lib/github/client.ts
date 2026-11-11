export interface GitHubRepoMeta {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  default_branch: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork?: boolean;
  archived?: boolean;
  private?: boolean;
  size?: number;
  license?: {
    key?: string;
    name?: string;
    spdx_id?: string | null;
  } | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubReleaseAssetMeta {
  id: number;
  name: string;
  size: number;
  browser_download_url: string;
  content_type?: string;
  download_count?: number;
}

export interface GitHubReleaseMeta {
  id: number;
  tag_name: string;
  name: string | null;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  created_at: string;
  assets: GitHubReleaseAssetMeta[];
}

export class GitHubClient {
  private token?: string;
  private owner: string;
  private rateLimitRemaining: number | null = null;
  private rateLimitResetAt: number | null = null;

  constructor(owner = "smile-plzz", token?: string) {
    this.owner = owner;
    this.token = token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  }

  hasAuthToken(): boolean {
    return Boolean(this.token && this.token.trim().length > 0);
  }

  getOwner(): string {
    return this.owner;
  }

  getRateLimitState(): { remaining: number | null; resetAt: number | null } {
    return {
      remaining: this.rateLimitRemaining,
      resetAt: this.rateLimitResetAt,
    };
  }

  isRateLimited(): boolean {
    return this.rateLimitRemaining !== null && this.rateLimitRemaining <= 1;
  }

  private updateRateLimit(res: Response): void {
    const rem = res.headers.get("x-ratelimit-remaining");
    const reset = res.headers.get("x-ratelimit-reset");
    if (rem !== null) {
      const parsed = Number.parseInt(rem, 10);
      if (!Number.isNaN(parsed)) this.rateLimitRemaining = parsed;
    }
    if (reset !== null) {
      const parsed = Number.parseInt(reset, 10);
      if (!Number.isNaN(parsed)) this.rateLimitResetAt = parsed * 1000;
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "ResearchJournal-Ingestion/1.0",
    };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }

  async fetchUserRepos(): Promise<GitHubRepoMeta[]> {
    try {
      const url = `https://api.github.com/users/${this.owner}/repos?per_page=100&sort=pushed`;
      const res = await fetch(url, { headers: this.getHeaders() });
      this.updateRateLimit(res);
      if (!res.ok) {
        console.warn(`GitHub API repos fetch returned status ${res.status}: ${res.statusText}`);
        return [];
      }
      const data = (await res.json()) as GitHubRepoMeta[];
      return data.filter((r) => !r.private);
    } catch (err) {
      console.warn("Failed to fetch GitHub user repos:", err);
      return [];
    }
  }

  async fetchAllUserRepos(): Promise<GitHubRepoMeta[]> {
    const all: GitHubRepoMeta[] = [];
    let page = 1;

    try {
      while (page <= 10) {
        if (this.isRateLimited()) {
          console.warn("GitHub API rate limit nearly exhausted; stopping repo pagination.");
          break;
        }
        const url = `https://api.github.com/users/${this.owner}/repos?per_page=100&type=owner&sort=pushed&page=${page}`;
        const res = await fetch(url, { headers: this.getHeaders() });
        this.updateRateLimit(res);
        if (!res.ok) {
          console.warn(
            `GitHub API repos fetch (page ${page}) returned status ${res.status}: ${res.statusText}`
          );
          break;
        }
        const batch = (await res.json()) as GitHubRepoMeta[];
        if (!Array.isArray(batch) || batch.length === 0) break;
        // Safety guard: never expose private repositories
        all.push(...batch.filter((r) => !r.private));
        if (batch.length < 100) break;
        page += 1;
      }
    } catch (err) {
      console.warn("Failed to paginate GitHub user repos:", err);
    }

    return all;
  }

  async fetchRepoMetadata(repoName: string): Promise<GitHubRepoMeta | null> {
    try {
      if (this.isRateLimited()) return null;
      const url = `https://api.github.com/repos/${this.owner}/${repoName}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      this.updateRateLimit(res);
      if (!res.ok) return null;
      const repo = (await res.json()) as GitHubRepoMeta;
      return repo.private ? null : repo;
    } catch {
      return null;
    }
  }

  async fetchRepoReleases(
    repoName: string,
    limit = 5
  ): Promise<{ releases: GitHubReleaseMeta[]; ok: boolean }> {
    try {
      if (this.isRateLimited()) {
        return { releases: [], ok: false };
      }
      const url = `https://api.github.com/repos/${this.owner}/${repoName}/releases?per_page=${limit}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      this.updateRateLimit(res);
      if (res.status === 403 || res.status === 429) {
        console.warn(`GitHub API rate limit reached while checking releases for ${repoName}.`);
        return { releases: [], ok: false };
      }
      if (!res.ok) return { releases: [], ok: false };
      const data = (await res.json()) as GitHubReleaseMeta[];
      return {
        releases: Array.isArray(data) ? data.filter((rel) => !rel.draft) : [],
        ok: true,
      };
    } catch {
      return { releases: [], ok: false };
    }
  }

  async fetchRepoTree(repoName: string, branch = "main"): Promise<string[]> {
    try {
      if (this.isRateLimited()) return [];
      const url = `https://api.github.com/repos/${this.owner}/${repoName}/git/trees/${branch}?recursive=1`;
      const res = await fetch(url, { headers: this.getHeaders() });
      this.updateRateLimit(res);
      if (!res.ok) {
        // Fallback to master if main returned 404
        if (branch === "main") {
          return this.fetchRepoTree(repoName, "master");
        }
        return [];
      }
      const data = await res.json();
      return (data.tree || [])
        .filter((item: { type: string }) => item.type === "blob")
        .map((item: { path: string }) => item.path);
    } catch {
      return [];
    }
  }

  async fetchRawFile(repoName: string, filePath: string, branch = "main"): Promise<string | null> {
    try {
      const url = `https://raw.githubusercontent.com/${this.owner}/${repoName}/${branch}/${filePath}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) {
        if (branch === "main") {
          return this.fetchRawFile(repoName, filePath, "master");
        }
        return null;
      }
      return await res.text();
    } catch {
      return null;
    }
  }
}
