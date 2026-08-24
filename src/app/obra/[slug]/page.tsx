import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout/Section";
import { CoverImage } from "@/components/home/CoverImage";
import { Badge } from "@/components/primitives/Badge";
import { WorkGallery } from "@/components/work/WorkGallery";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Figure } from "@/components/primitives/Figure";
import { Pending } from "@/components/primitives/Pending";
import { Reveal } from "@/components/primitives/Reveal";
import { ScrollReveal } from "@/components/primitives/ScrollReveal";
import { SilentVideo } from "@/components/primitives/SilentVideo";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow, Prose } from "@/components/primitives/Type";
import { WorkSpecs } from "@/components/work/WorkMeta";
import { getEditorialWorks, getNextWork, getWork } from "@/lib/content";

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

  return {
    title: work.title,
    description: work.shortStory,
  };
}

/**
 * /obra/[slug] — an editorial piece, not a product sheet.
 *
 * The order is deliberate and follows Yulia Bas's project pages, which open
 * with the name and a short statement and then give the rest of the page to
 * the work: concept → title → the piece, hung on chamber → the story → the
 * technical sheet, quietly, at the end → where to go next.
 *
 * The extended story, the detail crops and the process photographs do not
 * exist yet. Each renders a declared pending marker rather than being skipped
 * silently, so what the page still needs is visible while it is being built.
 */
export default async function WorkPage({ params }: PageProps<"/obra/[slug]">) {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work || !work.hasEditorialPage) notFound();

  const nextWork = await getNextWork(slug);

  return (
    <>
      {/*
        The piece as the cover: the photograph fills the band and the name is
        set over it, ranged left at the foot. Every work here is portrait, so
        the band stays taller than the home cover — a wide letterbox would cut
        the composition Mariela resolved.
      */}
      <section
        data-ground="chamber"
        aria-labelledby="obra-titulo"
        className="relative isolate text-fg"
      >
        <CoverImage
          src={work.image?.src ?? null}
          alt={work.image?.alt ?? work.title}
          focus="50% 28%"
          aspect="aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9]"
          pendingLabel={work.title}
        />

        <div className="inset-0 bg-ink pb-2xl pt-xl sm:absolute sm:flex sm:items-end sm:bg-transparent sm:pb-3xl sm:pt-0">
          <Container width="wide" className="w-full">
            <div className="max-w-[46ch]">
              {work.concept ? (
                <Reveal>
                  <Badge>{work.concept}</Badge>
                </Reveal>
              ) : null}

              <Reveal delay={120} className="mt-md">
                <Display as="h1" size="cover" id="obra-titulo" measure={20}>
                  {work.title}
                </Display>

                {/* The year sits immediately under the title, never buried in
                    the technical sheet at the foot of the page. */}
                {work.year || work.attribution ? (
                  <p className="mt-md font-sans text-sm leading-normal text-fg-muted">
                    {[work.attribution, work.year].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
              </Reveal>

              {work.shortStory ? (
                <Reveal delay={240} className="mt-lg">
                  <p className="max-w-[52ch] font-serif text-lg font-light italic leading-snug text-pretty text-fg">
                    {work.shortStory}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </div>
      </section>

      {/* The story. */}
      <Section ground="paper" rhythm="act" aria-labelledby="historia-titulo">
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
            <div className="lg:col-span-3">
              <Reveal>
                <Eyebrow as="h2" id="historia-titulo">
                  La historia
                </Eyebrow>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-6">
              {work.longStory && work.longStory.length > 0 ? (
                <Reveal>
                  <Prose paragraphs={work.longStory} lead />
                </Reveal>
              ) : (
                <Reveal>
                  <Pending kind="data" detail="Historia extendida de la obra" />
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Detail crops and process photographs render only when they exist.
        Empty plates were right while the whole catalogue was pending; now that
        most works have photographs, a visitor should not be shown scaffolding.
        What is still missing is tracked in docs/CONTENT_PENDING.md.
      */}
      {work.detailImages && work.detailImages.length > 0 ? (
        <Section
          ground="chamber"
          rhythm="act"
          aria-labelledby="detalles-titulo"
          className="overflow-hidden"
        >
          <Container width="wide">
            <Reveal>
              <Eyebrow as="h2" id="detalles-titulo">
                El detalle
              </Eyebrow>
            </Reveal>
          </Container>

          {/* Read sideways — see WorkGallery for why, and how it degrades. */}
          <div className="mt-xl">
            <WorkGallery
              images={work.detailImages}
              label={"Detalles de " + work.title}
            />
          </div>
        </Section>
      ) : null}

      {/*
        The piece on a wall. A photograph of the sheet answers what the work
        looks like; this answers how large it is and how it lives in a room,
        which is the question a visitor considering a commission actually has.
      */}
      {work.framedImages && work.framedImages.length > 0 ? (
        <Section ground="paper" rhythm="act" aria-labelledby="enmarcada-titulo">
          <Container width="wide">
            <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
              <div className="lg:col-span-3">
                <Reveal>
                  <Eyebrow as="h2" id="enmarcada-titulo">
                    En una pared
                  </Eyebrow>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 sm:gap-x-[3vw] lg:col-span-8 lg:col-start-5">
                {work.framedImages.map((image, i) => (
                  <ScrollReveal key={image.src} distance={i % 2 ? 88 : 56}>
                    <Figure
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      pendingLabel=""
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 640px) 40vw, 100vw"
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {work.processVideo || (work.processImages && work.processImages.length > 0) ? (
        <Section ground="paper" rhythm="act" aria-labelledby="proceso-obra-titulo">
          <Container width="wide">
            <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
              <div className="lg:col-span-3">
                <Reveal>
                  <Eyebrow as="h2" id="proceso-obra-titulo">
                    El proceso
                  </Eyebrow>
                </Reveal>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                {work.processVideo ? (
                  <Reveal variant="image" className="mb-2xl block">
                    <SilentVideo
                      youtubeId={work.processVideo.youtubeId}
                      src={work.processVideo.src}
                      poster={work.processVideo.poster}
                      label={work.processVideo.label}
                      caption={work.processVideo.caption}
                      aspect={
                        work.processVideo.portrait
                          ? "aspect-[9/16] sm:aspect-[3/4]"
                          : "aspect-video"
                      }
                      className="mx-auto max-w-[26rem] sm:max-w-[32rem]"
                    />
                  </Reveal>
                ) : null}

                <div className="grid grid-cols-1 gap-lg sm:grid-cols-3 sm:gap-x-[2vw]">
                  {(work.processImages ?? []).map((image, i) => (
                    <Reveal key={image.src} variant="image" delay={i * 90}>
                      <Figure
                        src={image.src}
                        alt={image.alt}
                        caption={image.caption}
                        pendingLabel=""
                        aspect="aspect-square"
                        sizes="(min-width: 640px) 28vw, 100vw"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Technical sheet — last, and quiet. */}
      <Section ground="paper" rhythm="beat" aria-labelledby="ficha-titulo">
        <Container width="wide">
          <Rule width="full" />

          <div className="mt-lg grid gap-lg lg:grid-cols-12 lg:gap-x-[4vw]">
            <div className="lg:col-span-3">
              <Reveal>
                <Eyebrow as="h2" id="ficha-titulo">
                  {work.printEdition ? "La obra original" : "Ficha técnica"}
                </Eyebrow>
              </Reveal>
            </div>

            <Reveal delay={90} className="lg:col-span-5 lg:col-start-6">
              <WorkSpecs work={work} detail="full" />
              {!work.year && !work.technique && !work.dimensions ? (
                <div className="mt-md">
                  <Pending kind="data" detail="Año, técnica y medidas" />
                </div>
              ) : null}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/*
        The available edition.
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
                  <Display id="edicion-titulo">
                    {work.printEdition.title}
                  </Display>
                </Reveal>

                <Reveal delay={180} className="mt-xl">
                  <p className="font-serif text-lg font-light italic leading-snug text-fg-strong">
                    {work.printEdition.availability}
                  </p>
                </Reveal>

                <Reveal delay={270} className="mt-xl">
                  <ActionButton href={work.printEdition.action.href}>
                    {work.printEdition.action.label}
                  </ActionButton>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                {work.printEdition.image ? (
                  <Reveal variant="image" className="mb-2xl block">
                    <Figure
                      src={work.printEdition.image.src}
                      alt={work.printEdition.image.alt}
                      pendingLabel=""
                      aspect="aspect-square"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      caption="Dentro de Santa Cruz de la Sierra, el print se entrega enmarcado."
                    />
                  </Reveal>
                ) : null}

                <Reveal>
                  <ul className="flex flex-col font-sans text-sm leading-snug text-fg">
                    {work.printEdition.specs.map((spec) => (
                      <li key={spec} className="border-t border-rule py-sm last:border-b">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={90} className="mt-xl">
                  <Eyebrow as="h3">{work.printEdition.details.label}</Eyebrow>
                  <p className="mt-md max-w-[62ch] font-sans text-sm leading-relaxed text-pretty text-fg">
                    {work.printEdition.details.body}
                  </p>
                </Reveal>

                <Reveal delay={180} className="mt-xl">
                  <Eyebrow as="h3">{work.printEdition.delivery.label}</Eyebrow>
                  <div className="mt-md flex flex-col gap-sm">
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

      {/* Where to go next. */}
      {nextWork ? (
        <Section ground="paper" rhythm="act" aria-labelledby="siguiente-titulo">
          <Container width="wide">
            <Rule width="full" />

            <Reveal className="mt-lg">
              <Eyebrow as="h2" id="siguiente-titulo">
                Obra siguiente
              </Eyebrow>
            </Reveal>

            <Reveal delay={90} className="mt-md">
              <Link
                href={`/obra/${nextWork.slug}`}
                className="group inline-block"
              >
                <Display className="transition-opacity duration-500 group-hover:opacity-60">
                  {nextWork.title}
                </Display>
              </Link>
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
