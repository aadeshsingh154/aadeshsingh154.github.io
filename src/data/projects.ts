import type { Project } from "./types";
import { densi } from "./projects/densi";
import { artho } from "./projects/artho";
import { wellnest } from "./projects/wellnest";
import { pediatrack } from "./projects/pediatrack";

/** Display order is fixed: DENSI, Artho, wellnest, PediaTrack. */
export const projects: Project[] = [densi, artho, wellnest, pediatrack];

/**
 * The two shown on the home page. Artho and PediaTrack still appear in full on
 * /projects and in the "Other projects" rail on every case study.
 */
export const featuredProjects: Project[] = [densi, wellnest];

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug);

export const getOtherProjects = (slug: string) =>
  projects.filter((p) => p.slug !== slug);

export type { Project };
