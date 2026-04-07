/**
 * screenshots.mjs — Browns Studio
 * Toma screenshots de todos los proyectos y los guarda en /public/previews/
 *
 * Uso:
 *   node scripts/screenshots.mjs
 *
 * Primera vez (instala Playwright + Chromium):
 *   npm install -D playwright
 *   npx playwright install chromium
 *   node scripts/screenshots.mjs
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "previews");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const PROYECTOS = [
  { slug: "pizzadao-musica-w3",    url: "https://pizzadao-mw3.vercel.app" },
  { slug: "cms-agencia-marketing", url: "https://creator-hub-three-lake.vercel.app" },
  { slug: "discord-analytics-bot", url: "https://discord-tracker-three.vercel.app" },
  { slug: "estudio-morales-araya", url: "https://estudiomoralesaraya.vercel.app" },
  { slug: "gm-nail-artist",        url: "https://gm-nailartist.vercel.app" },
  { slug: "rhythm-slice",          url: "https://cabscrypto.github.io/guitarPizza--AntiGravity/" },
];

async function takeScreenshot(page, { slug, url }) {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  process.stdout.write(`  → ${slug.padEnd(26)} `);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(1200); // deja que animaciones terminen

    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 80,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });

    const { size } = (await import("fs")).statSync(outPath);
    console.log(`✓  ${Math.round(size / 1024)}KB`);
  } catch (err) {
    console.log(`✗  ${err.message.split("\n")[0]}`);
  }
}

async function main() {
  console.log("\n  Browns Studio — Screenshot Generator\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });
  const page = await context.newPage();

  const start = Date.now();

  for (const proyecto of PROYECTOS) {
    await takeScreenshot(page, proyecto);
  }

  await browser.close();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nListo en ${elapsed}s — imagenes en public/previews/`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
