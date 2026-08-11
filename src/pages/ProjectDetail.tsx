import { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { getProject } from "../data/projects";
import type { ProjectTheme } from "../data/types";
import { site } from "../data/site";
import { useSeo } from "../lib/useSeo";
import { MediaFigure } from "../components/MediaFigure";
import { ProjectBlocks } from "../components/ProjectBlocks";
import { OtherProjects } from "../components/OtherProjects";
import { Reveal } from "../components/Reveal";
import "./ProjectDetail.css";

/**
 * Repaint the whole page in a project's own palette by overriding the global
 * tokens on <body>. Everything downstream (nav, cards, reflections, CTA,
 * footer) reads those tokens, so nothing else needs to know about the theme.
 */
function useProjectTheme(theme?: ProjectTheme) {
  useEffect(() => {
    if (!theme) return;
    const body = document.body;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousMeta = meta?.content;

    body.classList.add("theme-dark");
    body.style.setProperty("--bg", theme.bg);
    body.style.setProperty("--dark-section", theme.ctaBg);
    if (meta) meta.content = theme.bg;

    return () => {
      body.classList.remove("theme-dark");
      body.style.removeProperty("--bg");
      body.style.removeProperty("--dark-section");
      if (meta && previousMeta) meta.content = previousMeta;
    };
  }, [theme]);
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useSeo({
    title: project ? `${site.name} · ${project.title}` : `${site.name} · Not found`,
    description: project?.shortDescription ?? site.description,
    path: `/projects/${slug ?? ""}`,
    image: project?.cardImage,
  });

  useProjectTheme(project?.theme);

  if (!project) return <Navigate to="/404" replace />;

  const isGallery = project.layout === "gallery";
  const meta = [
    { label: "Role", value: project.role },
    { label: "Industry", value: project.industry },
    { label: "Duration", value: project.duration },
  ];

  return (
    <article className={`page pd ${isGallery ? "pd--gallery" : ""}`.trim()}>
      <header className="container pd__header">
        <Reveal>
          <Link to="/projects" className="pd__back t-small">
            <span aria-hidden="true">←</span> All projects
          </Link>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="t-display pd__title">{project.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="t-lead pd__desc">{project.shortDescription}</p>
        </Reveal>
        <Reveal delay={240}>
          <dl className="pd__meta">
            {meta.map((m) => (
              <div key={m.label} className="pd__metaItem">
                <dt className="t-eyebrow">{m.label}</dt>
                <dd className="t-small pd__metaValue">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {project.hero && (
        <Reveal className="container pd__hero">
          <MediaFigure
            media={project.hero}
            priority
            sizes="(max-width: 767px) 92vw, min(1200px, 92vw)"
          />
        </Reveal>
      )}

      {project.intro && (
        <Reveal className="container pd__intro">
          {project.intro.map((p, i) => (
            <p key={i} className="t-lead">
              {p}
            </p>
          ))}
        </Reveal>
      )}

      <div className="pd__body">
        <ProjectBlocks project={project} />
      </div>

      {project.reflection && (
        <Reveal as="section" className="container pd__reflection">
          <h2 className="t-section">{project.reflection.heading}</h2>
          <div className="pd__reflectionBody">
            {project.reflection.body.map((p, i) => (
              <p key={i} className="t-lead">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      )}

      <OtherProjects slug={project.slug} />
    </article>
  );
}
