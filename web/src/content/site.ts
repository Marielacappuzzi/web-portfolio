import type { SiteContent } from "./types";

/**
 * Site-level content. Copy is verbatim from docs/Copy.md — Footer section.
 *
 * PENDING (see docs/CONTENT_PENDING.md): the email address is unknown, so it
 * stays null and the UI marks it as pending rather than shipping a fabricated
 * address.
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
  instagramHandle: "@marielacrapuzzi_art",
  instagramUrl: "https://www.instagram.com/marielacrapuzzi_art",

  nav: [
    { label: "Obra", href: "/obra" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Encargos", href: "/encargos" },
    { label: "Contacto", href: "/contacto" },
  ],

  footerNav: [
    { label: "Obra", href: "/obra" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Encargos", href: "/encargos" },
    { label: "Contacto", href: "/contacto" },
  ],

  legalNav: [
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Aviso legal", href: "/aviso-legal" },
  ],

  copyright: "© 2026 Mariela Crapuzzi. Todos los derechos reservados.",
};
