import type { AboutPage } from "../types";

/**
 * /sobre-mi — Mariela, and only Mariela.
 *
 * The page used to introduce her three times: an editorial opening, then a
 * portrait beside a heading carrying her name, then a paragraph of biography
 * saying what the opening had already implied. One banner does all of it now.
 *
 * Three things were removed for the same reason — they belong to a work, not
 * to her: the Bouguereau reinterpretation, the first large-format piece, and
 * the exhibition attached to it. Every one of those facts lives on Sueño de
 * Primavera's own page, where a reader can see the work being described.
 *
 * The prose was also thinned. "Mirada", "historia", "emoción", "conservar"
 * and "significar" appeared across all three sections in different
 * arrangements; each idea is now said once, in the section that owns it.
 */
export const about: AboutPage = {
  /* The editorial opening. Unchanged, and deliberately still short. */
  heading: {
    eyebrow: "La artista",
    title:
      "El arte se convirtió en mi profesión, pero también en una *manera de mirar*.",
  },

  /*
   * The banner, and the only place the page presents her.
   *
   * The photograph was composed for this layout: she sits in the left two
   * thirds and the wall behind her runs clear from about 60% rightwards. That
   * clear zone measures 114 of 255 — a mid warm grey, not the pale wall it
   * looks like — so the type over it is light: white reaches 4.8:1 there and
   * near-black only 3.9:1. See AboutBanner for the rest of the arithmetic.
   */
  banner: {
    src: "/sobre-mi/banner.jpg",
    mobileSrc: "/sobre-mi/banner-movil.jpg",
    alt: "Mariela Crapuzzi sentada a su mesa de trabajo, firmando el certificado de autenticidad de una obra, con estanterías de plantas y materiales de dibujo detrás.",
    name: "Mariela Crapuzzi",
    role: "Artista visual especializada en carboncillo.",
    bio: [
      "Soy una artista boliviana dedicada al realismo figurativo contemporáneo. Mi formación comenzó en la Academia de Artes Figurativas de Santa Cruz de la Sierra, donde estudié dibujo y pintura antes de especializarme en carboncillo.",
      "El realismo es el medio y no el fin: la técnica me sirve para trabajar la expresión, la luz y la profundidad. Con el tiempo, mi trabajo fue avanzando desde el retrato hacia una producción progresivamente más personal y autoral.",
    ],
  },

  /*
   * Mi manera de mirar.
   *
   * Three paragraphs became two. The one that went — "La mirada es siempre el
   * punto de partida. Para mí, allí comienza la identidad emocional de la
   * obra" — said what the pull quote under it already says, four lines apart.
   */
  statement: {
    eyebrow: "Mi manera de mirar",
    titleLines: [
      "Una imagen fiel no es la que copia.",
      "Es la que *sostiene lo que significa*.",
    ],
    paragraphs: [
      "Detrás de cada obra existe una historia, un vínculo o una emoción que no siempre es visible a primera vista.",
      "Antes de comenzar, necesito comprender qué se quiere conservar, recordar o transmitir. A partir de ahí, cada decisión —la composición, la luz, el contraste o el detalle— se construye para ser fiel no solamente a una imagen, sino a lo que esa imagen significa.",
    ],
    pullQuote:
      "Todo lo demás se construye para acompañar y reforzar esa mirada.",
  },

  /*
   * El lenguaje. Why charcoal, and nothing else.
   *
   * The closing paragraph — "Al desaparecer el color, la atención se concentra.
   * La figura, la atmósfera y la mirada adquieren otro peso" — was a third
   * sentence about looking on a page that already had two. What it added about
   * the absence of colour is in the pull quote's own claim.
   */
  language: {
    eyebrow: "El lenguaje",
    title: "La profundidad no siempre necesita *color*.",
    paragraphs: [
      "Después de explorar el grafito y la pintura al óleo, regresé al carboncillo porque encontré en él una libertad diferente.",
      "Sus negros profundos, la riqueza de los grises y la posibilidad de pasar de un gesto delicado a un contraste intenso me permiten trabajar la luz, la textura y la expresión con una sensibilidad muy particular.",
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
   * The close.
   *
   * It used to end on "Cuéntame la historia que te gustaría convertir en una
   * obra" with "Contar mi historia" beside it — the commissions pitch, at the
   * foot of the page that is not about commissions. A reader who has just
   * finished reading about the artist wants to see the work. That is the
   * first button; the commission is the quiet second.
   */
  closing: {
    title: "Conoce mi obra.",
    paragraph:
      "Explora una selección de obras personales, encargos y piezas que forman parte de mi recorrido.",
    primaryAction: { label: "Ver obras", href: "/obra" },
    secondaryAction: { label: "Solicitar un encargo", href: "/encargos" },
  },
};
