import type { Project } from "../types";

const img = "/images/projects/wellnest";

/**
 * Presented as a gallery: the supplied case-study boards carry the whole story,
 * so the page is header, metadata, then the boards stacked full-bleed and flush
 * in source order (Wellnest/page 1, 2, 3, 3a, 4, 4a, 5, 5a, 6, 7, 8, 9).
 *
 * The reflection copy is transcribed from the closing board.
 */
export const wellnest: Project = {
  slug: "wellnest",
  title: "wellnest",
  shortDescription:
    "A mobile application aimed at empowering senior citizens to manage their health efficiently and independently.",
  role: "UI Design · UX Design · Research",
  industry: "Healthcare · Senior care",
  duration: "2025 · Concept project",
  layout: "gallery",
  theme: { bg: "#111111", ctaBg: "#1c1c1c" },
  cardImage: `${img}/wellnest-01.webp`,
  cardImageAlt: "The WellNest home screen shown on a phone against a dark backdrop",
  blocks: [
    {
      type: "media",
      layout: "bleed",
      items: [
        {
          kind: "image",
          src: `${img}/wellnest-01.webp`,
          alt: "WellNest home screen showing a morning greeting, medication schedule and quick emergency access",
        },
        {
          kind: "image",
          src: `${img}/wellnest-02.webp`,
          alt: "Project overview: a thoughtfully designed mobile application aimed at empowering senior citizens to manage their health efficiently and independently",
        },
        {
          kind: "image",
          src: `${img}/wellnest-03.webp`,
          alt: "Problem and solution: seniors juggling multiple medications, doctor visits and vital signs, and how WellNest centralises them",
        },
        {
          kind: "image",
          src: `${img}/wellnest-04.webp`,
          alt: "WellNest vitals and log screen shown on a phone",
        },
        {
          kind: "image",
          src: `${img}/wellnest-05.webp`,
          alt: "Typography and colour: SF Pro Display type scale with the blue, white, light blue and teal palette",
        },
        {
          kind: "image",
          src: `${img}/wellnest-06.webp`,
          alt: "Three WellNest screens laid out on a textured grey surface",
        },
        {
          kind: "image",
          src: `${img}/wellnest-07.webp`,
          alt: "User persona for Michael Wilson, 68, alongside the full WellNest user flow",
        },
        {
          kind: "image",
          src: `${img}/wellnest-08.webp`,
          alt: "WellNest appointments screen shown on a phone against a concrete backdrop",
        },
        {
          kind: "image",
          src: `${img}/wellnest-09.webp`,
          alt: "Hand-drawn wireframes for the five core WellNest screens",
        },
        {
          kind: "image",
          src: `${img}/wellnest-10.webp`,
          alt: "The five WellNest prototype screens: home, vitals and logs, med tracker, appointments and caregiver",
        },
        {
          kind: "image",
          src: `${img}/wellnest-11.webp`,
          alt: "Conclusion board covering challenges, learnings and next steps",
        },
        {
          kind: "image",
          src: `${img}/wellnest-12.webp`,
          alt: "Closing board showing the WellNest med tracker calendar",
        },
      ],
    },
  ],
  reflection: {
    heading: "Reflections",
    body: [
      "By addressing the unique challenges faced by older adults and embedding accessibility and caregiver collaboration at its core, WellNest transforms the complexity of senior health management into an approachable, supportive experience.",
    ],
  },
};
