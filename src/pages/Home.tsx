import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { ExpertiseTicker } from "../components/ExpertiseTicker";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { featuredProjects, projects } from "../data/projects";
import { site } from "../data/site";
import { useSeo } from "../lib/useSeo";

export default function Home() {
  useSeo({
    title: site.title,
    description: site.description,
    path: "/",
    image: projects[0].cardImage,
  });

  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="selected-projects">
        <div className="container">
          <Reveal>
            <h2 id="selected-projects" className="t-section">
              Selected projects
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-lead" style={{ marginTop: "var(--sp-3)" }}>
              Two I keep coming back to. The rest are on the projects page.
            </p>
          </Reveal>

          <div style={{ marginTop: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            <ProjectGrid projects={featuredProjects} />
          </div>

          <Reveal delay={80}>
            <p style={{ marginTop: "var(--sp-7)" }}>
              <Link to="/projects" className="btn btn--ghost">
                See all four projects
                <Icon name="arrowUpRight" size={16} />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <ExpertiseTicker />
    </>
  );
}
