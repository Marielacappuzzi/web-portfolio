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
  hero: {
    eyebrow: "Mariela Crapuzzi · Artista visual",
    title: "Una mirada puede contener una *historia entera*.",
    description:
      "A través del realismo figurativo y el carboncillo, transformo recuerdos, vínculos y emociones en obras creadas para conservar aquello que una imagen, por sí sola, no alcanza a decir.",
    primaryAction: { label: "Explorar la obra", href: "/obra" },
    secondaryAction: { label: "Conocer mi proceso", href: "/sobre-mi#proceso" },
    /*
     * PENDING. The portada is a dedicated 1920 x 750 photograph, not a
     * catalogue piece: the hero needs a wide crop with room on the left for
     * the sentence, and no existing work is shot that way. Until it is
     * produced, CoverImage renders a declared plate at the right proportion.
     * See docs/CONTENT_PENDING.md.
     *
     * When the file lands, drop it at /portada/inicio.jpg and fill this in:
     *   cover: {
     *     src: "/portada/inicio.jpg",
     *     alt: "...",
     *     focus: "60% 40%",
     *   },
     */
    cover: null,
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
    action: { label: "Conocer mi mirada", href: "/sobre-mi" },
  },

  /*
   * 3 — Obra seleccionada. Copy.md §3 heading. The three featured pieces show
   * as image and title; their texts live on /obra and the editorial pages.
   */
  work: {
    eyebrow: "Obra seleccionada",
    title: "Historias llevadas al *carboncillo*.",
    action: { label: "Ver toda la obra", href: "/obra" },
  },

  /*
   * 4 — Iniciar una conversación. Copy.md §10. This is the equivalent of Yulia
   * Bas's ENQUIRIES block: one way in, plus a quiet route to commissions.
   */
  contact: {
    eyebrow: "Iniciar una conversación",
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
    paragraph:
      "Puede ser un recuerdo, una persona, un animal, un vínculo o una idea que todavía no encontró su imagen.",
    primaryAction: { label: "Contar mi historia", href: "/contacto" },
    secondaryAction: { label: "Cómo funciona un encargo", href: "/encargos" },
  },
};
