import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Reveal } from "@/components/primitives/Reveal";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { WorkComposition } from "@/components/work/WorkComposition";
import { ContactForm } from "@/components/contact/ContactForm";
import { WorkAvailability } from "@/components/work/WorkAvailability";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkSheet } from "@/components/work/WorkSheet";
import { hasAvailabilityBlock, shapeEnquiry } from "@/lib/work-availability";
import { cn } from "@/lib/cn";
import {
  getAvailabilityForm,
  getEditorialWorks,
  getWork,
  getWorkNeighbours,
} from "@/lib/content";
import { withEmphasis } from "@/lib/emphasis";

/**
 * The commission, offered as itself.
 *
 * It closes a page where nothing can be bought, and follows the enquiry form
 * on a page where something can — the same two links either way, so a reader
 * who wants a piece made never has to work out that the route exists.
 *
 * "Ver otras obras" is not decoration. Someone who reached a work that is gone
 * should be able to keep looking rather than choose between commissioning
 * something and the back button.
 */
function CommissionClose({
  headingId,
  title,
  className,
}: {
  headingId: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-lg lg:grid-cols-12 lg:items-end lg:gap-x-[4vw]",
        className,
      )}
    >
      <div className="lg:col-span-6">
        <Reveal>
          <Display id={headingId} measure={20}>
            {withEmphasis(title)}
          </Display>
        </Reveal>

        <Reveal delay={90} className="mt-lg">
          <p className="max-w-[46ch] font-sans text-base leading-relaxed text-pretty text-fg">
            Puedo crear una pieza a partir de tu propia historia, una imagen o
            un vínculo.
          </p>
        </Reveal>
      </div>

      <Reveal
        delay={150}
        className="flex flex-wrap items-center gap-x-xl gap-y-md lg:col-span-5 lg:col-start-8 lg:justify-end"
      >
        <ActionButton href="/encargos#cotizar">Quiero un encargo</ActionButton>
        <QuietLink href="/obra">Ver otras obras</QuietLink>
      </Reveal>
    </div>
  );
}

export async function generateStaticParams() {
  const works = await getEditorialWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/obra/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work) return {};

  return { title: work.title, description: work.shortStory };
}

/**
 * /obra/[slug] — one editorial page, three works, one system.
 *
 *   banner + name
 *   the work, with its sentence and its sheet beside it
 *   the composition          ← everything below here is data
 *   the edition, if there is one
 *   the ask
 *   the two pieces either side
 *
 * What changed: the body used to be a fixed run of sections — story, details,
 * framed, process, sheet — so every work arrived in the same order at the same
 * size whatever it had to show. A piece with one photograph and a piece with
 * seven were laid out identically, which is why the pages read as a template.
 *
 * Now the body is a sequence each work declares for itself. See WorkBlock in
 * content/types.ts for the shape and WorkComposition for what renders it. The
 * three pages share every component and differ only in that list, which is
 * what lets El Rescate be two violent plates and Sueño de Primavera a quiet
 * run of four without either being written by hand.
 *
 * Nothing is invented to fill a gap, and nothing announces the gap either. El
 * Rescate has no year, technique or dimensions because the piece is
 * unfinished, so those rows simply do not appear.
 */
export default async function WorkPage({ params }: PageProps<"/obra/[slug]">) {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work || !work.hasEditorialPage) notFound();

  const { previous, next } = await getWorkNeighbours(slug);
  /*
    The enquiry form, cut down to what this work has. See `shapeEnquiry`:
    Sueño de Primavera's original is in a private collection, so its dropdown
    offers the print and nothing else it cannot honour.
  */
  const enquiry = shapeEnquiry(await getAvailabilityForm(), work);

  /*
    Whether anything on this page can actually be had.

    El Rescate — the original and its edition — and the last copy of Sueño de
    Primavera's. Every other piece is a delivered commission in a private
    collection. Offering "Consultar obra" on all of them invited an enquiry
    that could only be answered with no — worse than silence, because the
    button implied otherwise.
  */
  const forSale = work.status === "available" || work.prints === "available";

  /*
    Where the two states are set out in their own block, that block owns the
    asks: the cover drops the status from beside the title, the sheet drops
    its rows and buttons, and the closing carries the commission on its own.
  */
  const availability = hasAvailabilityBlock(work);

  /*
    Three ways of not being for sale, and they do not read the same.

    A delivered commission is gone — "ya no está disponible" is true and
    useful. A piece still being drawn was never available, so saying it no
    longer is would be a small lie about something that does not exist yet.
    And a work with no status at all says nothing about itself either way.
    The last two close on the invitation alone.
  */
  const gone =
    !forSale && Boolean(work.status) && work.status !== "in-progress";

  return (
    <>
      <WorkHero work={work} />

      {/*
        The work and its label, side by side, directly under the banner.

        This replaces a sentence alone across the page, then a tall portrait
        plate alone on its screen, then the specification a long way below —
        three separate movements for the three things a reader wants at once.
        See WorkSheet.
      */}
      <Section
        ground="paper"
        rhythm="beat"
        aria-labelledby="obra-ficha-titulo"
        /* The plate bleeds and its reveal opens from scale 1.03 — see below. */
        className="overflow-hidden"
      >
        {/*
          No Container: the plate runs to the left edge of the screen. See
          WorkSheet — inside the 90rem column it came out at 43% of a 1920
          screen, which is what made the drawing read small.
        */}
        <h2 id="obra-ficha-titulo" className="sr-only">
          La obra y su ficha técnica
        </h2>

        <WorkSheet work={work} />
      </Section>

      {/*
        The composition. Everything here comes from the work's own story.

        `pb-lg` on a phone: at py-2xl the last block — a video, on El Rescate —
        was followed by nearly two hundred pixels of nothing before the closing
        question, which reads as a section that failed to load rather than as
        breathing room. The wide layout keeps its own rhythm.
      */}
      {work.story && work.story.length > 0 ? (
        <Section
          ground="paper"
          rhythm="tight"
          className="overflow-hidden pb-lg sm:pb-2xl"
        >
          <WorkComposition blocks={work.story} />
        </Section>
      ) : null}

      {/*
        What can be had, where anything can.

        After the work and its writing, before the form, and before the
        commission: the three actions a reader might take, each stated once
        and in the order they would consider them — this piece, a print of it,
        or something made for them.
      */}
      {availability ? (
        <Section
          ground="paper"
          rhythm="beat"
          id="disponibilidad"
          aria-labelledby="disponibilidad-titulo"
        >
          <Container width="wide">
            <Reveal>
              {/* Centred, because the two columns under it are. */}
              <Display
                id="disponibilidad-titulo"
                measure={18}
                className="mx-auto text-center"
              >
                {withEmphasis("*Disponibilidad*")}
              </Display>
            </Reveal>

            <div className="mt-2xl">
              <WorkAvailability work={work} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/*
        The edition, where one exists.

        Structurally separate from the original, per the technical sheet: the
        original is in a private collection and the edition is what can still
        be acquired. The page has to make that difference unmistakable without
        turning into a shop.
      */}
      {work.printEdition ? (
        <Section ground="chamber" rhythm="act" aria-labelledby="edicion-titulo">
          <Container width="wide">
            <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
              <div className="lg:col-span-4">
                <Reveal>
                  <Eyebrow>{work.printEdition.eyebrow}</Eyebrow>
                </Reveal>

                <Reveal delay={90} className="mt-lg">
                  <Display id="edicion-titulo" measure={18}>
                    {work.printEdition.title}
                  </Display>
                </Reveal>

                {/*
                  The price, where there is one, above what is left of the
                  edition — the two facts a reader is looking for, in the order
                  they ask them. Serif and at display weight because it is the
                  one number on the page, and the caveats sit under it in the
                  quiet register so the figure is not read as the total.
                */}
                {work.printEdition.price ? (
                  <Reveal delay={150} className="mt-lg">
                    <p className="font-serif text-2xl font-light leading-none text-fg-strong">
                      {work.printEdition.price.amount}
                    </p>
                    {work.printEdition.price.notes.map((note) => (
                      <p
                        key={note}
                        className="mt-2xs max-w-[36ch] font-sans text-xs leading-relaxed text-pretty text-fg-muted"
                      >
                        {note}
                      </p>
                    ))}
                  </Reveal>
                ) : null}

                <Reveal delay={180} className="mt-lg">
                  <p className="font-sans text-sm text-fg-muted">
                    {work.printEdition.availability}
                  </p>
                </Reveal>

                {/*
                  The ask for the edition, inside the edition's own block and
                  directly under what is left of it. The page closes on
                  "Consultar obra" further down, which is about the original —
                  and the original is in a private collection. Without this,
                  the one thing on the page that can actually be acquired had
                  no way to be asked for. It was already in the data and simply
                  was not being rendered.
                */}
                <Reveal delay={240} className="mt-xl">
                  <ActionButton href={work.printEdition.action.href}>
                    {work.printEdition.action.label}
                  </ActionButton>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={120}>
                  <ul className="flex flex-col">
                    {work.printEdition.specs.map((spec) => (
                      <li
                        key={spec}
                        className="border-t border-rule py-md font-sans text-base leading-relaxed text-pretty text-fg last:border-b"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={180} className="mt-xl">
                  <h3 className="font-sans text-2xs font-medium uppercase tracking-label text-fg-muted">
                    {work.printEdition.details.label}
                  </h3>
                  <p className="mt-sm max-w-[62ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                    {work.printEdition.details.body}
                  </p>
                </Reveal>

                <Reveal delay={240} className="mt-lg">
                  <h3 className="font-sans text-2xs font-medium uppercase tracking-label text-fg-muted">
                    {work.printEdition.delivery.label}
                  </h3>
                  <div className="mt-sm flex flex-col gap-2xs">
                    {work.printEdition.delivery.lines.map((line) => (
                      <p
                        key={line}
                        className="max-w-[62ch] font-sans text-sm leading-relaxed text-pretty text-fg"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/*
        The ask.

        A form where something can be bought, and a single quiet route to the
        commission where nothing can. See `forSale` above: the work decides
        which of the two it gets, so this never has to be maintained by hand.

        It used to be "Consultar obra" pointing at /encargos — which asks what
        you want *made*: a format, references, a description of a piece that
        does not exist. Someone looking at a finished drawing is asking the
        opposite question, whether this one or a print of it can still be had,
        and was being made to fill in "Formato deseado" for a work whose
        dimensions were printed on the same screen.

        Four fields, on the piece's own page, with the title travelling in the
        payload so nobody has to type it and Mariela never has to guess which
        work an enquiry is about. The commission keeps its own form and sits
        underneath as the quieter second route.
      */}
      <Section
        ground="paper"
        rhythm="act"
        id="consultar"
        aria-labelledby="consulta-titulo"
        /* The other half of the same gap — see the note above. */
        className="pt-lg sm:pt-4xl"
      >
        {/*
          The two hash targets. Empty spans rather than ids on the section
          itself, because one element cannot answer to two anchors — and both
          have to land in the same place, since there is one form.

          In flow, and not `sr-only`. That utility positions absolutely and
          clips to a pixel, which takes the target out of the document flow —
          so the browser had no reliable offset to scroll to and the buttons
          set the hash without moving the page. A zero-height block is
          invisible in exactly the same way and stays where it is.

          `scroll-mt-28` clears the fixed header, which is 4rem on a phone and
          5rem from `md`; without it the form's heading lands underneath it.
        */}
        <span id="consultar-original" aria-hidden="true" className="block h-0 scroll-mt-28" />
        <span id="consultar-print" aria-hidden="true" className="block h-0 scroll-mt-28" />

        <Container width="wide">
          <Rule width="full" />

          {forSale ? (
            <div className="mt-2xl grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
              <div className="lg:col-span-4">
                <Reveal>
                  <Display id="consulta-titulo" measure={18}>
                    {withEmphasis(enquiry.heading.title)}
                  </Display>
                </Reveal>

                <Reveal delay={90} className="mt-lg">
                  <p className="max-w-[42ch] font-sans text-base leading-relaxed text-pretty text-fg">
                    {enquiry.paragraphs[0]}
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={120}>
                  {/*
                    One form, and the hash answers its first question.

                    Both asks land here — the anchors above sit at the head of
                    this section — and the option the reader pressed arrives
                    already chosen. The select stays on screen rather than
                    disappearing: it shows what the page understood, and it can
                    be changed by someone who pressed the wrong one.
                  */}
                  <ContactForm
                    page={enquiry}
                    supplied={{ obra: work.title }}
                    hashDefaults={{
                      field: "interes",
                      map: {
                        "consultar-original": "La obra original",
                        "consultar-print": "Un print de la obra",
                      },
                    }}
                  />
                </Reveal>
              </div>
            </div>
          ) : (
            /*
              Nothing to sell here, so nothing is offered. The page closes on
              the one thing that is genuinely available — a piece made to
              order — rather than leaving a reader to work out from a technical
              sheet that the button leads nowhere. What it says depends on
              which kind of unavailable this is; see `gone` above.
            */
            <CommissionClose
              headingId="consulta-titulo"
              title={
                gone
                  ? "Esta obra ya no está *disponible*."
                  : "¿Quieres una obra por *encargo*?"
              }
              className="mt-2xl"
            />
          )}
        </Container>
      </Section>

      {/*
        The third ask, and the last.

        Where the work is for sale the closing above is a form about *this*
        piece, so the commission needs a block of its own rather than a line
        inside someone else's. Three routes, each stated once: the original,
        a print of it, and a drawing made from your own story.
      */}
      {forSale ? (
        <Section ground="paper" rhythm="beat" aria-labelledby="encargo-titulo">
          <Container width="wide">
            <Rule width="full" />
            <CommissionClose
              headingId="encargo-titulo"
              title="¿Quieres una obra por *encargo*?"
              className="mt-2xl"
            />
          </Container>
        </Section>
      ) : null}

      {/* The two pieces either side, in the flagship sequence. */}
      {previous || next ? (
        <Section
          /*
            Chamber, not paper-bright. Against the paper of the section above
            it, `paper-bright` is a two-per-cent difference — the two blocks
            read as one long block with two headings in it, and the step from
            the closing question to the next work was invisible. The dark
            ground makes the page's last movement its own.
          */
          ground="chamber"
          rhythm="beat"
          aria-labelledby="alrededor-titulo"
        >
          <Container width="wide">
            <h2 id="alrededor-titulo" className="sr-only">
              Otras obras destacadas
            </h2>

            {/*
              A rule above the pair, and the pair on one row at every width.

              The footer is chamber too, so this block ran straight into it —
              two dark bands with no seam, and the last movement of the page
              read as the first line of the footer. The hairline is the same
              mark used everywhere else and it is all that is needed to say
              where the page ends.

              Two halves of a row from `sm`, one under the other below it.

              Side by side on a phone each title had about 165px — "Sueño de
              Primavera" needs nearer 180 — so both broke mid-name and the two
              blocks read as one pushed into each corner. Stacked, each gets
              the full width and sets on one line, with the second carrying its
              own hairline so the pair still reads as two steps rather than a
              list. The desktop row is unchanged.
            */}
            <div className="flex flex-col gap-lg border-t border-rule pt-xl sm:flex-row sm:items-baseline sm:justify-between sm:gap-lg">
              {previous ? (
                <Neighbour work={previous} direction="previous" />
              ) : (
                /* Holds the left half so a lone "next" keeps the right edge. */
                <span className="hidden min-w-0 sm:block sm:flex-1" />
              )}
              {next ? (
                <Neighbour
                  work={next}
                  direction="next"
                  /* The seam between them, on a phone only. */
                  className={previous ? "border-t border-rule pt-lg sm:border-t-0 sm:pt-0" : undefined}
                />
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

/* ---------------------------------------------------------------------- */

/**
 * One step through the sequence.
 *
 * Minimal by instruction: a label, a title and an arrow that travels. The
 * arrow mirrors for "anterior" rather than getting an icon of its own — one
 * drawn mark, used twice, reads as a pair.
 */
function Neighbour({
  work,
  direction,
  className,
}: {
  work: { slug: string; title: string };
  direction: "previous" | "next";
  className?: string;
}) {
  const back = direction === "previous";

  return (
    <Reveal
      delay={back ? 0 : 90}
      /* Full width stacked on a phone; half the row each from `sm`, so a long
         title wraps inside its own side instead of crowding the other one. */
      className={cn("min-w-0 sm:flex-1", !back && "sm:text-right", className)}
    >
      <Link href={`/obra/${work.slug}`} className="group inline-flex flex-col">
        <span
          className={cn(
            /* `fg-strong`, not `fg-muted`: white at 95% against 55%. At 2xs,
               uppercase and tracked out, the muted tone was the faintest mark
               on the page and the label read as disabled rather than quiet. */
            "flex items-center gap-2xs font-sans text-2xs font-medium uppercase tracking-label text-fg-strong",
            /* Both read from the left while stacked; the arrow only swaps
               sides once the two share a row. */
            !back && "sm:justify-end",
          )}
        >
          {back ? (
            <ArrowRightIcon
              width={13}
              height={13}
              className="shrink-0 rotate-180 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          ) : null}
          {back ? "Obra anterior" : "Obra siguiente"}
          {back ? null : (
            <ArrowRightIcon
              width={13}
              height={13}
              className="shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          )}
        </span>

        <span className="mt-2xs font-serif text-xl font-light leading-tight tracking-tight text-fg-strong transition-opacity duration-500 group-hover:opacity-60 md:text-2xl">
          {work.title}
        </span>
      </Link>
    </Reveal>
  );
}
