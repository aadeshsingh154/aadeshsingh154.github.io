import { site } from "../data/site";
import { Icon } from "./Icon";
import "./SocialLinks.css";

type Props = {
  /** "lg" for the hero and CTA, "sm" for the footer. */
  size?: "lg" | "sm";
  className?: string;
};

export function SocialLinks({ size = "lg", className = "" }: Props) {
  return (
    <ul className={`socials socials--${size} ${className}`.trim()}>
      {site.social.map((s) => {
        const isMail = s.href.startsWith("mailto:");
        return (
          <li key={s.label}>
            <a
              className="socials__btn"
              href={s.href}
              aria-label={isMail ? `Email ${site.name}` : `${s.label} profile`}
              title={s.label}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noreferrer"}
            >
              <Icon name={s.icon} size={size === "lg" ? 20 : 18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
