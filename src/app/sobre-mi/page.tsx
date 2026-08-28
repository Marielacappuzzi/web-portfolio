import type { Metadata } from "next";
import { AboutBanner } from "@/components/about/AboutBanner";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { ProseSection } from "@/components/blocks/ProseSection";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoPlayer } from "@/components/primitives/VideoPlayer";
import { Rule } from "@/components/primitives/Rule";
import { Display, Eyebrow, Prose, PullQuote } from "@/components/primitives/Type";
import { getAboutPage } from "@/lib/content";
import { withEmphasis } from "@/lib/emphasis";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "El arte se convirtió en mi profesión, pero también en una manera de mirar. Formación, recorrido y por qué el carboncillo.",
};

/**
 * /sobre-mi — four blocks, and Mariela introduced exactly once.
 *
 *   1. the editorial opening      LA ARTISTA + the sentence
 *   2. the banner                 her name, her specialty, the biography
 *   3. Mi manera de mirar         how she works
 *   4. El lenguaje                why charcoal
 *   5. the close                  the work, and the way to ask for one
 *
 * What went: a portrait beside a heading carrying her name beside a paragraph
 * of biography — a second introduction, a screen after the first, saying the
 * same thing. The banner does all of it now and does it better, because the
 * photograph was composed with the space for the words already in it.
 *
 * Also gone: every mention of a specific work. Bouguereau, the first
 * large-format piece and the exhibition attached to it were facts about Sueño
 * de Primavera being told on the page about Mariela.
 */
export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <>
      <PageHeader heading={page.heading} />

      {/*
        The one presentation of Mariela: photograph, name, specialty and the
        biography, in a single full-width frame. See AboutBanner.
      */}
      <AboutBanner banner={page.banner} />

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
                {/*
                  A different photograph. `mariela-trabajando.jpg` is the one
                  the home already uses in its artist block, so the same frame
                  was appearing twice in a single visit — and on this page it
                  followed a banner of her a screen earlier, which made three
                  pictures of the same person in a row.

                  This one documents the thing the section is about: the
                  lioness resolved, the cub still a contour, her gloved hand
                  on the charcoal. Portrait, so it keeps a portrait frame —
                  forced into 3/2 it lost both the drawing and the hand.
                */}
                <Figure
                  src="/obra/bajo-su-proteccion/extra-05.jpg"
                  alt="La mano enguantada de Mariela Crapuzzi trabajando con carboncillo sobre el dibujo de una leona ya resuelta, mientras la cría es todavía un trazo de contorno."
                  pendingLabel=""
                  aspect="aspect-[4/5]"
                  focus="50% 45%"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  caption="La leona resuelta; la cría, aún en contorno."
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

      {/*
        The close. It used to be the commissions pitch — "Cuéntame la historia
        que te gustaría convertir en una obra", with "Contar mi historia"
        beside it — at the foot of the page that is not about commissions.
        Someone who has just read about the artist wants to see the work.

        `id` is passed because ContactCallout defaults to "contacto", and this
        block is not a contact section.
      */}
      <ContactCallout
        content={page.closing}
        id="conocer-la-obra"
        headingId="cierre-sobre-mi"
      />
    </>
  );
}
