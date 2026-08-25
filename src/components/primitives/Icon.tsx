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

export function LocationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.1 7-11.1a7 7 0 1 0-14 0c0 5 7 11.1 7 11.1Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  );
}

/**
 * Points down: this label opens something rather than only leading somewhere.
 * Rotated by the caller when the panel is open.
 */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} width={12} height={12} {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

/**
 * Points out and away: this link leads to a page of its own, as opposed to a
 * sibling that scrolls to a card on the page you are already on.
 */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} width={12} height={12} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Points the way a secondary action leads. Nudged on hover by the caller. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} width={14} height={14} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Rises to the top of the page. */
export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

/** A drawn tick for a checked box. */
export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} width={14} height={14} strokeWidth={2} {...props}>
      <path d="m5 12 5 5L19 7" />
    </svg>
  );
}
