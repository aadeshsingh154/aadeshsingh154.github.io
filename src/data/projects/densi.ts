import type { Project } from "../types";

const img = "/images/projects/densi";

/**
 * DRAFT COPY, for Aadesh's review.
 *
 * Built only from the resume bullet for DENSI and what is visible in the
 * exported screens. No metrics, outcomes or quotes invented.
 */
export const densi: Project = {
  slug: "densi",
  title: "DENSI",
  shortDescription:
    "An AI copilot that reads Emkay's equity research and answers questions from it, with the source always one click away.",
  role: "Product Designer, co-designed with the DENSI team",
  industry: "Fintech · Investment research",
  duration: "Sep 2025 – Present",
  cardImage: `${img}/densi-card.webp`,
  cardImageAlt: "The DENSI home dashboard shown in a browser window",
  hero: {
    kind: "image",
    src: `${img}/densi-hero.webp`,
    alt: "DENSI home dashboard showing research activity, analyst connect, journeys and sector rotation",
  },
  intro: [
    "DENSI sits on top of the research Emkay already publishes. Instead of digging through a forty-page PDF, you ask a question and get an answer that points back at the page it came from.",
    "I co-designed the workflows with the DENSI team: how a report turns into something readable, how search stays tied to a source, and how a thesis gets built up over time.",
  ],
  blocks: [
    {
      type: "stage",
      stage: "01",
      heading: "The home screen",
      body: [
        "It opens with what you were already doing. Reports in progress, journeys still processing, boards your analyst made for you, and the one you stopped halfway through.",
        "There's also a strip that flags when two reports touch the same theme, with a verify button sitting right next to it. Nothing the AI says gets treated as settled.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/densi-01.webp`,
          alt: "DENSI home dashboard with research activity counters, analyst connect panel and journey list",
        },
        {
          kind: "image",
          src: `${img}/densi-02.webp`,
          alt: "An alternate DENSI home state showing theme playbooks and sector rotation",
        },
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "video",
          src: `${img}/densi-ui.mp4`,
          webm: `${img}/densi-ui.webm`,
          poster: `${img}/densi-ui-poster.webp`,
          alt: "Screen recording of DENSI moving between the dashboard, report view and research canvas",
        },
      ],
    },
    {
      type: "stage",
      stage: "02",
      heading: "Reports, side by side",
      body: [
        "The original PDF stays on the left, page for page. The AI journey runs down the right: key takeaway, beats and misses, growth drivers, margins, management outlook. Every step links back to the page it came from.",
        "Rating, target and upside sit in a strip at the top, so you can see what changed before reading a word.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/densi-05.webp`,
          alt: "DENSI report view with the original research PDF on the left and a numbered AI journey on the right",
        },
      ],
    },
    {
      type: "stage",
      stage: "03",
      heading: "The canvas",
      body: [
        "This is where a thesis gets built. You pin reports to a board and pull blocks out of them: price targets, rating history, risk tracking, comparisons. Each block remembers which report it came from, so the board stays checkable.",
        "At the bottom there's an ask bar with starting points like “biggest risk here” or “anything stale?”. Answers land on the board as new blocks instead of disappearing into a chat.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/densi-08.webp`,
          alt: "DENSI research canvas showing a thesis audit board with pinned reports and generated analysis blocks",
        },
        {
          kind: "image",
          src: `${img}/densi-09.webp`,
          alt: "A DENSI canvas with target price, rating timeline and estimate revision blocks connected to their sources",
        },
      ],
    },
    {
      type: "media",
      layout: "duo",
      items: [
        {
          kind: "image",
          src: `${img}/densi-10.webp`,
          alt: "A blank DENSI canvas with four pinned reports and a multi-dimension comparison block",
        },
        {
          kind: "image",
          src: `${img}/densi-11.webp`,
          alt: "A DENSI canvas zoomed out to show financial model, price level and risk comparison blocks",
        },
      ],
    },
    {
      type: "stage",
      stage: "04",
      heading: "Your analyst, still in the room",
      body: [
        "Analysts share notes with you, you send notes back with a priority and a few tags, and you can ask for a call. The chat can point at a specific step of a specific report.",
        "When the AI's read and the analyst's read don't match, the product shows you both.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/densi-07.webp`,
          alt: "DENSI analyst connect screen with shared notes, a note composer and a chat thread with the research analyst",
        },
      ],
    },
    {
      type: "stage",
      stage: "05",
      heading: "Built for long sessions",
      body: [
        "Dark by default, with one amber accent used only for state and never for decoration. Every chart speaks the same language, whether it's a sector radar or a price trajectory.",
        "Anything that's sample or unverified data says so, right where it sits.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/densi-03.webp`,
          alt: "DENSI research activity view with a total reports chart and summary counters",
        },
        {
          kind: "image",
          src: `${img}/densi-06.webp`,
          alt: "DENSI sector coverage radar comparing sectors covered against sectors read",
        },
      ],
    },
  ],
  reflection: {
    heading: "Reflections",
    body: [
      "The hard part was never the summarising. It was trust.",
      "Nobody should make a call on a sentence they can't trace, so most of the work went into showing where something came from and how old it is. The split report view and the sourcing on each canvas block both came out of that.",
    ],
  },
};
