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
  intro: [
    "Mariela Crapuzzi es una artista boliviana dedicada al realismo figurativo contemporáneo. Su formación comenzó en 2022 en la Academia de Artes Figurativas de Santa Cruz de la Sierra, donde estudió dibujo y pintura antes de especializarse en carboncillo.",
    "En el centro de su trabajo está la emoción: aquello que sostiene una imagen, un vínculo, una experiencia o una forma de mirar. No busca únicamente representar lo visible, sino hacer sensible aquello que existe detrás.",
    "El realismo no es el fin, sino el medio. Y el carboncillo, al prescindir del color, concentra la mirada en la luz, la expresión y la profundidad.",
    "Sueño de Primavera, su reinterpretación de Rêve de printemps de William-Adolphe Bouguereau, fue su primera obra de gran formato y formó parte de su primera exposición.",
  ],

  /* Copy.md §2 — the reasoning the home only hints at */
  statement: {
    eyebrow: "Más allá de la imagen",
    titleLines: [
      "No busco reproducir lo que veo.",
      "Busco encontrar lo que esa imagen *puede decir*.",
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
    youtubeId: "1IVD_FhWfUE",
    label: "Primer plano del carboncillo y el lápiz sobre el papel.",
    portrait: true,
    caption: "El carboncillo y el lápiz.",
  },

  /*
   * The five operational stages (escuchar, encontrar la imagen, interpretar,
   * crear, proteger y entregar) live on /encargos and only there. Repeating
   * them here made this page read as a how-to-hire-me instead of an artist
   * statement. The same practice is described from the inside: how she looks,
   * what she keeps, and what realism is actually for.
   *
   * Written from the concepts the client supplied on 2026-08-20. The source
   * document "Acerca de la artista" never reached the workspace, so this needs
   * Mariela's approval before launch. See docs/CONTENT_PENDING.md.
   */
  vision: {
    eyebrow: "La mirada",
    title: "Cada obra comienza preguntándome qué *merece permanecer*.",
    intro:
      "Antes de decidir una composición necesito entender qué sostiene la imagen. No todo lo que aparece en una fotografía merece ser trasladado, y no todo lo que importa está a la vista.",
    ideas: [
      {
        title: "Cómo miro",
        body: "Busco aquello que sostiene la imagen: una expresión, un gesto, la relación entre dos figuras. Lo demás acompaña.",
      },
      {
        title: "Cómo interpreto",
        body: "Decido qué potenciar, qué transformar y qué dejar fuera. Una obra fiel no es la que copia, sino la que conserva el significado.",
      },
      {
        title: "Por qué el carboncillo",
        body: "Al desaparecer el color, la atención se concentra. La luz, la expresión y la profundidad adquieren otro peso.",
      },
      {
        title: "Qué intento conservar",
        body: "La emoción que sostiene un vínculo o una experiencia. Aquello que una imagen, por sí sola, no alcanza a decir.",
      },
      {
        title: "Cómo entiendo el realismo",
        body: "El realismo no es el fin, sino el medio: la herramienta para hacer sensible aquello que existe detrás de lo visible.",
      },
    ],
  },
};
