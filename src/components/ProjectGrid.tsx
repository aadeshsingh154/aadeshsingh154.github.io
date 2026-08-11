import type { Project } from "../data/types";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import "./ProjectGrid.css";

type Props = {
  projects: Project[];
  compact?: boolean;
};

export function ProjectGrid({ projects, compact = false }: Props) {
  return (
    <ul className={`grid ${compact ? "grid--compact" : ""}`.trim()}>
      {projects.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 2) * 80} className="grid__item">
          <ProjectCard project={p} priority={i === 0 && !compact} compact={compact} />
        </Reveal>
      ))}
    </ul>
  );
}
