import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { site } from "../data/site";
import { SocialLinks } from "./SocialLinks";
import "./Navigation.css";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/about", label: "About me" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${open ? "nav--open" : ""}`.trim()}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          {site.name}
        </Link>

        <nav className="nav__desktop" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav__link ${isActive ? "is-active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bar" />
          <span className="nav__bar" />
        </button>
      </div>

      {/*
        Stays in the DOM so its height can animate. It sits in the header's
        normal flow rather than over the page, so opening it pushes the content
        down instead of covering it. `inert` keeps the links out of the tab
        order and off screen readers while it's collapsed.
      */}
      <div id="mobile-menu" className="nav__panel" inert={!open}>
        <div className="nav__panelInner container">
          <nav aria-label="Primary mobile">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `nav__panelLink ${isActive ? "is-active" : ""}`
                }
                style={{ "--i": i } as React.CSSProperties}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <SocialLinks size="sm" className="nav__panelSocial" />
        </div>
      </div>
    </header>
  );
}
