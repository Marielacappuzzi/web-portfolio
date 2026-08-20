"use client";

import { type ElementType, type ReactNode, useEffect, useRef } from "react";
import { type RevealAttribute, observeReveal } from "@/lib/reveal";
import { cn } from "@/lib/cn";

type RevealVariant = "text" | "image" | "rule";

interface RevealProps {
  children?: ReactNode;
  /** Element to render. Defaults to a div — pass the semantic tag you need. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds. Use in steps of ~90ms for staggered siblings, max four. */
  delay?: number;
  className?: string;
  id?: string;
}

const attributeFor: Record<RevealVariant, RevealAttribute> = {
  text: "data-reveal",
  image: "data-reveal-image",
  rule: "data-reveal-rule",
};

/**
 * Renders its children plainly and, on mount, hands the element to the
 * observer. Nothing is hidden in the server output: if the client never runs,
 * the content is simply there. See src/lib/reveal.ts.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "text",
  delay = 0,
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) observeReveal(el, attributeFor[variant]);
  }, [variant]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as object) : undefined}
    >
      {children}
    </Tag>
  );
}
