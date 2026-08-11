import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { useSeo } from "../lib/useSeo";

export default function Projects() {
  useSeo({
    title: `${site.name} · Projects`,
    description:
      "Four projects: an AI research copilot, a financial wellness app, a health companion for seniors, and a children's health record.",
    path: "/projects",
    image: projects[0].cardImage,
  });

  return (
    <div className="page">
      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <Reveal>
            <h1 id="projects-heading" className="t-display" style={{ maxWidth: "16ch" }}>
              All projects
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-lead" style={{ marginTop: "var(--sp-4)" }}>
              Four of them. Two I'm working on now, two I finished and still like.
            </p>
          </Reveal>

          <div style={{ marginTop: "clamp(3rem, 6vw, 5.5rem)" }}>
            <ProjectGrid projects={projects} />
          </div>
        </div>
      </section>
    </div>
  );
}
