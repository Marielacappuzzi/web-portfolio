"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ContactSentProps {
  /** The thank-you sentence. */
  message: string;
  /** What happens next, in one line. */
  note: string;
}

/**
 * What replaces the form once the message is away.
 *
 * The mark is drawn rather than shown: a single stroke that runs itself in,
 * the same gesture the rest of the site uses for a rule. A tick that simply
 * appears reads as a system notification; one that is drawn reads as a hand
 * confirming something, which is the register this whole page is written in.
 *
 * The sequence is a rule opening, the stroke, then the words rising — under a
 * second in total. Nothing here gates the message: the text is in the DOM from
 * the first frame, and GSAP only animates it. If the tween never runs, the
 * confirmation is simply there, which is the same contract as every reveal.
 */
export function ContactSent({ message, note }: ContactSentProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from("[data-sent-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
        })
        .from(
          "[data-sent-stroke]",
          {
            // The stroke runs itself in from the dash offset — no plugin.
            strokeDashoffset: 40,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "-=0.25",
        )
        .from(
          "[data-sent-line]",
          { opacity: 0, y: 14, duration: 0.8, stagger: 0.12 },
          "-=0.3",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="border border-rule px-lg py-xl">
      <span
        data-sent-rule
        aria-hidden="true"
        className="block h-px w-16 bg-fg-strong"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        fill="none"
        className="mt-lg h-8 w-8 text-fg-strong"
      >
        <path
          data-sent-stroke
          d="M6 21.5 15.5 30 34 10"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40"
        />
      </svg>

      <p
        data-sent-line
        className="mt-lg max-w-[46ch] font-serif text-2xl font-light leading-tight tracking-tight text-balance text-fg-strong"
      >
        {message}
      </p>

      <p
        data-sent-line
        className="mt-md max-w-[52ch] font-sans text-sm leading-relaxed text-fg-muted"
      >
        {note}
      </p>
    </div>
  );
}
