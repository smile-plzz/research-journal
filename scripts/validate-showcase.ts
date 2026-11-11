import fs from "fs";
import path from "path";
import { ShowcaseCatalogSchema } from "../src/lib/showcase/schema";
import { validateShowcaseCatalog } from "../src/lib/showcase/validate";
import { Work } from "../src/lib/catalog/schema";

async function main() {
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const checkUrls = args.includes("--check-urls");

  const showcasePath = path.join(process.cwd(), "src/data/generated/showcase.json");
  const catalogPath = path.join(process.cwd(), "src/data/generated/catalog.json");

  if (!fs.existsSync(showcasePath)) {
    console.error("❌ Missing src/data/generated/showcase.json");
    process.exit(1);
  }

  const rawShowcase = JSON.parse(fs.readFileSync(showcasePath, "utf-8"));
  const catalog = ShowcaseCatalogSchema.parse(rawShowcase);

  let knownWorkSlugs: string[] = [];
  if (fs.existsSync(catalogPath)) {
    const rawCatalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
    knownWorkSlugs = Array.isArray(rawCatalog.works)
      ? rawCatalog.works.map((w: Work) => w.slug)
      : [];
  }

  const report = await validateShowcaseCatalog(catalog, {
    strict,
    checkUrls,
    knownWorkSlugs,
  });

  for (const w of report.warnings) {
    console.warn(`⚠️ [Showcase:${w.slug}] ${w.message}`);
  }
  for (const e of report.errors) {
    console.error(`❌ [Showcase:${e.slug}] ${e.message}`);
  }

  if (!report.valid) {
    console.error(`❌ Showcase validation failed (${report.errors.length} error(s)).`);
    process.exit(1);
  }

  console.log(
    `✅ Showcase validation passed (${catalog.totalProjects} projects, ${report.warnings.length} warning(s)).`
  );
}

main();

