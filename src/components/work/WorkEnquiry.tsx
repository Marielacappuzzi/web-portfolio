"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import { withEmphasis } from "@/lib/emphasis";
import type { ContactPage } from "@/content/types";

type Mode = "original" | "print" | "default";

interface ModeCopy {
  title: string;
  paragraph: string;
  interes: string | null;
}

interface WorkEnquiryProps {
  page: ContactPage;
  workTitle: string;
  modes: Record<Mode, ModeCopy>;
  headingId: string;
}

/** Which of the two asks the reader pressed, from the hash they arrived on. */
function modeFromHash(): Mode {
  if (typeof window === "undefined") return "default";
  if (window.location.hash === "#consultar-original") return "original";
  if (window.location.hash === "#consultar-print") return "print";
  return "default";
}

/**
 * The enquiry, in the shape of the question that was asked.
 *
 * Two buttons lead here — the original and the prints — and until now both
 * landed on one form headed "¿Te interesa esta obra?" whose first question was
 * a dropdown asking which of the two. The reader had just answered that by
 * pressing a button. So the hash chooses: the heading names what is being
 * asked about, and `interes` stops being a field and becomes a value the page
 * supplies, travelling in the payload so Mariela still receives an enquiry
 * that says what it is about.
 *
 * One set of fields underneath, because a name, an address, where you are and
 * a message are what both enquiries need. Two near-identical field lists would
 * be two things to keep in step for no gain to anyone reading them.
 *
 * `default` — arriving with no hash, from a bookmark or by scrolling past —
 * keeps the dropdown, because there nothing has been asked yet.
 *
 * Rendered on the client for the hash alone. It starts on `default`, which is
 * what the HTML contains and what a reader without JavaScript keeps: a working
 * form with the question in it, rather than a form that assumes an answer it
 * has no way to know.
 */
export function WorkEnquiry({ page, workTitle, modes, headingId }: WorkEnquiryProps) {
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    const read = () => setMode(modeFromHash());
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const copy = modes[mode];
  const supplied: Record<string, string> = { obra: workTitle };
  if (copy.interes) supplied.interes = copy.interes;

  return (
    <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
      <div className="lg:col-span-4">
        <Reveal>
          <Display id={headingId} measure={18}>
            {withEmphasis(copy.title)}
          </Display>
        </Reveal>

        <Reveal delay={90} className="mt-lg">
          <p className="max-w-[42ch] font-sans text-base leading-relaxed text-pretty text-fg">
            {copy.paragraph}
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <Reveal delay={120}>
          {/*
            Keyed on the mode so React rebuilds the fields rather than
            reconciling them. Without it, moving between the two asks would
            leave the old uncontrolled inputs mounted with whatever the reader
            had typed under the other heading.
          */}
          <ContactForm key={mode} page={page} supplied={supplied} />
        </Reveal>
      </div>
    </div>
  );
}
