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
   * Five anchors on one page. The site used to be five routes with a
   * dropdown listing every work under Obras; the restructure makes it a
   * single continuous read, so the menu points at sections rather than
   * pages. Works with their own page are reached from the gallery.
   */
  nav: [
    { label: "Inicio", href: "/#inicio" },
    { label: "Obras", href: "/#obras" },
    { label: "Sobre Mariela", href: "/#sobre-mariela" },
    { label: "Encargos", href: "/#encargos" },
    { label: "Contacto", href: "/#contacto" },
  ],

  footerNav: [
    { label: "Obras", href: "/obra" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Encargos", href: "/encargos" },
    { label: "Contacto", href: "/contacto" },
  ],

  legalNav: [
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
  ],

  copyright: "© 2026 Mariela Crapuzzi. Todos los derechos reservados.",
};
