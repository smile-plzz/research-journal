import { runIngestion } from "../src/lib/ingestion/sync";

async function main() {
  console.log("=================================================");
  console.log("🚀 Starting Academic Research Catalog Ingestion");
  console.log("=================================================");

  try {
    const catalog = await runIngestion();
    console.log("=================================================");
    console.log(`🎉 Ingestion Complete!`);
    console.log(`📊 Total Scholarly Works: ${catalog.totalWorks}`);
    console.log(`📦 Repositories Integrated: ${catalog.totalRepositories}`);
    console.log("=================================================");
  } catch (error) {
    console.error("❌ Ingestion Failed:", error);
    process.exit(1);
  }
}

main();

