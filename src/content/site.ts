import type { SiteContent } from "./types";

/**
 * Site-level content. Copy is verbatim from docs/Copy.md — Footer section.
 *
 * No public email address. Raised twice and settled by the client on
 * 2026-08-23: publishing one hands it to scrapers, and the contact form
 * already delivers to Mariela's inbox. Instagram is the only direct channel;
 * everything else goes through /contacto. `email` stays null by decision, not
 * because an address is missing.
 *
 * The surname is Crapuzzi, confirmed by Mariela and by the signed certificate
 * of authenticity. The repository and GitHub handle spell it otherwise; this
 * file is the authority.
 */
export const site: SiteContent = {
  name: "Mariela Crapuzzi",
  role: "Artista visual especializada en carboncillo.",
  location: "Santa Cruz de la Sierra, Bolivia",
  email: null,

  /*
   * Shown only in the privacy policy and the terms, where naming an address is
   * the point — it is where someone writes to ask for their data. It is
   * deliberately absent from the footer and /contacto, which route through the
   * form instead.
   *
   * The mailbox is spelled "crappuzzi"; the printed form is "crapuzzi". See
   * LegalEmail in types.ts for why, and for what it costs.
   */
  legalEmail: {
    address: "web.marielacrappuzzi@gmail.com",
    display: "web.marielacrapuzzi@gmail.com",
  },
  instagramHandle: "@marielacrapuzzi_art",
  instagramUrl: "https://www.instagram.com/marielacrapuzzi_art",

  /*
   * Five items, and nothing that unfolds.
   *
   * "Obras" used to drop a panel listing all ten pieces, half of them anchors
   * into the gallery. It made the one route everybody takes — go and look at
   * the work — into a decision between eleven links, and it duplicated the
   * gallery in a menu. The label now does what it says.
   *
   * "Inicio" is a nav item again. The monogram still returns home, but a mark
   * is a convention rather than a label, and the home is now the whole tour
   * rather than a doorway — it is worth being able to ask for by name.
   */
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Obras", href: "/obra" },
    { label: "Sobre Mariela", href: "/sobre-mi" },
    { label: "Encargos", href: "/encargos" },
    { label: "Contacto", href: "/contacto" },
  ],

  /* The same destinations, minus Inicio: the mark above it already goes there. */
  footerNav: [
    { label: "Obras", href: "/obra" },
    { label: "Sobre Mariela", href: "/sobre-mi" },
    { label: "Encargos", href: "/encargos" },
    { label: "Contacto", href: "/contacto" },
  ],

  legalNav: [
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
  ],

  copyright: "© 2026 Mariela Crapuzzi. Todos los derechos reservados.",
};
