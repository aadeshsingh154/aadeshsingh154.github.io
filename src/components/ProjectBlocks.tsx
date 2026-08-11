import type { Block, Project } from "../data/types";
import { MediaFigure } from "./MediaFigure";
import { Reveal } from "./Reveal";
import "./ProjectBlocks.css";

const sizesFor: Record<string, string> = {
  full: "(max-width: 767px) 92vw, min(1200px, 92vw)",
  wide: "(max-width: 767px) 92vw, min(880px, 92vw)",
  duo: "(max-width: 767px) 92vw, min(590px, 46vw)",
  trio: "(max-width: 767px) 92vw, min(390px, 30vw)",
  tall: "(max-width: 767px) 60vw, 300px",
};

function StageBlock({ block }: { block: Extract<Block, { type: "stage" }> }) {
  return (
    <Reveal as="section" className="pb pb--stage">
      <div className="pb__stageInner">
        {block.stage && <p className="t-eyebrow pb__stageLabel">{block.stage}</p>}
        <div className="pb__stageBody">
          <h2 className="t-xl">{block.heading}</h2>
          {block.body?.map((p, i) => (
            <p key={i} className="t-body pb__para">
              {p}
            </p>
          ))}
          {block.bullets && (
            <ul className="pb__bullets">
              {block.bullets.map((b, i) => (
                <li key={i} className="t-body">
                  {b.label && <strong className="pb__bulletLabel">{b.label}: </strong>}
                  {b.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function MediaBlock({ block }: { block: Extract<Block, { type: "media" }> }) {
  return (
    <div className={`pb pb--media pb--${block.layout}`}>
      {block.items.map((m, i) => (
        <Reveal key={i} delay={i * 80}>
          <MediaFigure media={m} sizes={sizesFor[block.layout]} />
        </Reveal>
      ))}
    </div>
  );
}

function QuoteBlock({ block }: { block: Extract<Block, { type: "quote" }> }) {
  return (
    <Reveal as="blockquote" className="pb pb--quote">
      <p className="pb__quoteText">{block.text}</p>
      {block.caption && <footer className="t-small">{block.caption}</footer>}
    </Reveal>
  );
}

export function ProjectBlocks({ project }: { project: Project }) {
  return (
    <div className="pb__list">
      {project.blocks.map((block, i) => {
        if (block.type === "stage") return <StageBlock key={i} block={block} />;
        if (block.type === "media") return <MediaBlock key={i} block={block} />;
        return <QuoteBlock key={i} block={block} />;
      })}
    </div>
  );
}
