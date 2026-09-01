import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Reveal } from "@/components/primitives/Reveal";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow } from "@/components/primitives/Type";
import { WorkComposition } from "@/components/work/WorkComposition";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkSheet } from "@/components/work/WorkSheet";
import { cn } from "@/lib/cn";
import {
  getAvailabilityForm,
  getEditorialWorks,
  getWork,
  getWorkNeighbours,
} from "@/lib/content";
import { withEmphasis } from "@/lib/emphasis";

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
 * Nothing is invented to fill a gap. El Rescate has no year, technique or
 * dimensions because the piece is unfinished, and its sheet says so with a
 * declared marker rather than a plausible guess.
 */
export default async function WorkPage({ params }: PageProps<"/obra/[slug]">) {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work || !work.hasEditorialPage) notFound();

  const { previous, next } = await getWorkNeighbours(slug);
  const enquiry = await getAvailabilityForm();

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
        The ask, and it is a form rather than a link out.

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
        aria-labelledby="consulta-titulo"
        /* The other half of the same gap — see the note above. */
        className="pt-lg sm:pt-4xl"
      >
        <Container width="wide">
          <Rule width="full" />

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

              {/*
                The other route, kept quiet and kept separate. A reader who
                wants a piece made is not the reader this form is for, and the
                two asks should not compete at the same weight.
              */}
              <Reveal delay={150} className="mt-2xl border-t border-rule pt-lg">
                <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-pretty text-fg-muted">
                  ¿Prefieres una obra creada para ti? Los encargos tienen su
                  propio formulario.
                </p>
                <QuietLink href="/encargos#cotizar" className="mt-md">
                  Quiero un encargo
                </QuietLink>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={120}>
                <ContactForm page={enquiry} supplied={{ obra: work.title }} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

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

              One row on a phone as well: stacked, the two titles sat directly
              above the footer's own links in a single column and the whole
              foot became one list. `gap-md` and a `basis-0` split give each
              side half the width minus the gap; the titles wrap inside their
              own half rather than pushing the other one off the screen.
            */}
            <div className="flex flex-row items-baseline justify-between gap-md border-t border-rule pt-xl sm:gap-lg">
              {previous ? (
                <Neighbour work={previous} direction="previous" />
              ) : (
                <span className="min-w-0 flex-1" />
              )}
              {next ? <Neighbour work={next} direction="next" /> : null}
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
}: {
  work: { slug: string; title: string };
  direction: "previous" | "next";
}) {
  const back = direction === "previous";

  return (
    <Reveal
      delay={back ? 0 : 90}
      /* Half the row each, so a long title wraps inside its own side
         instead of crowding the other one off a narrow screen. */
      className={cn("min-w-0 flex-1", !back && "text-right")}
    >
      <Link href={`/obra/${work.slug}`} className="group inline-flex flex-col">
        <span
          className={cn(
            /* `fg-strong`, not `fg-muted`: white at 95% against 55%. At 2xs,
               uppercase and tracked out, the muted tone was the faintest mark
               on the page and the label read as disabled rather than quiet. */
            "flex items-center gap-2xs font-sans text-2xs font-medium uppercase tracking-label text-fg-strong",
            !back && "justify-end",
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
