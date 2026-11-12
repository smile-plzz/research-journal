import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not respond within ${timeoutMs}ms`);
}

async function main() {
  const pwTarget = process.env.PLAYWRIGHT_CORE_PATH || "playwright-core";
  const pwModule = await import(pwTarget).catch(() => null);
  if (!pwModule) {
    console.log("playwright-core not installed; skipping browser smoke test.");
    return;
  }

  const { chromium } = pwModule;
  const candidateExes = [
    process.env.CHROME_PATH,
    "C:\\Users\\ismai\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);

  const executablePath = candidateExes.find((p) => fs.existsSync(p));
  const browser = await chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    headless: true,
  });

  const port = 3198;
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForServer(baseUrl);
    const context = await browser.newContext({
      viewport: { width: 360, height: 844 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));

    // 1. Home loads cleanly with zero horizontal overflow
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    const homeOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    if (homeOverflow > 1) {
      throw new Error(`Home has horizontal overflow on 360px: ${homeOverflow}px`);
    }

    // 2. Unified search overlay opens and filters
    await page.getByRole("button", { name: /search papers and projects/i }).click();
    const searchInput = page.getByRole("searchbox", {
      name: /search research and software/i,
    });
    await searchInput.waitFor({ state: "visible" });
    await searchInput.fill("luma");
    await page.getByRole("option", { name: /Luma/i }).first().waitFor({ state: "visible" });
    await page.keyboard.press("Escape");

    // 3. Work renders, Contents & Cite sheets open
    await page.goto(`${baseUrl}/works/tcra-intelligence-automation-boundary`, {
      waitUntil: "networkidle",
    });
    const workOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    if (workOverflow > 1) {
      throw new Error(`Work page has horizontal overflow on 360px: ${workOverflow}px`);
    }
    await page.getByRole("button", { name: /contents/i }).click();
    await page.getByRole("dialog", { name: /contents/i }).waitFor({ state: "visible" });
    await page.keyboard.press("Escape");

    // 4. Showcase project download panel & safety note toggle
    await page.goto(`${baseUrl}/showcase/luma`, { waitUntil: "networkidle" });
    const showcaseOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    if (showcaseOverflow > 1) {
      throw new Error(`Showcase detail has horizontal overflow on 360px: ${showcaseOverflow}px`);
    }
    await page.getByRole("button", { name: /is this safe\?/i }).click();
    await page.getByText(/SmartScreen/i).waitFor({ state: "visible" });

    if (errors.length > 0) {
      throw new Error(`Runtime page errors detected: ${errors.join("; ")}`);
    }

    console.log("Mobile smoke test passed across home, search, work reader, and showcase download.");
    await context.close();
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
