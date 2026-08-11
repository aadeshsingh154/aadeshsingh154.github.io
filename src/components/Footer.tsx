import { Link } from "react-router-dom";
import { site } from "../data/site";
import { SocialLinks } from "./SocialLinks";
import "./Footer.css";

const pages = [
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/about", label: "About me" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <Link to="/" className="footer__brand">
            {site.name}
          </Link>
          <nav className="footer__nav" aria-label="Footer">
            {pages.map((p) => (
              <Link key={p.to} to={p.to} className="link">
                {p.label}
              </Link>
            ))}
          </nav>
        </div>

        <SocialLinks size="sm" className="footer__social" />
      </div>

      <div className="container footer__meta">
        <p className="t-small">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="t-small t-mute">{site.location}</p>
      </div>
    </footer>
  );
}
