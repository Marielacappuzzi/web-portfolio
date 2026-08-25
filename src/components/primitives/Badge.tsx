import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  as?: ElementType;
  /**
   * Over a photograph rather than on a ground. The muted default is tuned for
   * paper; on charcoal it drops to 55% white and stops carrying, so this
   * raises both the border and the label to full strength.
   */
  onImage?: boolean;
  className?: string;
}

/**
 * The concept label above a work's title.
 *
 * A hairline rectangle at the same weight as every other rule on the site,
 * held at low contrast so it frames the words without competing with the
 * charcoal above it. No fill, no radius, no colour — the border is the whole
 * device.
 *
 * Inside a `group` (a work card), the border lifts to full strength on hover,
 * so the badge answers the pointer along with the image instead of sitting
 * inert next to it.
 */
export function Badge({
  children,
  as: Tag = "span",
  onImage = false,
  className,
}: BadgeProps) {
  return (
    <Tag
      className={cn(
        "inline-block border px-2xs py-3xs",
        "font-sans text-2xs font-medium uppercase tracking-label",
        "transition-colors duration-500 ease-out-quart",
        "motion-reduce:transition-none",
        onImage
          ? "border-fg text-fg-strong"
          : "border-rule text-fg-muted group-hover:border-fg-faint group-hover:text-fg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
