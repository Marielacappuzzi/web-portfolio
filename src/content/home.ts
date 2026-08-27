import type { HomeContent } from "./types";

/**
 * Home copy — four sections.
 *
 * Every word here is verbatim from docs/Copy.md. What changed is *where* the
 * rest of that document lives: the home introduces the universe, the internal
 * pages explain it. Nothing was rewritten and nothing was discarded — see the
 * redistribution table in docs/PROJECT_CONTEXT.md §8.
 *
 * The model is Yulia Bas: her home carries three blocks and a single sentence
 * of prose. Depth is reached by clicking, not by scrolling.
 */
export const home: HomeContent = {
  /* 1 — Hero. Copy.md §1 */
  /* 1 — Hero. Copy aprobado en los lineamientos de reestructuración. */
  hero: {
    /*
     * Her name is the headline now, not a line of prose above it. The brief
     * is explicit: the name has to read large and be the first thing anyone
     * takes in — a visitor should know whose site this is before they read a
     * word of anything else.
     */
    eyebrow: null,
    title: "Mariela Crapuzzi",
    subtitle: "Artista visual especializada en carboncillo",
    description:
      "Creo obras de realismo figurativo que combinan precisión, sensibilidad y expresión para representar aquello que hace única a cada historia.",
    primaryAction: { label: "Ver obras", href: "#obras" },
    secondaryAction: { label: "Solicitar un encargo", href: "#encargos" },
    cover: {
      src: "/portada/banner-home.jpg",
      mobileSrc: "/portada/banner-home-mobile.jpg",
      alt: "Mariela Crapuzzi en su estudio, trabajando a carboncillo el retrato de una leona con su cría sobre un caballete junto a la ventana.",
      focus: "65% 45%",
    },
  },

  /*
   * 2 — Declaración. Copy.md §2, reduced to the headline and the sentence to
   * carry away. Its three paragraphs of reasoning moved to /sobre-mi.
   */
  statement: {
    eyebrow: "Más allá de la imagen",
    titleLines: [
      "No busco reproducir lo que veo.",
      "Busco encontrar lo que esa imagen *puede decir*.",
    ],
    pullQuote:
      "Todo lo demás se construye para acompañar y reforzar esa mirada.",
  },

  /*
   * 3 — Obra seleccionada. Copy.md §3 heading. The three featured pieces show
   * as image and title; their texts live on /obra and the editorial pages.
   */
  /*
   * 3 — La artista. Copy supplied by the client on 2026-08-20.
   *
   * Placed before the work so a visitor meets the person behind the gaze
   * before exploring the pieces, and composed text-left / image-right — the
   * mirror of /sobre-mi, so the two never read as the same block twice.
   *
   * Moved to the first person at the client's request, so the block matches
   * the title above it and every other line on the site.
   */
  artist: {
    eyebrow: "La artista",
    title:
      "El arte se convirtió en mi profesión, pero también en una *manera de mirar*.",
    paragraphs: [
      "Soy una artista boliviana dedicada al realismo figurativo contemporáneo. En el centro de mi trabajo está la emoción: aquello que sostiene una imagen, un vínculo, una experiencia o una forma de mirar.",
      "En el carboncillo encontré un lenguaje capaz de llevar esa búsqueda hacia lo esencial. La ausencia de color concentra la atención en la luz, la expresión y la profundidad.",
    ],
    action: { label: "Conocer mi recorrido", href: "/sobre-mi" },
    /*
     * Not the selfie. The previous photograph had her looking into a phone
     * camera, which reads as a social post rather than as a working artist —
     * the client asked for it out. This one is taken over her shoulder while
     * she works: the drawing leads and she is present without performing.
     */
    image: {
      src: "/estudio/mariela-trabajando.jpg",
      alt: "Mariela Crapuzzi de espaldas, trabajando con la mano enguantada sobre un carboncillo de un caballo al galope montado en la pared del estudio.",
    },
  },

  work: {
    eyebrow: "Obra seleccionada",
    title: "Historias llevadas al *carboncillo*.",
    action: { label: "Ver todas las obras", href: "/obra" },
  },

  /*
   * 4 — Iniciar una conversación. Copy.md §10. This is the equivalent of Yulia
   * Bas's ENQUIRIES block: one way in, plus a quiet route to commissions.
   */
  /*
   * 5 — Obras destacadas: the three pieces with an editorial page, in the
   * sequence origin → interpretation → a voice of her own. No headline of its
   * own; the concept labels orient the sequence and no copy was invented.
   */
  featured: {
    eyebrow: "Obras destacadas",
  },

  contact: {
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
    paragraph:
      "Puede ser un recuerdo, una persona, un animal, un vínculo o una idea que todavía no encontró su imagen.",
    primaryAction: { label: "Contar mi historia", href: "/contacto" },
    secondaryAction: { label: "Cómo funciona un encargo", href: "/encargos" },
  },
};
