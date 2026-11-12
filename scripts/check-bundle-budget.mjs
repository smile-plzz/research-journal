import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const nextDir = path.join(process.cwd(), ".next");
const appManifestPath = path.join(nextDir, "app-build-manifest.json");

if (!fs.existsSync(appManifestPath)) {
  console.error("Missing .next/app-build-manifest.json. Run npm run build first.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(appManifestPath, "utf8"));
const pages = manifest.pages || {};

const BUDGETS_KB = {
  "/page": 130,
  "/showcase/page": 145,
  "/works/[slug]/page": 135,
  "/showcase/[slug]/page": 135,
  "/research-areas/page": 120,
};

let failed = false;

const layoutChunks = pages["/layout"] || [];

for (const [route, maxGzipKb] of Object.entries(BUDGETS_KB)) {
  const chunks = Array.from(
    new Set([...layoutChunks, ...(pages[route] || [])])
  ).filter((f) => f.endsWith(".js"));
  let totalGzipBytes = 0;

  for (const relChunk of chunks) {
    const absPath = path.join(nextDir, relChunk);
    if (fs.existsSync(absPath)) {
      const content = fs.readFileSync(absPath);
      totalGzipBytes += zlib.gzipSync(content).length;
    }
  }

  const gzipKb = Number((totalGzipBytes / 1024).toFixed(1));
  const ok = gzipKb <= maxGzipKb;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${route}: ${gzipKb} KB gzip (budget <= ${maxGzipKb} KB)`
  );
  if (!ok) failed = true;
}

if (failed) {
  process.exit(1);
}
