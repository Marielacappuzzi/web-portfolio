import type { SVGProps } from "react";

/**
 * Line icons, drawn at 1px on a 24px grid.
 *
 * Stroke weight matches the hairline rules used everywhere else, so an icon
 * reads as another drawn line rather than as UI furniture. They are decorative
 * next to a visible label, so each one is hidden from assistive technology and
 * the surrounding link carries the name.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 8.15 6.1a1.4 1.4 0 0 0 1.7 0L21 6.5" />
    </svg>
  );
}
