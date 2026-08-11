import { site } from "../data/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import "./CTA.css";

export function CTA() {
  return (
    <section className="cta dark-surface" aria-labelledby="cta-heading">
      <div className="container cta__inner">
        <Reveal>
          <h2 id="cta-heading" className="t-section cta__heading">
            {site.cta.heading}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-lead cta__body">{site.cta.body}</p>
        </Reveal>
        <Reveal delay={160}>
          <a className="btn btn--onDark cta__btn" href={site.cta.href}>
            {site.cta.label}
            <Icon name="arrowUpRight" size={16} />
          </a>
        </Reveal>
        <Reveal delay={240}>
          <SocialLinks className="cta__social" />
        </Reveal>
      </div>
    </section>
  );
}
