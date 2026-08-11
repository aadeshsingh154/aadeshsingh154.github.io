import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
import { about, inspirationImages } from "../data/about";
import { site } from "../data/site";
import { asset, useSeo } from "../lib/useSeo";
import "./About.css";

export default function About() {
  useSeo({
    title: `${site.name} · About`,
    description:
      "I design software people use because they have to. A bit about how I work, what I look at, and where I'm heading.",
    path: "/about",
  });

  return (
    <div className="page">
      <header className="container ab__header">
        <Reveal>
          <h1 className="t-display ab__title">{about.heading}</h1>
        </Reveal>
      </header>

      <section className="container ab__intro">
        <Reveal delay={80} className="ab__portraitWrap">
          <img
            className="ab__portrait"
            src={asset(about.portrait.src)}
            alt={about.portrait.alt}
            width={1200}
            height={1200}
          />
        </Reveal>

        <div className="ab__introText">
          <Reveal delay={160}>
            <p className="t-xl ab__lead">{about.lead}</p>
          </Reveal>
          {about.body.map((p, i) => (
            <Reveal key={i} delay={240 + i * 80}>
              <p className="t-body ab__para">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ab__section" aria-labelledby="ab-inspiration">
        <div className="container ab__prose">
          <Reveal>
            <h2 id="ab-inspiration" className="t-section">
              {about.inspiration.heading}
            </h2>
          </Reveal>
          {about.inspiration.body.map((p, i) => (
            <Reveal key={i} delay={80 + i * 80}>
              <p className="t-lead ab__para">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="ab__gallery">
          <Marquee items={inspirationImages} shape="tall" speed={56} />
        </Reveal>
      </section>

      <section className="container ab__section ab__prose" aria-labelledby="ab-ahead">
        <Reveal>
          <h2 id="ab-ahead" className="t-section">
            {about.lookingAhead.heading}
          </h2>
        </Reveal>
        {about.lookingAhead.body.map((p, i) => (
          <Reveal key={i} delay={80 + i * 80}>
            <p className="t-lead ab__para">{p}</p>
          </Reveal>
        ))}
        <Reveal delay={240}>
          <p style={{ marginTop: "var(--sp-6)" }}>
            <Link to="/resume" className="btn btn--ghost">
              See the full resume
              <Icon name="arrowUpRight" size={16} />
            </Link>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
