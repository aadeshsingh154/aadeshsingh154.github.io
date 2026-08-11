import type { Project } from "../types";

const img = "/images/projects/artho";

/**
 * DRAFT COPY, for Aadesh's review.
 *
 * Built only from the resume bullet for Artho and what is visible in the
 * exported screens. No metrics, outcomes or research findings invented.
 */
export const artho: Project = {
  slug: "artho",
  title: "Artho",
  shortDescription:
    "A financial wellness app companies give their staff. Salary, spending, credit, investments and goals, all in one place.",
  role: "Product Designer, end-to-end UX",
  industry: "Fintech · Financial wellness",
  duration: "Sep 2025 – Present",
  cardImage: `${img}/artho-hero.webp`,
  cardImageAlt: "Three phones showing the Artho money, home and wealth screens",
  hero: {
    kind: "image",
    src: `${img}/artho-hero.webp`,
    alt: "Three iPhones showing the Artho expenses, home and wealth screens side by side",
  },
  intro: [
    "Artho is built for people who aren't finance people. It reads across salary, spending, credit, investments and goals, then tries to say something useful about them.",
    "I led the UX end to end: how the app is structured, the flows that sort out incoming transactions, and the screens that turn all of it into one thing you can actually go and do.",
  ],
  blocks: [
    {
      type: "stage",
      stage: "01",
      heading: "One number, then everything else",
      body: [
        "Every screen opens with a single figure and what it's made of. Total income split into salary and investments. Portfolio value against today's P&L. Credit limit against how much of it you've used. The detail sits underneath, never beside it.",
        "Apps like this usually open with a grid of tiles that all look equally important. This one picks.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/artho-01.webp`,
          alt: "Artho home screen with total income breakdown, alongside the money screen with linked bank accounts",
        },
      ],
    },
    {
      // Portrait phone recording, capped in width so it doesn't tower over
      // the rest of the page.
      type: "media",
      layout: "tall",
      items: [
        {
          kind: "video",
          src: `${img}/artho-ui.mp4`,
          webm: `${img}/artho-ui.webm`,
          poster: `${img}/artho-ui-poster.webp`,
          alt: "Screen recording of the Artho app moving between the home, money, wealth and goals surfaces",
          framed: true,
        },
      ],
    },
    {
      type: "stage",
      stage: "02",
      heading: "Making the boring part small",
      body: [
        "Sorting transactions into categories is the engine of the app, but nobody wants to look at an engine. So it asks for exactly what it needs, fourteen transactions to review, as a card inside the screen you're already on.",
        "Same for a bad month on one holding, or a goal falling behind. It becomes a small job you can finish, not a report you have to read.",
      ],
    },
    {
      type: "media",
      layout: "trio",
      items: [
        {
          kind: "image",
          src: `${img}/artho-full-dashboard.webp`,
          alt: "Full-length Artho home screen showing income, review prompts and the transaction list",
          framed: true,
          scrollable: true,
        },
        {
          kind: "image",
          src: `${img}/artho-full-expenses.webp`,
          alt: "Full-length Artho expenses screen showing spending categories and analysis",
          framed: true,
          scrollable: true,
        },
        {
          kind: "image",
          src: `${img}/artho-full-goals.webp`,
          alt: "Full-length Artho goals screen showing credit utilisation and goal progress",
          framed: true,
          scrollable: true,
        },
      ],
    },
    {
      type: "stage",
      stage: "03",
      heading: "Money and wealth",
      body: [
        "Money is the near stuff: accounts, balances, expenses, debts. Wealth is the far stuff: investments and goals.",
        "They're tabs under one header rather than separate destinations, because people jump between “what's my portfolio worth” and “can I afford the house” in the same minute. That's the change that got the goals screen used.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/artho-02.webp`,
          alt: "Artho expenses screen next to the wealth screen showing portfolio value and investment insights",
        },
      ],
    },
    {
      type: "stage",
      stage: "04",
      heading: "Goals that tell you what's next",
      body: [
        "Each goal shows where you are against a target and a date, then one suggestion tied to that specific goal, rather than a feed of recommendations sitting off to the side.",
        "Keeping it quiet and specific is what stops it reading like a sales pitch.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/artho-03.webp`,
          alt: "Artho goals screen with progress bars next to the debts screen",
        },
      ],
    },
    {
      type: "stage",
      stage: "05",
      heading: "Learning, and a quiet way out",
      body: [
        "Resources treats learning as progress rather than a library: what's done, what's in progress, what to pick up next.",
        "Under it sits support, including confidential help routed through HR. Artho reaches people through their employer, so that had to be easy to find without feeling like an admission. It just sits there, always.",
      ],
    },
    {
      type: "media",
      layout: "full",
      items: [
        {
          kind: "image",
          src: `${img}/artho-04.webp`,
          alt: "Artho resources screen with learning progress next to the account screen",
        },
      ],
    },
  ],
  reflection: {
    heading: "Reflections",
    body: [
      "The temptation with something like this is to show off how much analysis is going on underneath. Artho works better when it hides nearly all of it.",
      "Almost every review I ran ended the same way. Take a number out, or push it further down.",
    ],
  },
};
