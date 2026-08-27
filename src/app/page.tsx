import { ContactCallout } from "@/components/blocks/ContactCallout";
import { Artist } from "@/components/home/Artist";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { getFeaturedWorks, getHome } from "@/lib/content";

/**
 * Home — four blocks, and no catalogue.
 *
 *   1. Hero        who she is, on the studio photograph
 *   2. Declaración what she is after, in two lines
 *   3. La artista  who is doing the looking
 *   4. Insignia    the three works that carry a story
 *   5. Contacto    one way in
 *
 * The general grid is gone. There used to be two consecutive blocks of work
 * here — "Obra seleccionada" above "Obras destacadas" — and a visitor could
 * not tell what separated them. The catalogue now lives on /obra, and the home
 * shows only the three pieces that are meant to lead somewhere.
 */
export default async function HomePage() {
  const [content, featured] = await Promise.all([getHome(), getFeaturedWorks()]);

  return (
    <>
      <Hero content={content.hero} />

      {/*
        The proposition, in two lines. It belongs here rather than on Sobre mí:
        the brief keeps this sentence on the home and asks for the biography
        page to say the same thing differently, which it now does.
      */}
      <Statement content={content.statement} />

      <Artist content={content.artist} />
      <FeaturedWorks content={content.featured} works={featured} />
      <ContactCallout content={content.contact} />
    </>
  );
}
