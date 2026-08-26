import type { AboutPage } from "../types";

/**
 * /sobre-mi
 *
 * Receives three blocks of docs/Copy.md that no longer fit a four-section home:
 * §8 (who she is), §2 (the reasoning behind the statement) and §5 (why
 * charcoal), plus §6 as the process section the home links to.
 *
 * The order is deliberate: the person, then how she looks, then the material,
 * then the method. It answers "cómo mira" before "cómo trabaja".
 */
export const about: AboutPage = {
  /* Copy.md §8 */
  heading: {
    eyebrow: "La artista",
    title:
      "El arte se convirtió en mi profesión, pero también en una *manera de mirar*.",
  },
  /*
   * From Mariela_Crapuzzi_Acerca_de_la_Artista.docx. Her text, moved from the
   * third person to the first at the client's request: the document was
   * written about her, and the rest of the site speaks as her. Only pronouns
   * and verb endings change — no sentence is rewritten, cut or added.
   *
   * Only the opening two paragraphs live here; the rest of that document
   * carries the ideas and is set as `vision` below, so nothing repeats.
   *
   * The closing line comes from the works document, under Sueño de Primavera.
   * It is the only record of an exhibition anywhere in the project.
   */
  intro: [
    "Soy una artista boliviana dedicada al realismo figurativo contemporáneo.",
    "Mi formación comenzó en 2022 en la Academia de Artes Figurativas de Santa Cruz de la Sierra, donde cursé estudios de dibujo y pintura, para posteriormente especializarme en carboncillo.",
    /*
     * Bouguereau stays as a referent, but detached from the work he inspired.
     * Naming Sueño de Primavera here dragged a piece — and its edition — into
     * a page that is meant to be about Mariela and nothing else.
     */
    "Entre mis referentes está William-Adolphe Bouguereau, cuya sensibilidad para la figura y la expresión marcó mi manera de mirar desde los primeros años de formación.",
  ],

  /* Copy.md §2 — the reasoning the home only hints at */
  statement: {
    /*
     * Not the home's two lines again. That sentence is the site's opening
     * statement and belongs there; reading it twice on the way through made
     * the second time feel like a page that had run out of things to say.
     * Same idea, said from the inside of the work rather than as a manifesto.
     */
    titleLines: [
      "Dibujar es una forma de mirar",
      "hasta que la imagen *empieza a hablar*.",
    ],
    paragraphs: [
      "Detrás de cada obra existe una historia, un vínculo o una emoción que no siempre es visible a primera vista.",
      "Antes de comenzar, necesito comprender qué se quiere conservar, recordar o transmitir. A partir de ahí, cada decisión —la composición, la luz, el contraste o el detalle— se construye para ser fiel no solamente a una imagen, sino a lo que esa imagen significa.",
      "La mirada es siempre el punto de partida. Para mí, allí comienza la identidad emocional de la obra.",
    ],
    pullQuote:
      "Todo lo demás se construye para acompañar y reforzar esa mirada.",
  },

  /* Copy.md §5 */
  language: {
    eyebrow: "El lenguaje",
    title: "La profundidad no siempre necesita *color*.",
    paragraphs: [
      "Después de explorar el grafito y la pintura al óleo, regresé al carboncillo porque encontré en él una libertad diferente.",
      "Sus negros profundos, la riqueza de los grises y la posibilidad de pasar de un gesto delicado a un contraste intenso me permiten trabajar la luz, la textura y la expresión con una sensibilidad muy particular.",
      "Al desaparecer el color, la atención se concentra. La figura, la atmósfera y la mirada adquieren otro peso.",
    ],
    pullQuote:
      "El carboncillo puede ser extremadamente delicado y, al mismo tiempo, profundamente intenso.",
  },

  /* The material itself, as evidence for the section above it. */
  languageVideo: {
    src: "/video/carboncillo.mp4",
    poster: "/video/carboncillo.jpg",
    label: "Primer plano del carboncillo y el lápiz sobre el papel.",
    portrait: true,
    caption: "El carboncillo y el lápiz.",
  },

  /*
   * The five operational stages (escuchar, encontrar la imagen, interpretar,
   * crear, proteger y entregar) live on /encargos and only there. Repeating
   * them here made this page read as a how-to-hire-me instead of an artist
   * statement.
   *
   * Every sentence below comes from the closing paragraphs of
   * Mariela_Crapuzzi_Acerca_de_la_Artista.docx, moved to the first person to
   * match the rest of the site. Only the short labels are editorial — they
   * name each idea so the block reads at a glance and claim nothing of their
   * own.
   */
  vision: {
    eyebrow: "La mirada",
    title: "Cada obra comienza intentando reconocer qué *merece permanecer*.",
    intro:
      "Ya sea a partir de una historia que me es confiada o de una composición propia. Es allí, en ese encuentro entre imagen y emoción, donde comienza mi trabajo.",
    ideas: [
      {
        title: "La emoción como materia",
        body: "Me interesa reconocer aquello que sostiene una imagen —un vínculo, una experiencia, una forma de mirar— y llevarlo a un lugar donde pueda ser percibido con mayor intensidad.",
      },
      {
        title: "Más allá de lo visible",
        body: "No se trata únicamente de representar lo visible, sino de hacer sensible aquello que existe detrás.",
      },
      {
        title: "Por qué el carboncillo",
        body: "En el carboncillo encontré un lenguaje especialmente afín a esa búsqueda. La ausencia de color concentra la mirada en lo esencial: la luz, la expresión y la profundidad.",
      },
      {
        title: "El realismo como medio",
        body: "El realismo deja de ser un fin para convertirse en el medio a través del cual esa dimensión más íntima puede tomar forma.",
      },
    ],
  },
};
