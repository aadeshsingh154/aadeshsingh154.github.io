import { useEffect } from "react";
import { site } from "../data/site";

const BASE = import.meta.env.BASE_URL;

/** Resolve a public-folder path against the Vite base (GitHub Pages safe). */
export const asset = (path: string) =>
  `${BASE}${path.replace(/^\//, "")}`;

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace(/^meta\[|\]$/g, "").split("=");
    el.setAttribute(key, val.replace(/["']/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

type Seo = { title: string; description: string; path: string; image?: string };

export function useSeo({ title, description, path, image }: Seo) {
  useEffect(() => {
    const canonical = `${site.url}${path}`;
    const ogImage = image
      ? `${site.url}${asset(image)}`
      : `${site.url}${asset("/images/og-default.png")}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", ogImage);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, path, image]);
}
