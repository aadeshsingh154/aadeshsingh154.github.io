import { expertise } from "../data/resume";
import { Reveal } from "./Reveal";
import "./ExpertiseTicker.css";

/**
 * Stands in for the reference's testimonial slideshow. The resume contains no
 * testimonials and none have been invented. The visual function (a slow
 * horizontal ticker in the credibility slot) is preserved with resume-supported
 * capabilities instead.
 */
export function ExpertiseTicker() {
  const row = [...expertise, ...expertise];

  return (
    <section className="section ticker" aria-labelledby="expertise-heading">
      <div className="container">
        <Reveal>
          <h2 id="expertise-heading" className="t-section">
            What I bring to the table
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="t-lead ticker__lead">
            The things I actually spend my weeks doing.
          </p>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <div className="ticker__viewport">
          <ul className="ticker__track" aria-hidden="true">
            {row.map((item, i) => (
              <li key={`${item}-${i}`} className="ticker__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Accessible, non-animated copy of the same list. */}
      <ul className="visually-hidden">
        {expertise.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
