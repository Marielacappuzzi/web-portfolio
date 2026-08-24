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

/* --- Player controls ------------------------------------------------------
 * Drawn on the same 24px grid and the same 1px stroke as the rest, so the
 * control row reads as a line of marks rather than as a media widget. Play is
 * the one filled shape on the site: a triangle in outline at this weight
 * disappears at small sizes, and it is the single affordance a viewer must
 * never have to hunt for.
 * ------------------------------------------------------------------------ */

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <rect x="7" y="5.5" width="3.2" height="13" />
      <rect x="13.8" y="5.5" width="3.2" height="13" />
    </svg>
  );
}

export function SoundOnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M18 7a7 7 0 0 1 0 10" />
    </svg>
  );
}

export function SoundOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
      <path d="m16 9.5 4.5 5M20.5 9.5l-4.5 5" />
    </svg>
  );
}

export function FullscreenIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}
