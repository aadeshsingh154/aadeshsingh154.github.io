export type MediaSpan = "full" | "wide" | "duo" | "trio" | "tall" | "bleed";

export type Media =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** Optional soft frame, for flat exports that need edge definition. */
      framed?: boolean;
      /**
       * For very tall screen exports: render inside a fixed-height frame the
       * visitor can scroll, instead of letting a 4700px-tall image dominate
       * the page.
       */
      scrollable?: boolean;
    }
  | {
      kind: "video";
      src: string;
      webm?: string;
      poster: string;
      alt: string;
      framed?: boolean;
    };

export type Bullet = { label?: string; text: string };

export type Block =
  | {
      type: "stage";
      /** e.g. "Stage 1". Omit for unnumbered sections. */
      stage?: string;
      heading: string;
      body?: string[];
      bullets?: Bullet[];
    }
  | {
      type: "media";
      layout: MediaSpan;
      items: Media[];
    }
  | {
      type: "quote";
      text: string;
      caption?: string;
    };

/**
 * Per-project page theme. Setting this flips the whole page (nav, cards,
 * reflections, CTA and footer) to a dark palette built on `bg`, by overriding
 * the global tokens on <body>.
 */
export type ProjectTheme = {
  /** Page background. */
  bg: string;
  /** Background for the closing CTA band; keep it a step off `bg`. */
  ctaBg: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line, used on cards and in meta descriptions. */
  shortDescription: string;
  role: string;
  industry: string;
  duration: string;
  cardImage: string;
  cardImageAlt: string;
  /**
   * "editorial" is the default: contained hero, intro, alternating text and
   *   imagery, the way the reference template lays out a case study.
   * "gallery" is header and metadata only, then the supplied case-study boards
   *   stacked full-bleed and flush, the way a Behance project reads.
   */
  layout?: "editorial" | "gallery";
  theme?: ProjectTheme;
  /** Omitted for gallery projects, where the first board is the hero. */
  hero?: Media;
  intro?: string[];
  blocks: Block[];
  reflection?: { heading: string; body: string[] };
};
