import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Container, Section } from "@/components/layout/Section";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import { Display } from "@/components/primitives/Type";
import { Artist } from "@/components/home/Artist";
import { FeaturedRow } from "@/components/work/FeaturedRow";
import { FeaturedSlider } from "@/components/work/FeaturedSlider";
import { Hero } from "@/components/home/Hero";
import { getFeaturedWorks, getHome } from "@/lib/content";

/**
 * The home, as the whole journey.
 *
 *   Hero            who she is and what she does
 *   Obras           three pieces, large
 *   Sobre Mariela   the artist behind them
 *   Encargos        what can be asked for, and how
 *   Contacto        one way in
 *
 * A visitor should understand the project without leaving this page. The
 * internal routes still exist — /obra holds the full catalogue, /encargos the
 * quotation form — but nobody is made to travel between them to grasp what
 * Mariela does.
 *
 * The order is the hierarchy the brief sets: Mariela, then the work, then the
 * essentials, then the ask. Not concept, concept, concept, work, ask.
 */
export default async function HomePage() {
  const [content, featured] = await Promise.all([getHome(), getFeaturedWorks()]);

  return (
    <>
      <Hero content={content.hero} />

      {/*
        Obras — three pieces, given room. No editorial card per work: the brief
        asks for large images and fewer explanations here, and the catalogue is
        one click away.
      */}
      {/*
        Two sections, one per breakpoint, rather than one section with two
        children.

        On a phone this borrows the gallery's own treatment wholesale: the dark
        ground, the heading centred on it, and the banner beginning directly
        under the words with `fadeTop` carrying one into the other. On paper the
        heading sat on a bright page above a dark full-bleed photograph and the
        two read as unrelated things stacked; on chamber the title belongs to
        the picture it names. The wide layout is untouched — three cards on
        paper, exactly as before.

        The ground has to change on the section itself, which is what carries
        `data-ground`, so a single section cannot do both. `md:hidden` /
        `hidden md:block` rather than a conditional: this is a Server
        Component, rendered once with no idea of the viewport. CSS is what
        knows the width.
      */}
      {/*
        The anchor lives outside both sections, because only one of them exists
        at any width and an id on a `display: none` element is not a scroll
        target — the hero's "Ver obras" would have died on every wide screen.
        An empty span always in the tree is the one thing both layouts share.
      */}
      <span id="obras" aria-hidden="true" className="block scroll-mt-24" />

      <Section
        ground="chamber"
        rhythm="act"
        aria-labelledby="obras-titulo"
        className="md:hidden"
      >
        <Container width="wide">
          <Reveal>
            <Display
              as="h2"
              id="obras-titulo"
              measure={20}
              className="text-center"
            >
              Obras *destacadas*
            </Display>
          </Reveal>
        </Container>

        {/*
          `priority={false}`: on /obra the first banner opens the page, but
          here the home's own hero already holds that slot.
        */}
        <FeaturedSlider works={featured} fadeTop priority={false} className="mt-xl" />

        <Container width="wide">
          <Reveal className="mt-xl flex justify-center">
            <ActionButton href="/obra">Ver todas las obras</ActionButton>
          </Reveal>
        </Container>
      </Section>

      <Section
        ground="paper"
        rhythm="act"
        aria-labelledby="obras-titulo-md"
        className="hidden md:block"
      >
        <Container width="wide">
          <Reveal>
            <Display as="h2" id="obras-titulo-md" measure={20}>
              Obras *destacadas*
            </Display>
          </Reveal>

          <FeaturedRow works={featured} className="mt-2xl" />

          <Reveal className="mt-3xl flex justify-center">
            <ActionButton href="/obra">Ver todas las obras</ActionButton>
          </Reveal>
        </Container>
      </Section>

      {/* Sobre Mariela — the artist, in short. */}
      <Artist content={content.artist} />

      {/* Encargos — one ask, at the end. */}
      <ContactCallout content={content.contact} id="encargos" />
    </>
  );
}
