# Aadesh Singh · Portfolio

Personal portfolio for Aadesh Singh, Product & UX Designer. React + TypeScript + Vite, deployed to GitHub Pages.

Visual system recreated from the **CallumHayes · Simplistic Designer Portfolio** Framer template (Maria Kovalevich): layout, spacing, typography hierarchy, motion and case-study architecture only. All copy, imagery and identity are Aadesh's.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Node 20+.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repo, go to *Settings → Pages* and set **Source** to **GitHub Actions**.

The repo is configured for a **user site**. Name it `aadeshsingh.github.io` and the site lands on `https://aadeshsingh.github.io` with `base: "/"`.

Moving it to a project repo instead? Add a repository variable `BASE_PATH` (*Settings → Secrets and variables → Actions → Variables*) set to `/<repo-name>/`. Nothing in the code needs to change.

Pointing a custom domain at it later:
1. Add a `CNAME` file in `public/` containing the bare domain.
2. Update `site.url` in `src/data/site.ts`, plus `public/robots.txt` and `public/sitemap.xml`.

### Clean URLs on GitHub Pages

GitHub Pages has no SPA rewrite, so `public/404.html` stores the requested route in `sessionStorage` and bounces to the root; `src/main.tsx` restores it before React mounts. Deep links and refreshes work on every route.

---

## Where things live

```
src/
  components/     Navigation, Footer, CTA, Hero, ProjectCard, ProjectGrid,
                  ProjectBlocks, MediaFigure, ExpertiseTicker, OtherProjects,
                  Reveal, ScrollToTop
  pages/          Home, Projects, ProjectDetail, Resume, About, NotFound
  data/
    site.ts       Identity, contact, hero copy, CTA copy
    resume.ts     Resume content, verbatim from Aadesh_PD_Resume_2026.pdf
    types.ts      Project / Block / Media types
    projects.ts   Project order and lookups
    projects/     One file per case study
    mediaSizes.ts GENERATED. Intrinsic image dimensions
  styles/         tokens.css, globals.css, typography.css
  lib/useSeo.ts   Per-route title, description, canonical, Open Graph
scripts/
  build-assets.py     Rebuilds every processed image and video from source
  gen-media-sizes.py  Regenerates src/data/mediaSizes.ts
public/
  images/projects/    Processed case-study imagery and video
  images/profile/     Portraits (avatar + about page)
  Aadesh-Singh-Resume.pdf
```

Project content is fully separated from the UI. Adding, removing or reordering a case study means editing `src/data/projects/` only. No component changes.

### Two case-study layouts

Each project picks a `layout` in its data file:

- **`editorial`** (the default, used by DENSI and Artho): contained hero, intro, then alternating text stages and imagery, the way the reference template lays out a case study.
- **`gallery`** (wellnest, PediaTrack): title, description and the Role / Industry / Duration line, then the supplied case-study boards stacked full-bleed and flush with no gaps, the way a project reads on Behance. Reflections, Other projects, CTA and footer follow as normal. The first board doubles as the hero, so there is no separate hero image.

### Per-project page themes

A project can carry a `theme`:

```ts
theme: { bg: "#151515", ctaBg: "#212121" }
```

`ProjectDetail` writes those onto `<body>` and adds `.theme-dark`, which overrides the global tokens in `globals.css`. Nav, cards, metadata, reflections, CTA and footer all read those tokens, so the whole page repaints. No component knows about the theme, and it unwinds cleanly on navigate away. The browser `theme-color` meta follows too.

Currently: wellnest `#111111`, PediaTrack `#151515`, chosen to sit flush with the dark backgrounds already baked into those boards.

---

## Before this goes live

### Read the draft copy

Three files carry writing that is mine rather than yours, and each says so at the top:

- **`src/data/projects/densi.ts`** and **`artho.ts`**: those folders held Figma exports with no written case study, so the copy comes strictly from your resume bullets plus what's factually visible in the screens. No metrics, outcomes, research findings or quotes invented.
- **`src/data/about.ts`**: the whole file. It is the only writing on the site that isn't drawn from the resume or your own case-study boards, so it's the one most worth making your own.

`wellnest.ts` and `pediatrack.ts` are transcribed from your own case-study boards and need no review.

---

## Assets

Source material stays in the project folder alongside the repo; `scripts/build-assets.py` turns it into what `public/` ships:

- **Portraits.** `profile/aadesh-avatar.png` is the transparent cutout, cropped to head and shoulders for the hero circle. `profile/aadesh-portrait.jpg` is the bazaar photo squared off from the bottom, so the face is untouched.
- **About photographs.** Eight picks from `for about us/`, converted from HEIC to WebP at 1400px on the long side with camera rotation applied. Mixed portrait and landscape by design: the marquee gives every frame the same height and lets the width fall where it does, so nothing is cropped.
- **wellnest / PediaTrack.** Case-study slides resized to 1800px wide and converted to WebP.
- **Artho.** Tall mobile Figma screens composited into iPhone device mockups. Three full-length screens also ship uncropped, rendered inside a scrollable frame so a 4700px-tall export doesn't swallow the page.
- **DENSI.** Wide desktop screens composited into minimal browser-window mockups.
- **All three screen recordings.** Converted from GIF to MP4 + WebM with a WebP poster. This was not optional: the DENSI GIF alone is 187 MB, well past GitHub's 100 MB per-file hard limit. As MP4 it is 1.1 MB. Total `public/` is about 18 MB.

Videos autoplay muted and inline only while on screen, and stay paused on their poster frame under `prefers-reduced-motion`.

To rebuild after changing source assets:

```bash
python3 scripts/build-assets.py     # needs Pillow + ffmpeg
python3 scripts/gen-media-sizes.py
```

---

## Design system

Tokens live in `src/styles/tokens.css`: type scale, neutral palette, spacing rhythm, easing and durations. There is deliberately **no brand accent colour**; the project imagery carries all the colour, and the dark `--dark-section` is reserved for the closing CTA.

Motion is CSS transitions driven by an `IntersectionObserver` in `Reveal.tsx` rather than an animation library, which keeps the JS bundle at ~89 KB gzipped. Everything decorative is switched off under `prefers-reduced-motion`.

The reference template's testimonial carousel became **"What I bring to the table"**, a slow expertise ticker. The resume contains no testimonials and none were invented. The ticker pauses on hover, stops entirely under reduced motion, and has a static screen-reader copy of the same list.

Icons are [Iconoir](https://iconoir.com) (MIT), inlined as paths in `src/components/Icon.tsx` rather than pulled from a package, so there is no icon dependency and no extra requests.

`Marquee.tsx` drives both image tickers (hero mockups, About photographs). The list is duplicated and the track shifts by exactly -50%, so the loop is seamless; it pauses on hover and becomes a plain horizontal scroller under reduced motion.

The home page shows **two** projects, DENSI and wellnest, set in `featuredProjects` in `src/data/projects.ts`. All four appear on `/projects` and in the "Other projects" rail on every case study.

## Accessibility

Semantic landmarks, one `<h1>` per page, visible focus rings, a skip link as the first tab stop, alt text on every image, `aria-label` on icon-only controls, `aria-expanded` on the mobile menu with Escape-to-close, and focus moved to `<main>` on route change. Reduced-motion is honoured throughout.

## Checks

`interact.mjs` and `shoot.mjs` at the repo root drive a headless browser over every route at 1440 / 1024 / 390px, checking for horizontal overflow, heading structure, broken images, missing alt text, failed requests, routing, the mobile menu, the resume PDF, the skip link and reduced-motion behaviour. Requires `npx playwright install chromium`.

```bash
npm run preview &
node interact.mjs
VP=desktop node shoot.mjs      # screenshots to /tmp/qa
```
