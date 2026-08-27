import type { Metadata } from "next";
import { Commissions } from "@/components/blocks/Commissions";
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
  title: "Sobre Mariela",
  description:
    "Artista boliviana dedicada al realismo figurativo contemporáneo. Formación, recorrido y por qué el carboncillo.",
};

/**
 * /sobre-mi — three movements: who she is, how she works, why charcoal.
 *
 * It was four. The one that went was a run of cards restating, as four
 * headings, what the paragraphs on either side of them already said — see the
 * note in content/pages/about.ts.
 *
 * The charcoal section carries the `#proceso` anchor the rest of the site
 * points at.
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
                {/*
                  Her real portrait, and the frame it was photographed in.
                  It was forced into `aspect-[3/4]`, which cut 480px off a
                  1079 x 1920 file — her hands and the certificate she is
                  signing went with it, and the certificate is the reason the
                  photograph is worth showing. The picture keeps its own
                  proportion now, like every artwork on the site.
                */}
                <Figure
                  src="/estudio/mariela-retrato.jpg"
                  alt="Mariela Crapuzzi en su estudio, firmando el certificado de autenticidad de una obra, rodeada de estanterías con plantas y materiales de dibujo."
                  pendingLabel="Retrato de Mariela"
                  aspect="aspect-[1079/1920]"
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
        id="proceso"
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

      {/* How she works. The anchor the whole site links to. */}
      {/*
        The four "La mirada" cards are gone. They restated, in four headings,
        exactly what the prose above already says — the emotion as material,
        what lies beyond the visible, why charcoal, realism as a means. The
        paragraphs are Mariela's approved text; the cards were a second telling
        of it, and the page read as if it did not trust its own writing.

        The #proceso anchor moves to the charcoal section, which is what the
        rest of the site was pointing at anyway.
      */}

      {/*
        Closes on the commission, like every other page. It used to close on a
        contact callout, which asked a second question directly after the one
        the page had been building towards.
      */}
      <Commissions content={home.commissions} ground="paper" />
    </>
  );
}
