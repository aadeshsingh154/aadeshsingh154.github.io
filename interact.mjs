import { chromium } from "playwright";
const B = "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "chromium-headless-shell", args: ["--no-sandbox"] });
const out = [];
const ok = (c, m) => out.push(`${c ? "PASS" : "FAIL"}  ${m}`);

// --- mobile menu ---
let ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
let p = await ctx.newPage();
await p.goto(B + "/", { waitUntil: "domcontentloaded" });
const toggle = p.locator(".nav__toggle");
ok(await toggle.isVisible(), "mobile: menu toggle visible");
await toggle.click();
await p.waitForTimeout(400);
ok(await p.locator("#mobile-menu").isVisible(), "mobile: panel opens");
ok((await toggle.getAttribute("aria-expanded")) === "true", "mobile: aria-expanded=true");
await p.screenshot({ path: "/tmp/qa/mobile-menu-open.png" });
// The panel animates its height, so assert on state (inert / aria-expanded)
// rather than on a bounding box that may still be mid-transition.
const panelClosed = async () =>
  p.locator("#mobile-menu").evaluate((el) => el.hasAttribute("inert"));
await p.keyboard.press("Escape");
await p.waitForFunction(() => document.querySelector("#mobile-menu").hasAttribute("inert"), null, { timeout: 2000 }).catch(() => {});
ok(await panelClosed(), "mobile: Escape closes panel");
ok((await toggle.getAttribute("aria-expanded")) === "false", "mobile: aria-expanded back to false");
await toggle.click();
await p.waitForTimeout(300);
await p.locator("#mobile-menu a", { hasText: "Resume" }).first().click();
await p.waitForTimeout(500);
ok(p.url().endsWith("/resume"), `mobile: nav link routes (${p.url()})`);
await p.waitForFunction(() => document.querySelector("#mobile-menu").hasAttribute("inert"), null, { timeout: 2000 }).catch(() => {});
ok(await panelClosed(), "mobile: panel closes after navigation");
ok(await p.evaluate(() => Math.round(document.querySelector("#mobile-menu").getBoundingClientRect().height)) === 0,
   "mobile: panel collapses to zero height");
await ctx.close();

// --- desktop routing, keyboard, downloads ---
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
p = await ctx.newPage();
await p.goto(B + "/", { waitUntil: "domcontentloaded" });
await p.locator(".card").first().click();
await p.waitForTimeout(500);
ok(p.url().endsWith("/projects/densi"), `desktop: card click routes (${p.url()})`);
const sy = await p.evaluate(() => window.scrollY);
ok(sy < 5, `desktop: scroll resets on navigation (scrollY=${sy})`);

// other-projects excludes the current project
const others = await p.$$eval(".grid--compact .card", (n) => n.map((a) => a.getAttribute("href")));
ok(others.length === 3 && !others.some((h) => h?.endsWith("/densi")),
   `desktop: other projects = ${others.join(", ")}`);

await p.goto(B + "/resume", { waitUntil: "domcontentloaded" });
const pdf = await p.locator("a[download]").getAttribute("href");
const r = await p.request.get(B + pdf);
const pdfBody = await r.body();
ok(r.status() === 200 && pdfBody.length > 10000 && pdfBody.subarray(0, 4).toString() === "%PDF",
   `resume: PDF served (${r.status()}, ${pdfBody.length} bytes, magic ${pdfBody.subarray(0,4)})`);

// skip link + focus visibility
await p.goto(B + "/", { waitUntil: "domcontentloaded" });
await p.keyboard.press("Tab");
const focused = await p.evaluate(() => document.activeElement?.className ?? "");
ok(focused.includes("skip-link"), `a11y: first tab stop is skip link (${focused})`);

// deep-link refresh through the 404 fallback
await p.goto(B + "/projects/wellnest", { waitUntil: "domcontentloaded" });
ok((await p.locator("h1").innerText()) === "wellnest", "routing: deep link renders");

// reduced motion — ticker must not animate
await ctx.close();
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
p = await ctx.newPage();
await p.goto(B + "/", { waitUntil: "domcontentloaded" });
const anim = await p.evaluate(
  () => getComputedStyle(document.querySelector(".ticker__track")).animationName,
);
ok(anim === "none", `motion: ticker animation disabled under reduced-motion (${anim})`);
const revealOpacity = await p.evaluate(
  () => getComputedStyle(document.querySelector(".reveal")).opacity,
);
ok(revealOpacity === "1", `motion: reveals visible under reduced-motion (${revealOpacity})`);
await ctx.close();

await browser.close();
console.log(out.join("\n"));
console.log(out.some((l) => l.startsWith("FAIL")) ? "\nSOME CHECKS FAILED" : "\nALL CHECKS PASSED");
