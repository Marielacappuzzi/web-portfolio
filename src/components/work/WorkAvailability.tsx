import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Eyebrow } from "@/components/primitives/Type";
import { printLabels, statusLabels } from "./WorkMeta";
import type { Work } from "@/content/types";

interface WorkAvailabilityProps {
  work: Work;
}

/**
 * What can be had, and how to ask for it.
 *
 * Two columns, because a work and its edition are two things that sell
 * separately and at different prices. Side by side from `sm`, stacked below
 * it. Each states what it is, what state it is in, and — only if that state
 * can be acted on — the one button that asks about it.
 *
 * No panels. The site has two grounds and no third surface, so these are not
 * cards in the usual sense: a rule across the top of each column does the work
 * a box would do, which is what the rest of the site uses to separate things.
 * The point of the brief was that these must not read as two large calls to
 * action, and a filled tile with a button in it is exactly that.
 *
 * The state is set in the serif at reading size and the button is a sans
 * underline, so "Disponible" is a fact about the work and the line under it is
 * something to press. They cannot be confused for each other.
 *
 * Both states come from the work's own data, so this needs no editing when
 * things change: set `status` to "sold" and the original reads Vendida and
 * loses its button while the edition carries on. Nothing here is written twice.
 */
export function WorkAvailability({ work }: WorkAvailabilityProps) {
  /*
    A button only where there is something to ask about. An enquiry form for a
    piece that has already gone is a worse answer than the plain statement
    that it has gone — and the commission block underneath is the route for
    someone who wants one anyway.
  */
  const columns = [
    work.status
      ? {
          key: "original",
          eyebrow: "Obra original",
          state: statusLabels[work.status],
          action:
            work.status === "available"
              ? { label: "Consultar por la obra original", href: "#consultar-original" }
              : null,
        }
      : null,
    work.prints
      ? {
          key: "prints",
          eyebrow: "Prints",
          state: printLabels[work.prints],
          action:
            work.prints === "available"
              ? { label: "Consultar por prints", href: "#consultar-print" }
              : null,
        }
      : null,
  ].filter((column) => column !== null);

  if (columns.length === 0) return null;

  return (
    /*
      Capped, so the two sit near each other.

      Across the full wide container each column was some 660px holding one
      word and a link, and the pair read as two things at opposite ends of the
      screen rather than as a choice between them. 58rem centres the pair
      under its heading instead of leaving it hanging off the left margin, and
      is the width the longer of the two asks needs to stay on one line:
      "Consultar por la obra original" is 30 uppercase characters at 0.24em of
      tracking inside a framed button, about 360px, so each column has to
      clear that with room to spare or the label breaks in two — which is what
      it was doing. At 58rem each is roughly 416px.

      Each column centres its own contents, so the eyebrow, the state and the
      ask sit on one axis and the two columns mirror each other.

      Stacked on a phone the same applies vertically: gap-lg rather than
      gap-xl, so the two options read as a pair rather than as two sections
      that happen to follow each other. Each keeps its rule, which is what
      separates them.
    */
    <div className="mx-auto grid max-w-[58rem] gap-lg md:grid-cols-2 md:gap-x-2xl">
      {columns.map((column, index) => (
        <Reveal key={column.key} delay={index * 90}>
          <div className="flex h-full flex-col items-center border-t border-rule pt-lg text-center">
            <Eyebrow>{column.eyebrow}</Eyebrow>

            <p className="mt-md font-serif text-xl font-light leading-tight text-fg-strong">
              {column.state}
            </p>

            {column.action ? (
              /* mt-auto so both buttons sit on one line when the states wrap
                 to different heights. */
              <div className="mt-lg pt-2xs md:mt-auto">
                {/*
                  One line. "Consultar por la obra original" was breaking over
                  two inside the frame, which turns a quiet button into a
                  paragraph with a border around it. The columns split at `md`
                  rather than `sm` for the same reason: at 640px each half is
                  narrower than the label, so `sm` only moved the wrap.
                */}
                <ActionButton
                  href={column.action.href}
                  /*
                    From `md` only. Stacked on a phone the column is whatever
                    the screen gives it, and on a narrow one that is less than
                    the button needs — `nowrap` there would push the page
                    sideways rather than break a line, which is the worse of
                    the two.
                  */
                  className="md:whitespace-nowrap"
                >
                  {column.action.label}
                </ActionButton>
              </div>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
