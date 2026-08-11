import { getOtherProjects } from "../data/projects";
import { ProjectGrid } from "./ProjectGrid";
import { Reveal } from "./Reveal";

export function OtherProjects({ slug }: { slug: string }) {
  const others = getOtherProjects(slug);
  if (others.length === 0) return null;

  return (
    <section className="section" aria-labelledby="other-projects">
      <div className="container">
        <Reveal>
          <h2 id="other-projects" className="t-section">
            Other projects
          </h2>
        </Reveal>
        <div style={{ marginTop: "var(--sp-6)" }}>
          <ProjectGrid projects={others} compact />
        </div>
      </div>
    </section>
  );
}
