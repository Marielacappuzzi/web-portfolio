"use client";

import { useEffect, useRef } from "react";
import { observeReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";

interface RuleProps {
  className?: string;
  delay?: number;
  /** Width of the stroke. "full" spans the container. */
  width?: "short" | "medium" | "full";
}

const widths = {
  short: "w-10",
  medium: "w-24",
  full: "w-full",
} as const;

/**
 * A single hairline that draws itself from the left. The site's only accent —
 * it stands in for the first stroke of a drawing.
 */
export function Rule({ className, delay = 0, width = "medium" }: RuleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) observeReveal(el, "data-reveal-rule");
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as object) : undefined}
      className={cn("block h-px bg-rule", widths[width], className)}
    />
  );
}
