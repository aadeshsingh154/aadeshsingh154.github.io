import { Reveal } from "../components/Reveal";
import {
  aiTools,
  certification,
  education,
  experience,
  profileHeading,
  profileSummary,
  resumeIntro,
  skills,
} from "../data/resume";
import { site } from "../data/site";
import { asset, useSeo } from "../lib/useSeo";
import "./Resume.css";

export default function Resume() {
  useSeo({
    title: `${site.name} · Resume`,
    description:
      "Five years of product and UX design across enterprise software, AI products and fintech. Currently at Emkay Global in Mumbai.",
    path: "/resume",
  });

  return (
    <div className="page">
      <header className="container rs__header">
        <Reveal>
          <h1 className="t-display rs__title">{profileHeading}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-lead rs__summary">{resumeIntro}</p>
        </Reveal>
        <Reveal delay={160}>
          <a className="btn rs__download" href={asset(`/${site.resumeFile}`)} download>
            Download Resume as PDF
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </Reveal>
      </header>

      <section className="container rs__section" aria-labelledby="rs-profile">
        <Reveal>
          <h2 id="rs-profile" className="t-eyebrow rs__label">
            Profile
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-body rs__profile">{profileSummary}</p>
        </Reveal>
      </section>

      <section className="container rs__section" aria-labelledby="rs-experience">
        <Reveal>
          <h2 id="rs-experience" className="t-eyebrow rs__label">
            Professional experience
          </h2>
        </Reveal>

        <ol className="rs__roles">
          {experience.map((role, i) => (
            <Reveal as="li" key={`${role.title}-${role.period}`} delay={(i % 3) * 80} className="rs__role">
              <div className="rs__rolePeriod t-small">
                <span>{role.period}</span>
                {role.location && <span className="t-mute">{role.location}</span>}
              </div>
              <div className="rs__roleBody">
                <h3 className="t-lg">{role.title}</h3>
                {role.company && <p className="t-small rs__company">{role.company}</p>}
                {role.bullets && (
                  <ul className="rs__bullets">
                    {role.bullets.map((b, j) => (
                      <li key={j} className="t-body">
                        {b.label && <strong className="rs__bulletLabel">{b.label}: </strong>}
                        {b.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container rs__section" aria-labelledby="rs-skills">
        <Reveal>
          <h2 id="rs-skills" className="t-eyebrow rs__label">
            Skills & core expertise
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <ul className="rs__tags">
            {skills.map((s) => (
              <li key={s} className="rs__tag">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={160}>
          <div className="rs__tools">
            <p className="t-lg">{aiTools.label}</p>
            <p className="t-body">{aiTools.items}</p>
          </div>
        </Reveal>
      </section>

      <section className="container rs__section" aria-labelledby="rs-education">
        <h2 id="rs-education" className="visually-hidden">
          Education and certifications
        </h2>
        <div className="rs__twoCol">
          <Reveal>
            <p className="t-eyebrow rs__label">Education</p>
            <p className="t-lg rs__eduTitle">{education.degree}</p>
            <p className="t-body">{education.institution}</p>
            <p className="t-small t-mute">{education.detail}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-eyebrow rs__label">Certifications</p>
            <p className="t-lg rs__eduTitle">{certification.degree}</p>
            <p className="t-body">{certification.institution}</p>
            <p className="t-small t-mute">{certification.detail}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
