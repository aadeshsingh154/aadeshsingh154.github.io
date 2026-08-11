import { asset } from "../lib/useSeo";
import { mediaSizes } from "../data/mediaSizes";
import "./Marquee.css";

export type MarqueeItem = { src: string; alt: string };

type Props = {
  items: MarqueeItem[];
  /** Frame ratio: "wide" for mockups, "tall" for photography. */
  shape?: "wide" | "tall";
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Slow horizontal image ticker. The list is duplicated and the track shifts by
 * exactly -50%, so the loop is seamless. Pauses on hover or focus, and stops
 * entirely under prefers-reduced-motion (see Marquee.css).
 */
export function Marquee({ items, shape = "wide", speed = 46, reverse = false }: Props) {
  if (items.length === 0) return null;
  const row = [...items, ...items];

  return (
    <div className={`marquee marquee--${shape}`}>
      <ul
        className={`marquee__track ${reverse ? "marquee__track--reverse" : ""}`.trim()}
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((item, i) => {
          const dims = mediaSizes[item.src];
          return (
            <li key={`${item.src}-${i}`} className="marquee__item">
              <img
                src={asset(item.src)}
                alt={i < items.length ? item.alt : ""}
                aria-hidden={i >= items.length}
                width={dims?.[0]}
                height={dims?.[1]}
                loading="lazy"
                decoding="async"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
