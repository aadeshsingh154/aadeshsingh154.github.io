import type { IconName } from "../components/Icon";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

const social: SocialLink[] = [
  { label: "Behance", href: "https://www.behance.net/aadesh_singh", icon: "behance" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aadesh-singhhh/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/aadesh_singhhh", icon: "instagram" },
  { label: "Email", href: "mailto:aadeshsingh154@icloud.com", icon: "mail" },
];

export const site = {
  name: "Aadesh Singh",
  role: "Product & UX Designer",
  location: "Mumbai, India",
  email: "aadeshsingh154@icloud.com",
  phone: "+91 77386 48776",
  // Update this once a custom domain is pointed at the site.
  url: "https://aadeshsingh.github.io",
  title: "Aadesh Singh · Product & UX Designer",
  description:
    "Product & UX Designer in Mumbai. I build enterprise, AI and fintech products, currently at Emkay Global.",
  hero: {
    heading:
      "I'm Aadesh Singh, a Product & UX Designer building enterprise, AI & fintech products based in Mumbai, India.",
    paragraph:
      "I translate complex data and workflows into intuitive digital experiences. Currently designing AI-powered financial products and platforms at Emkay Global.",
  },
  social,
  cta: {
    heading: "Interested in working together?",
    body: "Let's talk products, design, or anything interesting.",
    label: "Get in touch",
    href: "mailto:aadeshsingh154@icloud.com",
  },
  resumeFile: "Aadesh-Singh-Resume.pdf",
};

/** Mockups shown in the marquee under the hero. */
export const heroMarquee = [
  { src: "/images/projects/densi/densi-card.webp", alt: "The DENSI research dashboard" },
  { src: "/images/projects/artho/artho-hero.webp", alt: "Three Artho app screens" },
  { src: "/images/projects/wellnest/wellnest-01.webp", alt: "The WellNest home screen" },
  { src: "/images/projects/pediatrack/pediatrack-01.webp", alt: "The PediaTrack home screen" },
  { src: "/images/projects/wellnest/wellnest-06.webp", alt: "Three WellNest screens" },
  { src: "/images/projects/pediatrack/pediatrack-05.webp", alt: "PediaTrack appointment screens" },
];
