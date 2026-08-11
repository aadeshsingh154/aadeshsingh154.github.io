import { Link } from "react-router-dom";
import { site } from "../data/site";
import { useSeo } from "../lib/useSeo";

export default function NotFound() {
  useSeo({
    title: `${site.name} · Page not found`,
    description: "That page doesn't exist.",
    path: "/404",
  });

  return (
    <div className="page">
      <div className="container" style={{ paddingBlock: "clamp(3rem, 8vw, 7rem)" }}>
        <p className="t-eyebrow">404</p>
        <h1 className="t-display" style={{ marginTop: "var(--sp-3)", maxWidth: "14ch" }}>
          That page doesn't exist.
        </h1>
        <p className="t-lead" style={{ marginTop: "var(--sp-4)" }}>
          The link may be out of date, or the page may have moved.
        </p>
        <p style={{ marginTop: "var(--sp-6)", display: "flex", gap: "var(--sp-3)", flexWrap: "wrap" }}>
          <Link to="/" className="btn">
            Back home
          </Link>
          <Link to="/projects" className="btn btn--ghost">
            See the projects
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
