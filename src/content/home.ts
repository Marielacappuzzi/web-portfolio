import type { HomeContent } from "./types";

/**
 * Home copy — the whole tour, in five blocks.
 *
 *   hero -> obras -> sobre Mariela -> encargos -> contacto
 *
 * Someone who reads only this page leaves knowing who she is, what she makes,
 * how to ask for a piece and where to write. The internal pages still exist
 * and go deeper; nobody has to visit them to understand the project.
 *
 * What was cut: the "Declaración" section — two lines of manifesto and a pull
 * quote — sat between the hero and the artist block saying, in a third
 * arrangement, what both of its neighbours already said. Three sections about
 * how Mariela looks, before a single drawing. The work is the better argument.
 */
export const home: HomeContent = {
  /*
   * 1 — Hero.
   *
   * Name, then what she does, then one sentence of what that means. Her name
   * and specialty are not written here: they live in site.ts and the component
   * reads them, so the site says who she is in exactly one place.
   *
   * The line "Una mirada puede contener una historia entera" is not in the
   * hero. It is hers and it stays on the site, but a first screen that already
   * carries a name at 92px, a role, a sentence and two actions does not have
   * room for a sixth thing — and on a notebook it would be the part that fell
   * below the fold. It sits over the work instead, in `featured.line`, which
   * is the one place it is describing something the reader can see.
   */
  hero: {
    description:
      "Creo obras de realismo figurativo que combinan precisión, sensibilidad y expresión para representar aquello que hace única a cada historia.",
    primaryAction: { label: "Ver obras", href: "/obra" },
    secondaryAction: { label: "Solicitar un encargo", href: "/encargos" },
    /*
     * Mariela at the easel, drawing the lioness and her cub.
     *
     * Composed for a cover — she and the sheet hold the right, and the left is
     * bare studio wall with nothing in it, which is where the type goes. That
     * wall measures 0.14 relative luminance, so the type over it is light and
     * the veil is dark; see Hero for the arithmetic.
     *
     * Two files. The landscape one is the frame whole at 16:9, trimmed to 2:1
     * by the browser on wide screens. The portrait one is cut from x=760 so a
     * phone still gets the lioness, the cub, her hand on the charcoal and her
     * face — everything the picture is about, in a shape that holds it.
     */
    cover: {
      src: "/portada/estudio.jpg",
      mobileSrc: "/portada/estudio-movil.jpg",
      alt: "Mariela Crapuzzi en su taller, dibujando a carboncillo una leona y su cachorro sobre un pliego montado en el caballete, con el lápiz apoyado en el rostro de la leona.",
      focus: "50% 38%",
    },
  },

  /*
   * 2 — Obras. Straight after the hero, because it is what a visitor came for.
   *
   * Three pieces, large, with one line above them and their names under them.
   * Everything else about each work is a click away.
   */
  featured: {
    eyebrow: "Obras insignia",
    line: "Una mirada puede contener una *historia entera*.",
    action: { label: "Ver todas las obras", href: "/obra" },
  },

  /*
   * 3 — Sobre Mariela.
   *
   * Synthesised: who she is, where she trained, and why charcoal. Three
   * sentences where there were two paragraphs of reasoning about emotion and
   * looking — that reasoning is on /sobre-mi, said once and properly.
   */
  artist: {
    eyebrow: "Sobre Mariela",
    title: "Realismo figurativo, trabajado en *carboncillo*.",
    paragraphs: [
      "Soy una artista boliviana dedicada al realismo figurativo contemporáneo. Mi formación comenzó en 2022 en la Academia de Artes Figurativas de Santa Cruz de la Sierra, donde estudié dibujo y pintura antes de especializarme en carboncillo.",
      "Trabajo la luz, el contraste y la expresión. Al desaparecer el color, la atención se concentra en aquello que sostiene una imagen.",
    ],
    action: { label: "Conocer más sobre Mariela", href: "/sobre-mi" },
    image: {
      src: "/estudio/mariela-mesa-de-trabajo.jpg",
      alt: "Mariela Crapuzzi en su mesa de trabajo, con un carboncillo en la mano, los lápices alineados junto a un guante de dibujo y la fotografía de referencia de una leona en una tableta.",
    },
  },

  /*
   * 4 — Encargos. What can be asked for, and the way to ask.
   *
   * No stages and no examples of finished commissions: the pieces are in the
   * gallery two sections above, each labelled as a commission, and repeating
   * them here made the home look longer than it is.
   */
  commissions: {
    eyebrow: "Encargos",
    title: "Una obra creada a partir de aquello que *quieres conservar*.",
    paragraph:
      "Retratos de personas, mascotas, homenajes y composiciones creadas a partir de una historia, una imagen o un vínculo.",
    kinds: [
      "Retratos de personas",
      "Retratos de mascotas",
      "Homenajes",
      "Composiciones simbólicas",
    ],
    action: { label: "Cotizar un encargo", href: "/encargos#cotizar" },
  },

  /*
   * 5 — Contacto. General enquiries, and the only external channel.
   *
   * Deliberately not another invitation to commission something: that was the
   * block above, with its own form. This one is for the person asking about an
   * available piece, a print or an exhibition.
   */
  contact: {
    eyebrow: "Contacto",
    title: "¿Tienes una consulta sobre una obra?",
    paragraph:
      "Escríbeme por una obra disponible, un print o cualquier otra consulta.",
    primaryAction: { label: "Contactar", href: "/contacto" },
  },
};
