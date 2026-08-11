import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Base styles must be evaluated before any component stylesheet, so that
// component rules (.hero__lead, .pd__desc …) win over the shared utility
// classes they override (.t-lead, .t-display …) at equal specificity.
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/typography.css";
import App from "./App";

/**
 * GitHub Pages has no SPA rewrite, so 404.html stashes the requested route in
 * sessionStorage and bounces to the app root. Restore it before React mounts so
 * the first render is already on the right route.
 */
const redirect = sessionStorage.getItem("gh-pages-redirect");
if (redirect) {
  sessionStorage.removeItem("gh-pages-redirect");
  history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
