import fs from "fs";
import path from "path";
import { runIngestion } from "../src/lib/ingestion/sync";
import { runShowcaseIngestion } from "../src/lib/showcase/discover";
import { validateShowcaseCatalog } from "../src/lib/showcase/validate";
import { Work } from "../src/lib/catalog/schema";

type SyncTarget = "research" | "showcase" | "all";

function parseArgs(argv: string[]): {
  target: SyncTarget;
  strict: boolean;
  checkUrls: boolean;
} {
  let target: SyncTarget = "all";
  let strict = false;
  let checkUrls = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--target" && argv[i + 1]) {
      const val = argv[i + 1].toLowerCase();
      if (val === "research" || val === "showcase" || val === "all") {
        target = val;
      } else {
        throw new Error(`Invalid --target "${argv[i + 1]}". Expected: research | showcase | all`);
      }
      i += 1;
    } else if (arg.startsWith("--target=")) {
      const val = arg.split("=")[1]?.toLowerCase();
      if (val === "research" || val === "showcase" || val === "all") {
        target = val;
      } else {
        throw new Error(`Invalid --target "${val}". Expected: research | showcase | all`);
      }
    } else if (arg === "--strict") {
      strict = true;
    } else if (arg === "--check-urls") {
      checkUrls = true;
    }
  }

  return { target, strict, checkUrls };
}

function loadKnownWorkSlugs(): string[] {
  const catalogPath = path.join(process.cwd(), "src/data/generated/catalog.json");
  if (!fs.existsSync(catalogPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
    return Array.isArray(parsed.works)
      ? parsed.works.map((w: Work) => w.slug)
      : [];
  } catch {
    return [];
  }
}

async function main() {
  const { target, strict, checkUrls } = parseArgs(process.argv.slice(2));

  console.log("=================================================");
  console.log(`🚀 Starting GitHub Sync (target: ${target})`);
  console.log("=================================================");

  try {
    if (target === "research" || target === "all") {
      const catalog = await runIngestion();
      console.log(`📊 Total Scholarly Works: ${catalog.totalWorks}`);
      console.log(`📦 Research Repositories Integrated: ${catalog.totalRepositories}`);
    }

    if (target === "showcase" || target === "all") {
      const showcaseCatalog = await runShowcaseIngestion();
      const validation = await validateShowcaseCatalog(showcaseCatalog, {
        strict,
        checkUrls,
        knownWorkSlugs: loadKnownWorkSlugs(),
      });

      for (const warn of validation.warnings) {
        console.warn(`⚠️ [Showcase:${warn.slug}] ${warn.message}`);
      }
      for (const err of validation.errors) {
        console.error(`❌ [Showcase:${err.slug}] ${err.message}`);
      }

      if (!validation.valid) {
        throw new Error(`Showcase validation failed with ${validation.errors.length} error(s).`);
      }

      console.log(
        `🧩 Showcase Projects: ${showcaseCatalog.totalProjects} (${showcaseCatalog.curatedCount} curated, ${showcaseCatalog.featuredCount} featured)`
      );
    }

    console.log("=================================================");
    console.log("🎉 Sync Complete!");
    console.log("=================================================");
  } catch (error) {
    console.error("❌ Sync Failed:", error);
    process.exit(1);
  }
}

main();
