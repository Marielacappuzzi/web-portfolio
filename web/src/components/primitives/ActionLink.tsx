import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Three levels of action. No filled buttons anywhere on the site — the brief
 * rules out commercial button language, and a drawn line reads as intent.
 */

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Primary. Small caps over a hairline that retracts and redraws on hover.
 * Reserved for the one action that matters in a section.
 */
export function ActionLink({ href, children, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "action-line font-sans text-2xs font-medium uppercase tracking-label",
        "text-fg-strong transition-opacity duration-300 hover:opacity-70",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/**
 * Bordered. A hairline rectangle whose outline completes itself on hover: two
 * segments draw in from opposite corners while a very light wash rises behind
 * the label. No fill, no radius, no shadow — it reads as a drawn frame rather
 * than a commercial button, which is what the brief asks for.
 *
 * Use where an action needs to be found without being announced.
 */
export function ActionButton({ href, children, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "action-frame group relative inline-flex items-center justify-center",
        "px-lg py-sm font-sans text-2xs font-medium uppercase tracking-label",
        "text-fg-strong",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

/** Secondary. Reads as running text with a quiet underline. */
export function QuietLink({ href, children, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-sans text-sm text-fg underline decoration-rule decoration-1 underline-offset-[6px]",
        "transition-colors duration-300 hover:text-fg-strong hover:decoration-current",
        className,
      )}
    >
      {children}
    </Link>
  );
}
