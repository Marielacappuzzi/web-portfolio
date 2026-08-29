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
      <Section id="obras" ground="paper" rhythm="act" aria-labelledby="obras-titulo">
        {/*
          The heading and the closing button keep the page gutter; the slider
          does not. On a phone the three flagship pieces are shown exactly as
          the gallery shows them — full-bleed banners, one at a time, arrows
          underneath — and a banner held inside a 90rem column with 20px of
          gutter either side is not a banner, it is a picture in a box.
        */}
        <Container width="wide">
          <Reveal>
            <Display as="h2" id="obras-titulo" measure={20}>
              Obras *destacadas*
            </Display>
          </Reveal>
        </Container>

        {/*
          Two presentations of the same three pieces, one per breakpoint.

          The row of cards works on a wide screen, where three drawings sit
          side by side and read as a set. On a phone it becomes three portraits
          stacked in a single column, each one small, and the banners do the
          job far better — one at a time, edge to edge, swipeable.

          `md:hidden` / `hidden md:block` rather than a conditional, because
          this is a Server Component: it renders once, with no idea what it is
          rendering onto. CSS is what knows the width.
        */}
        <div className="mt-2xl md:hidden">
          {/*
            `priority={false}`: on /obra the first banner is what opens the
            page, but here the home's own hero already holds that slot and this
            run is hidden on the screens most visitors arrive on.
          */}
          <FeaturedSlider works={featured} priority={false} />
        </div>

        <div className="hidden md:block">
          <Container width="wide">
            <FeaturedRow works={featured} className="mt-2xl" />
          </Container>
        </div>

        <Container width="wide">
          {/*
            `mt-xl` on a phone, `mt-3xl` from `sm`. The slider's own arrows sit
            directly above this button, so on a narrow screen the gap read as a
            missing section rather than as breathing room — about a third less,
            which is what the correction asked for, and the wide layout keeps
            the space it was designed with.
          */}
          <Reveal className="mt-xl flex justify-center sm:mt-3xl">
            <ActionButton href="/obra">Ver todas las obras</ActionButton>
          </Reveal>
        </Container>
      </Section>

      {/* Sobre Mariela — the artist, in short. */}
      <Artist content={content.artist} />

      {/* Contacto — one ask, at the end. */}
      <ContactCallout content={content.contact} />
    </>
  );
}
