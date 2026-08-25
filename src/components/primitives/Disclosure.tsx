"use client";

import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  className?: string;
}

/**
 * A disclosure that opens on a curve rather than in one frame.
 *
 * `<details>` is the honest element for this and it is what the site used, but
 * a browser gives it no transition: the panel is display:none one frame and
 * laid out the next, which lands hard on a page whose whole manner is unhurried.
 *
 * So the state is held in React and the panel is a 1fr/0fr grid row. That
 * animates to the content's own height — no max-height guessed at authoring
 * time, which is always wrong the day a paragraph is added — and the inner
 * element clips while it travels.
 *
 * What `<details>` gave away with it: the button carries `aria-expanded` and
 * points at the panel, so it is announced the same way. What is genuinely lost
 * is Ctrl+F reaching collapsed text, and `hidden="until-found"` is not
 * supported widely enough yet to hand it back. On a page of eight headings a
 * reader scans rather than searches, which is the trade being made.
 */
export function Disclosure({ summary, children, className }: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={cn("border-t border-rule last:border-b", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "group flex w-full cursor-pointer items-baseline gap-lg py-lg text-left",
          "font-serif text-lg font-light leading-snug text-fg-strong",
          "transition-opacity duration-300 hover:opacity-70",
        )}
      >
        <span className="flex-1 text-pretty">{summary}</span>

        {/* A cross that loses its upright stroke when the panel opens. */}
        <span aria-hidden="true" className="relative mt-2 block h-3 w-3 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
          <span
            className={cn(
              "absolute left-1/2 top-0 h-3 w-px bg-current",
              "transition-transform duration-400 ease-in-out-quart",
              "motion-reduce:transition-none",
              open ? "scale-y-0" : "scale-y-100",
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-in-out-quart",
          "motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "pb-lg transition-opacity duration-400",
              "motion-reduce:transition-none",
              open ? "opacity-100 delay-100" : "opacity-0",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
