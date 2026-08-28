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
import { WorkHero } from "@/components/work/WorkHero";
import { WorkSheet } from "@/components/work/WorkSheet";
import { cn } from "@/lib/cn";
import { getEditorialWorks, getWork, getWorkNeighbours } from "@/lib/content";

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
      <Section ground="paper" rhythm="beat" aria-labelledby="obra-ficha-titulo">
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

      {/* The composition. Everything here comes from the work's own story. */}
      {work.story && work.story.length > 0 ? (
        <Section ground="paper" rhythm="tight">
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
        The ask. Two lines and two links — the page is a work, not a listing,
        and the invitation closes it rather than running through it.
      */}
      <Section ground="paper" rhythm="act" aria-labelledby="consulta-titulo">
        <Container width="wide">
          <Rule width="full" />

          <div className="mt-2xl grid gap-lg lg:grid-cols-12 lg:items-end lg:gap-x-[4vw]">
            <div className="lg:col-span-6">
              <Reveal>
                <Display id="consulta-titulo" measure={18}>
                  ¿Te interesa esta obra?
                </Display>
              </Reveal>
            </div>

            <Reveal
              delay={120}
              className="flex flex-wrap items-center gap-x-xl gap-y-md lg:col-span-5 lg:col-start-8 lg:justify-end"
            >
              <ActionButton href="/contacto">Consultar obra</ActionButton>
              <QuietLink href="/encargos">Solicitar un encargo</QuietLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The two pieces either side, in the flagship sequence. */}
      {previous || next ? (
        <Section
          ground="paper-bright"
          rhythm="beat"
          aria-labelledby="alrededor-titulo"
        >
          <Container width="wide">
            <h2 id="alrededor-titulo" className="sr-only">
              Otras obras destacadas
            </h2>

            <div className="flex flex-col gap-lg sm:flex-row sm:items-baseline sm:justify-between">
              {previous ? (
                <Neighbour work={previous} direction="previous" />
              ) : (
                <span />
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
    <Reveal delay={back ? 0 : 90} className={back ? undefined : "sm:text-right"}>
      <Link href={`/obra/${work.slug}`} className="group inline-flex flex-col">
        <span
          className={cn(
            "flex items-center gap-2xs font-sans text-2xs font-medium uppercase tracking-label text-fg-muted",
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
