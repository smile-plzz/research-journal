export interface GitHubRepoMeta {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  default_branch: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export class GitHubClient {
  private token?: string;
  private owner: string;

  constructor(owner = "smile-plzz", token?: string) {
    this.owner = owner;
    this.token = token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
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
      if (!res.ok) {
        console.warn(`GitHub API repos fetch returned status ${res.status}: ${res.statusText}`);
        return [];
      }
      return (await res.json()) as GitHubRepoMeta[];
    } catch (err) {
      console.warn("Failed to fetch GitHub user repos:", err);
      return [];
    }
  }

  async fetchRepoMetadata(repoName: string): Promise<GitHubRepoMeta | null> {
    try {
      const url = `https://api.github.com/repos/${this.owner}/${repoName}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) return null;
      return (await res.json()) as GitHubRepoMeta;
    } catch {
      return null;
    }
  }

  async fetchRepoTree(repoName: string, branch = "main"): Promise<string[]> {
    try {
      const url = `https://api.github.com/repos/${this.owner}/${repoName}/git/trees/${branch}?recursive=1`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) {
        // Fallback to master if main returned 404
        if (branch === "main") {
          return this.fetchRepoTree(repoName, "master");
        }
        return [];
      }
      const data = await res.json();
      return (data.tree || [])
        .filter((item: any) => item.type === "blob")
        .map((item: any) => item.path);
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
