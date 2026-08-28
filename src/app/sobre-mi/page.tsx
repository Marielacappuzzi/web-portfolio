import type { Metadata } from "next";
import { AboutBanner } from "@/components/about/AboutBanner";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { ProseSection } from "@/components/blocks/ProseSection";
import { Section } from "@/components/layout/Section";
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

      {/*
        How she looks — the reasoning the home only hints at.

        Text left, photograph right, and the photograph takes the whole right
        side rather than a column inside the grid: five of twelve for the
        words, seven for the picture, running out to the edge of the screen.
        It was a 5/6 split with the image matted inside its own column, which
        made the one document of her working the smallest thing in the block.

        The section drops its gutter and the text column carries its own, so
        the picture can reach the right edge without the words losing the
        page's axis.
      */}
      <Section
        ground="paper-bright"
        rhythm="act"
        aria-labelledby="mirada-titulo"
      >
        <div className="grid gap-2xl lg:grid-cols-12 lg:items-center lg:gap-x-[3vw]">
          <div className="gutter lg:col-span-5 lg:ml-auto lg:w-full lg:max-w-[38rem] lg:pr-0">
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

            <Reveal delay={240} className="mt-xl">
              <Prose paragraphs={page.statement.paragraphs} />
            </Reveal>
          </div>

          {/*
            Full width on a phone, and no passepartout: `bare` drops the mat,
            which was holding a document of her hand at work inside a framed
            box with margins on both sides. Here the photograph is the block.
          */}
          <Reveal variant="image" className="lg:col-span-7">
            <Figure
              src="/obra/bajo-su-proteccion/extra-05.jpg"
              alt="La mano enguantada de Mariela Crapuzzi trabajando con carboncillo sobre el dibujo de una leona ya resuelta, mientras la cría es todavía un trazo de contorno."
              pendingLabel=""
              aspect="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
              focus="50% 42%"
              sizes="(min-width: 1024px) 58vw, 100vw"
              bare
            />
          </Reveal>
        </div>
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
