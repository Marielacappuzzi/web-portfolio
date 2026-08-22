import type { Metadata } from "next";
import { ContactCallout } from "@/components/blocks/ContactCallout";
import { ProcessList } from "@/components/blocks/ProcessList";
import { ProseSection } from "@/components/blocks/ProseSection";
import { Container, Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Figure } from "@/components/primitives/Figure";
import { Reveal } from "@/components/primitives/Reveal";
import { SilentVideo } from "@/components/primitives/SilentVideo";
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
      <Section ground="paper" rhythm="beat" aria-labelledby="recorrido-titulo">
        <Container width="wide">
          <h2 id="recorrido-titulo" className="sr-only">
            Recorrido
          </h2>

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

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <Prose paragraphs={page.intro} lead />
            </Reveal>
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
              <Reveal>
                <Eyebrow>{page.statement.eyebrow}</Eyebrow>
              </Reveal>

              <Reveal delay={90} className="mt-lg">
                <Display id="mirada-titulo">
                  {page.statement.titleLines.map((line, i) => (
                    <span key={i} className="block">
                      {withEmphasis(line)}
                    </span>
                  ))}
                </Display>
              </Reveal>

              <Rule width="short" className="mt-xl" />

              <Reveal delay={180} className="mt-lg">
                <PullQuote>{page.statement.pullQuote}</PullQuote>
              </Reveal>
            </div>

            <Reveal delay={90} className="lg:col-span-6 lg:col-start-7">
              <Prose paragraphs={page.statement.paragraphs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What she works with. */}
      <ProseSection
        block={page.language}
        ground="chamber"
        headingId="lenguaje-titulo"
      />

      {page.languageVideo ? (
        <Section ground="chamber" rhythm="none" className="pb-4xl">
          <Container width="wide">
            <Reveal variant="image">
              <SilentVideo
                youtubeId={page.languageVideo.youtubeId}
                src={page.languageVideo.src}
                poster={page.languageVideo.poster}
                label={page.languageVideo.label}
                caption={page.languageVideo.caption}
                aspect={
                  page.languageVideo.portrait
                    ? "aspect-[9/16] sm:aspect-[3/4]"
                    : "aspect-video"
                }
                className="mx-auto max-w-[26rem] sm:max-w-[30rem]"
              />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/*
        Mariela at the board, mid-piece. It sits between the material and the
        method because it is the evidence for both — and because the brief asks
        that she be present without the page becoming a personal-brand shoot.
      */}
      <Section ground="paper" rhythm="none" className="pt-3xl">
        <Container width="wide">
          <Reveal variant="image">
            <Figure
              src="/estudio/mariela-trabajando.jpg"
              alt="Mariela Crapuzzi trabajando de pie frente a un tablero, con un carboncillo en la mano enguantada, sobre el dibujo de un caballo al galope."
              pendingLabel=""
              aspect="aspect-[3/2]"
              sizes="(min-width: 1024px) 90vw, 100vw"
              caption="En el estudio, sobre «Toro Salvaje»."
            />
          </Reveal>
        </Container>
      </Section>

      {/* How she works. The anchor the whole site links to. */}
      <ProcessList
        block={page.process}
        id="proceso"
        headingId="proceso-titulo"
      />

      <ContactCallout content={home.contact} />
    </>
  );
}
