/**
 * Every field here is taken verbatim from Aadesh_PD_Resume_2026.pdf.
 * Nothing is inferred or embellished. If the resume does not state it,
 * it is not in this file.
 */

export type Role = {
  title: string;
  company?: string;
  period: string;
  location?: string;
  bullets?: { label?: string; text: string }[];
};

export const profileHeading =
  "Five years of turning complicated things into screens people can use.";

/**
 * Page-level intro for /resume. The verbatim resume profile below is kept for
 * the Profile section itself. This is the lead-in, so it says something else.
 */
export const resumeIntro =
  "Enterprise software, AI products and fintech, mostly. Below is the short version. The full PDF has the same thing on one page.";

export const profileSummary =
  "Product Designer with 5+ years of experience designing enterprise software, AI-powered products, fintech platforms, and digital ecosystems. Currently shaping strategic products at Emkay Global, including an AI financial wellness platform and investment copilots. Expert at translating complex data and user workflows into production-ready, highly intuitive interfaces.";

export const experience: Role[] = [
  {
    title: "UI UX Designer",
    company: "Emkay Global Financial Services Pvt. Ltd.",
    period: "Sep 2025 – Present",
    location: "Mumbai, IN",
    bullets: [
      {
        label: "Artho (AI Financial Wellness)",
        text: "Led end-to-end UX for an enterprise financial health platform. Simplified intricate analysis, document intelligence, and personalized planning into actionable dashboards.",
      },
      {
        label: "DENSI (AI Copilot)",
        text: "Co-designed investment research assistant workflows for structured financial reports, balancing complex data visualizations with conversational search and discoverability with a dedicated research canvas.",
      },
      {
        label: "Blitz (Trading Platform)",
        text: "Designing next-generation proprietary trading interfaces prioritizing speed, responsive grids, and scalable system patterns supporting high-frequency decision making.",
      },
      {
        label: "Ecosystem Rebrand (Emkay)",
        text: "Spearheading the UX design system, responsive UI library, and defined accessibility standards (WCAG) across Wealth, Capital, and Asset management verticals.",
      },
    ],
  },
  {
    title: "Product, UX & Visual Designer",
    period: "Feb 2021 – Sep 2025",
    location: "Mumbai, IN",
    bullets: [
      {
        text: "Led end-to-end UI/UX design for multiple web and mobile projects, from research and user flows to high-fidelity prototypes and developer-ready assets.",
      },
      {
        text: "Designed and optimized user interfaces for digital campaigns and product landing pages for BrandSocial (2025), Astra Security (2024), Primer (Contract, 2023) and more, focusing on usability and conversion.",
      },
      {
        text: "Redesigned company product and landing pages for EventEngage (Contract, 2022), improving user engagement and satisfaction through competitive analysis and research-driven interface improvements.",
      },
    ],
  },
  {
    title: "Sales Manager",
    company: "WhiteHat Jr.",
    period: "Sep 2020 – Jan 2021",
  },
  {
    title: "Business Development Executive",
    company: "Balaji Palatial Living",
    period: "Aug 2019 – Sep 2020",
  },
];

export const skills = [
  "Product Strategy",
  "Product Discovery",
  "UX Research",
  "Information Architecture",
  "Interaction Design",
  "Wireframing & Prototyping",
  "Design Systems",
  "Component Libraries",
  "Responsive Web Design",
  "Accessibility (WCAG)",
  "Developer Handoff",
  "Design QA",
  "Figma",
  "Adobe Suite",
];

export const aiTools = {
  label: "AI Workflow Tools",
  items: "Claude, ChatGPT, Figma Make, Omma",
};

export const education = {
  degree: "Bachelor of Management Studies (BMS)",
  institution: "University of Mumbai",
  detail: "Graduated 2019",
};

export const certification = {
  degree: "Google UX Design Professional Certificate",
  institution: "Coursera",
  detail: "Credentials Earned 2024",
};

/** Resume-supported capabilities for the home-page expertise ticker. */
export const expertise = [
  "Product Strategy",
  "Product Discovery",
  "UX Research",
  "Interaction Design",
  "Design Systems",
  "Responsive Web Design",
  "Accessibility (WCAG)",
  "Developer Handoff",
  "Design QA",
  "AI Workflow Tools",
];
