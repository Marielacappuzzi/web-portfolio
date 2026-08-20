import type { SiteContent } from "./types";

/**
 * Site-level content. Copy is verbatim from docs/Copy.md — Footer section.
 *
 * PENDING (see docs/CONTENT_PENDING.md):
 *  - email and Instagram are unknown. They stay null so the UI marks them as
 *    pending instead of shipping a fabricated address.
 *  - The surname is spelled "Crapuzzi" in the approved copy and "Crappuzi" in
 *    the repository. Confirm before launch; this is the only place to change it.
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
