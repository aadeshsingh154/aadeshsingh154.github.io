import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:4173";
const OUT = process.env.OUT ?? "/tmp/qa";
const ONLY_VP = process.env.VP;
const ONLY_ROUTE = process.env.ROUTE;
/** How many evenly-spaced scroll positions to capture per page. */
const SHOTS = Number(process.env.SHOTS ?? 3);

const routes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["densi", "/projects/densi"],
  ["artho", "/projects/artho"],
  ["wellnest", "/projects/wellnest"],
  ["pediatrack", "/projects/pediatrack"],
  ["resume", "/resume"],
  ["about", "/about"],
  ["notfound", "/nope"],
];

const widths = [
  ["desktop", 1440, 900],
  ["tablet", 1024, 900],
  ["mobile", 390, 844],
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  channel: "chromium-headless-shell",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const problems = [];
const log = (s) => {
  problems.push(s);
  console.log(s);
};

for (const [vp, w, h] of widths.filter((x) => !ONLY_VP || x[0] === ONLY_VP)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();

  page.on("requestfailed", (r) => {
    if (!r.url().includes("fonts.g")) log(`REQUEST FAILED (${vp}): ${r.url()}`);
  });

  for (const [name, path] of routes.filter((r) => !ONLY_ROUTE || r[0] === ONLY_ROUTE)) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    await page.addStyleTag({
      content: ".reveal{opacity:1!important;transform:none!important}",
    });

    // Walk the page once so lazy images decode.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.9;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });

    const height = await page.evaluate(() => document.body.scrollHeight);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) log(`OVERFLOW (${vp}/${name}): +${overflow}px`);

    const h1s = await page.$$eval("h1", (n) => n.length);
    if (h1s !== 1) log(`H1 COUNT (${vp}/${name}): ${h1s}`);

    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    broken.forEach((b) => log(`BROKEN IMG (${vp}/${name}): ${b}`));

    const noAlt = await page.evaluate(
      () => [...document.images].filter((i) => !i.hasAttribute("alt")).length,
    );
    if (noAlt) log(`MISSING ALT (${vp}/${name}): ${noAlt}`);

    // Sample evenly through the page instead of one giant full-page capture
    // (the case-study pages are ~25000px tall and blow up the renderer).
    const max = Math.max(height - h, 0);
    for (let i = 0; i < SHOTS; i++) {
      const y = SHOTS === 1 ? 0 : Math.round((max * i) / (SHOTS - 1));
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(260);
      await page.screenshot({ path: `${OUT}/${vp}-${name}-${i}.png` });
    }
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(
  `${OUT}/report-${ONLY_VP ?? "all"}.txt`,
  problems.join("\n") || "no issues found",
);
console.log(problems.length ? `\n${problems.length} issue(s)` : "NO ISSUES");
