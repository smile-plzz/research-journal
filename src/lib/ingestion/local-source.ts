import fs from "fs";
import path from "path";

export interface LocalRepoData {
  name: string;
  repoPath: string;
  files: string[];
  readmeContent: string | null;
  contextContent: string | null;
  manifestContent: string | null;
  citationContent: string | null;
  zenodoContent: string | null;
  gitRemote: string | null;
  pushedAt: string;
}

export function findLocalPaperRepos(baseDir?: string): LocalRepoData[] {
  const possiblePaths = [
    baseDir,
    path.resolve(process.cwd(), "../paper_repos"),
    "C:\\Users\\ismai\\.gemini\\antigravity\\scratch\\paper_repos",
    path.resolve(process.cwd(), "paper_repos"),
  ].filter(Boolean) as string[];

  let targetDir = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      targetDir = p;
      break;
    }
  }

  if (!targetDir) {
    console.warn("No local paper_repos folder found at searched locations:", possiblePaths);
    return [];
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  const results: LocalRepoData[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

    const repoPath = path.join(targetDir, entry.name);
    const files = getAllRelativeFiles(repoPath);

    const readFileSafe = (relPath: string): string | null => {
      const full = path.join(repoPath, relPath);
      if (fs.existsSync(full)) {
        try {
          return fs.readFileSync(full, "utf-8");
        } catch {
          return null;
        }
      }
      return null;
    };

    // Read git remote if available
    let gitRemote: string | null = null;
    const gitConfigPath = path.join(repoPath, ".git", "config");
    if (fs.existsSync(gitConfigPath)) {
      const gitConfig = fs.readFileSync(gitConfigPath, "utf-8");
      const urlMatch = gitConfig.match(/url\s*=\s*(https:\/\/github\.com\/[^\s]+)/i);
      if (urlMatch) {
        gitRemote = urlMatch[1].replace(/\.git$/, "");
      }
    }

    // Get stats
    let latestTime = fs.statSync(repoPath).mtime;
    for (const f of files.slice(0, 50)) {
      try {
        const t = fs.statSync(path.join(repoPath, f)).mtime;
        if (t > latestTime) latestTime = t;
      } catch {
        // ignore
      }
    }

    results.push({
      name: entry.name,
      repoPath,
      files,
      readmeContent: readFileSafe("README.md"),
      contextContent: readFileSafe("context.md"),
      manifestContent: readFileSafe(".publication.json"),
      citationContent: readFileSafe("CITATION.cff"),
      zenodoContent: readFileSafe(".zenodo.json"),
      gitRemote,
      pushedAt: latestTime.toISOString(),
    });
  }

  return results;
}

function getAllRelativeFiles(dir: string, base = "", depth = 0): string[] {
  if (depth > 5) return [];
  const results: string[] = [];
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      if (item.name === ".git" || item.name === "node_modules" || item.name === ".next") continue;
      const rel = base ? `${base}/${item.name}` : item.name;
      if (item.isDirectory()) {
        results.push(rel);
        results.push(...getAllRelativeFiles(path.join(dir, item.name), rel, depth + 1));
      } else {
        results.push(rel);
      }
    }
  } catch {
    // Ignore permissions or broken links
  }
  return results;
}

