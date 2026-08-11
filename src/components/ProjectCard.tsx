import { Link } from "react-router-dom";
import type { Project } from "../data/types";
import { asset } from "../lib/useSeo";
import { mediaSizes } from "../data/mediaSizes";
import "./ProjectCard.css";

type Props = {
  project: Project;
  priority?: boolean;
  compact?: boolean;
};

export function ProjectCard({ project, priority = false, compact = false }: Props) {
  const dims = mediaSizes[project.cardImage];

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`card ${compact ? "card--compact" : ""}`.trim()}
    >
      <div className="card__frame">
        <img
          className="card__image"
          src={asset(project.cardImage)}
          alt={project.cardImageAlt}
          width={dims?.[0]}
          height={dims?.[1]}
          sizes={compact ? "(max-width: 767px) 92vw, 46vw" : "(max-width: 767px) 92vw, 50vw"}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      </div>

      <div className="card__body">
        <h3 className={compact ? "t-lg card__title" : "t-xl card__title"}>
          {project.title}
        </h3>
        <p className="t-body card__desc">{project.shortDescription}</p>
        {!compact && (
          <span className="card__cta">
            See the project
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        )}
      </div>
    </Link>
  );
}
