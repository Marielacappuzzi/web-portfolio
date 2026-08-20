import { processSteps } from "../process";
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
      "El arte se convirtió en mi profesión, pero también en una manera de mirar.",
  },
  intro: [
    "Mi relación profesional con el arte comenzó en 2021, a partir de una exploración personal que fue ocupando cada vez más espacio en mi vida.",
    "Me formé en dibujo figurativo trabajando con grafito y carboncillo, exploré la pintura al óleo y, con el tiempo, regresé al carboncillo como lenguaje principal.",
    "En ese recorrido comprendí que lo que más me interesaba no era reproducir una imagen con precisión, sino descubrir cuánto podían decir una mirada, un gesto o la relación entre dos figuras.",
    "Hoy mi trabajo evoluciona desde el retrato hacia una producción más personal y autoral, en la que utilizo la figuración para explorar y contar historias humanas.",
    /*
     * From the works document, where it appears under Sueño de Primavera. It
     * is the only record of an exhibition anywhere in the project, so it also
     * belongs here — the subject was added to give the sentence a home outside
     * that page; every other word is hers.
     */
    "Sueño de Primavera, mi reinterpretación de Rêve de printemps de William-Adolphe Bouguereau, fue mi primera obra de gran formato y formó parte de mi primera exposición.",
  ],

  /* Copy.md §2 — the reasoning the home only hints at */
  statement: {
    eyebrow: "Más allá de la imagen",
    titleLines: [
      "No busco reproducir lo que veo.",
      "Busco encontrar lo que esa imagen puede decir.",
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
    title: "La profundidad no siempre necesita color.",
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
    youtubeId: "1IVD_FhWfUE",
    label: "Primer plano del carboncillo y el lápiz sobre el papel.",
    portrait: true,
    caption: "El carboncillo y el lápiz.",
  },

  /* Copy.md §6 */
  process: {
    eyebrow: "Del relato a la obra",
    title: "Toda obra comienza antes del primer trazo.",
    intro:
      "El proceso comienza escuchando. Antes de definir una composición necesito comprender qué historia existe detrás, qué emoción debe permanecer y qué elementos son realmente esenciales.",
    steps: processSteps,
  },
};
