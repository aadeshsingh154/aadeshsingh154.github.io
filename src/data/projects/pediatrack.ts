import type { Project } from "../types";

const img = "/images/projects/pediatrack";

/**
 * Presented as a gallery: the supplied case-study boards carry the whole story,
 * so the page is header, metadata, then the boards stacked full-bleed and flush
 * in source order (portfolio pediatrack 1 – 12), with the UI screen recording
 * sitting between boards 2 and 3.
 *
 * The reflection copy is transcribed from the closing board.
 */
export const pediatrack: Project = {
  slug: "pediatrack",
  title: "PediaTrack",
  shortDescription:
    "A centralised health records application that keeps parents and paediatricians on the same page about a child's health.",
  role: "UI/UX Design, case study",
  industry: "Healthcare · Paediatrics",
  duration: "2024",
  layout: "gallery",
  theme: { bg: "#151515", ctaBg: "#212121" },
  cardImage: `${img}/pediatrack-01.webp`,
  cardImageAlt: "The PediaTrack home screen shown on a phone between two stone forms",
  blocks: [
    {
      type: "media",
      layout: "bleed",
      items: [
        {
          kind: "image",
          src: `${img}/pediatrack-01.webp`,
          alt: "PediaTrack home screen showing a child's health card, growth milestones and appointment overview",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-02.webp`,
          alt: "PediaTrack title board introducing the case study",
        },
        {
          kind: "video",
          src: `${img}/pediatrack-ui.mp4`,
          webm: `${img}/pediatrack-ui.webm`,
          poster: `${img}/pediatrack-ui-poster.webp`,
          alt: "Screen recording of the PediaTrack interface moving through health cards, appointments and resources",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-03.webp`,
          alt: "Project goals: centralisation, accessibility and user engagement",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-04.webp`,
          alt: "Design process: discovery, design, and testing and iterations",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-05.webp`,
          alt: "Doctor profile and appointment booking screens shown side by side",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-06.webp`,
          alt: "User research profiling three parents and their pain points",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-07.webp`,
          alt: "Empathy maps for all three research profiles across says, thinks, does and feels",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-08.webp`,
          alt: "Full PediaTrack user flow with screens, decisions, actions and external links",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-09.webp`,
          alt: "Low-fidelity wireframes for the PediaTrack screens laid out on a grid",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-10.webp`,
          alt: "Design system board showing typography, colour palette and icon set",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-11.webp`,
          alt: "PediaTrack mockups showing health cards, appointment confirmation, resources and the medication tracker",
        },
        {
          kind: "image",
          src: `${img}/pediatrack-12.webp`,
          alt: "PediaTrack conclusion board",
        },
      ],
    },
  ],
  reflection: {
    heading: "Reflections",
    body: [
      "PediaTrack's UX design process focused on addressing the specific needs of both parents and paediatricians through thorough research and iterative design practices.",
      "By creating an intuitive interface that centralizes children's health information, PediaTrack enhances communication between caregivers and healthcare providers while empowering families to take charge of their children's health management effectively.",
    ],
  },
};
