import { useEffect, useRef } from "react";
import type { Media } from "../data/types";
import { asset } from "../lib/useSeo";
import { mediaSizes } from "../data/mediaSizes";
import "./MediaFigure.css";

type Props = {
  media: Media;
  priority?: boolean;
  sizes?: string;
};

function ratioOf(src: string) {
  const dims = mediaSizes[src];
  return dims ? `${dims[0]} / ${dims[1]}` : undefined;
}

/**
 * A single image or looping video block. Video autoplays muted inline where the
 * browser allows it, and is paused entirely under `prefers-reduced-motion` so
 * the poster frame is what the user sees.
 */
export function MediaFigure({ media, priority = false, sizes }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.autoplay = false;
      el.pause();
      return;
    }
    // Only play while on screen, since long UI recordings otherwise burn battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [media]);

  const key = media.kind === "image" ? media.src : media.poster;
  const style = { aspectRatio: ratioOf(key) } as React.CSSProperties;
  const cls = `media ${media.framed ? "media--framed" : ""}`.trim();

  if (media.kind === "video") {
    const dims = mediaSizes[media.poster];
    return (
      <video
        ref={videoRef}
        className={cls}
        style={style}
        width={dims?.[0]}
        height={dims?.[1]}
        poster={asset(media.poster)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
      >
        {media.webm && <source src={asset(media.webm)} type="video/webm" />}
        <source src={asset(media.src)} type="video/mp4" />
      </video>
    );
  }

  const dims = mediaSizes[media.src];
  const image = (
    <img
      className={media.scrollable ? "media__scrollImage" : cls}
      style={media.scrollable ? undefined : style}
      src={asset(media.src)}
      alt={media.alt}
      width={dims?.[0]}
      height={dims?.[1]}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );

  if (!media.scrollable) return image;

  return (
    <div className={`${cls} media--scroll`} tabIndex={0} role="group" aria-label={media.alt}>
      {image}
    </div>
  );
}
