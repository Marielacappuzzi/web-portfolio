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
    title: "Una mirada puede contener una *historia entera*.",
    description:
      "A través del realismo figurativo y el carboncillo, transformo recuerdos, vínculos y emociones en obras creadas para conservar aquello que una imagen, por sí sola, no alcanza a decir.",
    primaryAction: { label: "Explorar la obra", href: "/obra" },
    secondaryAction: { label: "Conocer mi proceso", href: "/sobre-mi#proceso" },
    /*
     * The portada: Mariela drawing, with the charcoal in her hand.
     * She asked for this over the framed piece that opened the site before —
     * it says what she does in the first second, which a photograph of a wall
     * cannot. She sits on the right of the frame, so the horse's head fills
     * the left and the type now lives under the band rather than over it.
     *
     * Two files: the landscape band is cropped from the middle of the
     * original, and phones get the full portrait frame.
     */
    cover: {
      src: "/portada/pintando.jpg",
      mobileSrc: "/portada/pintando-movil.jpg",
      alt: "Mariela Crapuzzi dibujando a carboncillo sobre la obra Toro Salvaje: la cabeza del caballo a la izquierda y su mano con el lápiz sobre la crin.",
      focus: "50% 50%",
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
    image: {
      src: "/estudio/mariela-mesa-de-trabajo.jpg",
      alt: "Mariela Crapuzzi en su mesa de trabajo, con un carboncillo en la mano, los lápices alineados junto a un guante de dibujo y la fotografía de referencia de una leona en una tableta.",
    },
  },

  /*
   * 4 — Obras insignia.
   *
   * One block of work on the home, not two. "Obra seleccionada" sat directly
   * above "Obras destacadas" with a five-piece grid between them, and nobody
   * could tell what separated the two. The full catalogue now lives only on
   * /obra, where a visitor goes to browse; the home shows the three pieces the
   * site is actually built around and sends everyone there for the rest.
   */
  featured: {
    eyebrow: "Obras insignia",
    action: { label: "Ver todas las obras", href: "/obra" },
  },

  contact: {
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
    paragraph:
      "Puede ser un recuerdo, una persona, un animal, un vínculo o una idea que todavía no encontró su imagen.",
    primaryAction: { label: "Contar mi historia", href: "/contacto" },
    secondaryAction: { label: "Cómo funciona un encargo", href: "/encargos" },
  },
};
