import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset scroll on navigation and move focus to the main landmark.
 *
 * Notes on the fiddly bits:
 * - `scroll-behavior: smooth` on <html> would animate the jump and leave the
 *   new page part-scrolled, so it is switched off for the reset.
 * - Scroll anchoring can nudge the position back after the new route paints,
 *   so the reset is repeated on the next frame.
 * - Focus only moves on an actual route change. On first load it stays put, so
 *   the skip link remains the first tab stop.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;

    // Must stay "auto" until the scroll has actually been applied. Restoring
    // it in the same tick lets the smooth animation from the stylesheet win,
    // and the new page lands part-scrolled.
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previous;
    });

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      document.getElementById("main")?.focus({ preventScroll: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      root.style.scrollBehavior = previous;
    };
  }, [pathname]);

  return null;
}
