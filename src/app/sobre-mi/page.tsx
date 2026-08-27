import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { ProseSection } from "@/components/blocks/ProseSection";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoPlayer } from "@/components/primitives/VideoPlayer";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow, Prose, PullQuote } from "@/components/primitives/Type";
import { getAboutPage, getHome } from "@/lib/content";
import { withEmphasis } from "@/lib/emphasis";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "El arte se convirtió en mi profesión, pero también en una manera de mirar. Formación, recorrido y por qué el carboncillo.",
};

/**
 * /sobre-mi
 *
 * Four movements: who she is, how she looks, what she works with, how she
 * works. The process section carries the `#proceso` anchor that the home and
 * the charcoal section link to — see docs/PROJECT_CONTEXT.md §7 for why it
 * lives here instead of on a page of its own.
 *
 */
export default async function AboutPage() {
  const [page, home] = await Promise.all([getAboutPage(), getHome()]);

  return (
    <>
      <PageHeader heading={page.heading} />

      {/* Who she is, next to the portrait. */}
      <Section ground="paper" rhythm="tight" aria-labelledby="recorrido-titulo">
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:items-start lg:gap-x-[5vw]">
            <div className="lg:col-span-5">
              <Reveal variant="image">
                <Figure
                  src="/estudio/mariela-retrato.jpg"
                  alt="Mariela Crapuzzi en su estudio, firmando el certificado de autenticidad de una obra, rodeada de estanterías con plantas y materiales de dibujo."
                  pendingLabel="Retrato de Mariela"
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Display
                  as="h2"
                  size="section"
                  id="recorrido-titulo"
                  /* Light, like every other display heading. It was set at
                     normal weight to lift it off the paragraph, but size
                     already does that and the extra weight read as bold. */
                >
                  {withEmphasis("*Mariela Crapuzzi*")}
                </Display>
              </Reveal>

              <Reveal delay={120} className="mt-lg">
                <Prose paragraphs={page.intro} lead />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* How she looks — the reasoning the home only hints at. */}
      <Section
        ground="paper-bright"
        rhythm="act"
        aria-labelledby="mirada-titulo"
      >
        <Container width="wide">
          <div className="grid gap-2xl lg:grid-cols-12 lg:gap-x-[4vw]">
            <div className="lg:col-span-5">
              {page.statement.eyebrow ? (
                <Reveal>
                  <Eyebrow>{page.statement.eyebrow}</Eyebrow>
                </Reveal>
              ) : null}

              <Reveal delay={90} className="mt-lg">
                <Display id="mirada-titulo">
                  {page.statement.titleLines.map((line, i) => (
                    <span key={i} className="block">
                      {withEmphasis(line)}
                    </span>
                  ))}
                </Display>
              </Reveal>

              <Rule width="short" className="mt-lg-plus" />

              <Reveal delay={180} className="mt-lg">
                <PullQuote>{page.statement.pullQuote}</PullQuote>
              </Reveal>
            </div>

            <div className="flex flex-col lg:col-span-6 lg:col-start-7">
              {/*
                On a phone the picture comes first, right under the sentence
                that ends the left column, and the reasoning follows it. On a
                wide screen the reasoning sits beside the heading and the
                picture closes the section — order swaps, markup does not.
              */}
              <Reveal variant="image" className="order-first lg:order-last lg:mt-xl">
                <Figure
                  src="/estudio/mariela-trabajando.jpg"
                  alt="Mariela Crapuzzi trabajando de pie frente a un tablero, con un carboncillo en la mano enguantada, sobre el dibujo de un caballo al galope."
                  pendingLabel=""
                  aspect="aspect-[3/2]"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  caption="En el estudio, sobre «Toro Salvaje»."
                />
              </Reveal>

              <Reveal delay={90} className="mt-xl lg:mt-0">
                <Prose paragraphs={page.statement.paragraphs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* What she works with. */}
      {/*
        The video belongs to the reading column, not to the page: centred
        under both columns it left the sticky heading nothing to travel
        beside, and read as a separate section rather than as the evidence
        for the paragraph above it.
      */}
      <ProseSection
        block={page.language}
        ground="chamber"
        headingId="lenguaje-titulo"
        aside={
          page.languageVideo ? (
            <Reveal variant="image">
              <VideoPlayer
                src={page.languageVideo.src}
                poster={page.languageVideo.poster}
                label={page.languageVideo.label}
                caption={page.languageVideo.caption}
                aspect={
                  page.languageVideo.portrait
                    ? "aspect-[9/16] sm:aspect-[3/4]"
                    : "aspect-video"
                }
                className="max-w-[26rem] sm:max-w-[30rem]"
              />
            </Reveal>
          ) : null
        }
      />

      {/*
        The four cards are gone. "La emoción como materia", "Más allá de lo
        visible", "Por qué el carboncillo" and "El realismo como medio" each
        restated, in a heading and a paragraph, something the running text
        above them had already said — the brief calls it out as duplication
        and keeps the prose.
      */}

      <ContactCallout content={home.contact} />
    </>
  );
}
