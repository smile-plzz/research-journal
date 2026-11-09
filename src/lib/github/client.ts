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

  async fetchRawFile(repoName: string, filePath: string, branch = "main"): Promise<string | null> {
    try {
      const url = `https://raw.githubusercontent.com/${this.owner}/${repoName}/${branch}/${filePath}`;
      const res = await fetch(url, { headers: this.getHeaders() });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      return null;
    }
  }
}

