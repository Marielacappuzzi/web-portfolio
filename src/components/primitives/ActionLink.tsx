import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/primitives/Icon";
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
        "action-frame inline-flex items-center justify-center",
        "px-lg py-sm font-sans text-2xs font-medium uppercase tracking-label",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

/**
 * Secondary. A firmer sibling to the framed button: small caps on a hairline
 * that spans the text, with an arrow that steps forward under the pointer.
 *
 * It used to read as running prose with an underline, which left it looking
 * like an afterthought beside the button it sits next to. Same weight and the
 * same cap height as the button now, so the pair sits on one line and the
 * difference between them is emphasis rather than importance.
 */
export function QuietLink({ href, children, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2xs py-sm",
        "font-sans text-2xs font-medium uppercase tracking-label",
        "border-b border-fg-muted text-fg-strong",
        "transition-colors duration-300 hover:border-fg-strong",
        className,
      )}
    >
      {children}

      <ArrowRightIcon
        className={cn(
          "shrink-0 transition-transform duration-300 ease-out-quart",
          "group-hover:translate-x-1 motion-reduce:transition-none",
          "motion-reduce:group-hover:translate-x-0",
        )}
      />
    </Link>
  );
}