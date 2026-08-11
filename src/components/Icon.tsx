/**
 * Iconoir (MIT). https://iconoir.com
 *
 * The four social marks plus a link arrow, inlined rather than pulled from a
 * package so the site ships no icon dependency and makes no extra requests.
 * Paths are verbatim from iconoir/icons/regular/*.svg.
 */

export type IconName = "behance" | "linkedin" | "instagram" | "mail" | "arrowUpRight";

const paths: Record<IconName, React.ReactNode> = {
  behance: (
    <>
      <path d="M8.19718 11.2174C13.2676 11.2174 13.2676 18 8.19718 18C5.33701 18 2 18 2 18V11.2174M8.19718 11.2174C5.33701 11.2174 2 11.2174 2 11.2174M8.19718 11.2174C13.2676 11.2174 13.2676 5.00001 8.19718 5C5.94366 5 2 5 2 5V11.2174" />
      <path d="M18 9C15.7909 9 14 11.0147 14 13.5H22C22 11.0147 20.2091 9 18 9Z" />
      <path d="M14 13.5C14 15.9853 15.7909 18 18 18C20.7552 18 21.5 16 21.5 16" />
      <path d="M20.5 6L15.5 6" />
    </>
  ),
  linkedin: (
    <>
      <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" />
      <path d="M7 17V13.5V10" />
      <path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" />
      <path d="M7 7.01L7.01 6.99889" />
    </>
  ),
  instagram: (
    <>
      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
      <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" />
      <path d="M17.5 6.51L17.51 6.49889" />
    </>
  ),
  mail: (
    <>
      <path d="M7 9L12 12.5L17 9" />
      <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" />
    </>
  ),
  arrowUpRight: <path d="M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005" />,
};

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 20, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
