import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The two grounds. A section is paper or chamber — there is no third surface,
 * no card, no raised panel. See docs/DESIGN_SYSTEM.md §Concepto.
 */
export type Ground = "paper" | "paper-bright" | "chamber";

interface SectionProps {
  children: ReactNode;
  ground?: Ground;
  /** `act` marks a change of narrative act and gets the larger breath. */
  rhythm?: "act" | "beat" | "tight" | "none";
  className?: string;
  id?: string;
  as?: "section" | "div" | "footer" | "header" | "article";
  style?: CSSProperties;
  "aria-labelledby"?: string;
}

const rhythms = {
  act: "py-4xl",
  beat: "py-3xl",
  tight: "py-2xl",
  none: "",
} as const;

export function Section({
  children,
  ground = "paper",
  rhythm = "beat",
  className,
  id,
  style,
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-ground={ground}
      style={style}
      className={cn("scroll-mt-24", rhythms[rhythm], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------ container --- */

type Width = "narrow" | "text" | "default" | "wide" | "full";

interface ContainerProps {
  children: ReactNode;
  width?: Width;
  className?: string;
  as?: "div" | "header" | "nav" | "footer";
}

const widths: Record<Width, string> = {
  narrow: "max-w-narrow",
  text: "max-w-text",
  default: "max-w-default",
  wide: "max-w-wide",
  full: "max-w-none",
};

/**
 * Two measures, not one: composition uses `default`/`wide`, reading uses
 * `text`. Body copy never inherits the width of an image.
 */
export function Container({
  children,
  width = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("gutter mx-auto w-full", widths[width], className)}>
      {children}
    </Tag>
  );
}
