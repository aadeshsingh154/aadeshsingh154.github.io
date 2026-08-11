import { heroMarquee, site } from "../data/site";
import { asset } from "../lib/useSeo";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import "./Hero.css";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <Reveal>
          <img
            className="hero__portrait"
            src={asset("/images/profile/aadesh-avatar.png")}
            alt={`${site.name}, ${site.role}`}
            width={140}
            height={140}
            fetchPriority="high"
          />
        </Reveal>

        <Reveal delay={80}>
          <h1 id="hero-heading" className="t-display hero__heading">
            {site.hero.heading}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="t-lead hero__lead">{site.hero.paragraph}</p>
        </Reveal>

        <Reveal delay={240}>
          <SocialLinks className="hero__social" />
        </Reveal>
      </div>

      <Reveal delay={320} className="hero__marquee">
        <Marquee items={heroMarquee} speed={52} />
      </Reveal>
    </section>
  );
}
