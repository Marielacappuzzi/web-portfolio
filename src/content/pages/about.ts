import type { AboutPage } from "../types";

/**
 * /sobre-mi — synthesised.
 *
 * Three movements where there were four: who she is and where she trained,
 * how she works, and why charcoal. Everything here is Mariela's own text from
 * Mariela_Crapuzzi_Acerca_de_la_Artista.docx, moved to the first person
 * because the document was written about her and the site speaks as her. No
 * sentence is invented.
 *
 * What came out:
 *
 *  · The "vision" block — four cards titled "La emoción como materia", "Más
 *    allá de lo visible", "Por qué el carboncillo", "El realismo como medio".
 *    All four restated, as headings, what the paragraphs above and below them
 *    already said, and the third one restated the section that follows it by
 *    name. The page was saying the same thing four times in a smaller font.
 *  · The statement's two display lines, "Dibujar es una forma de mirar / hasta
 *    que la imagen empieza a hablar". A fourth variation on looking, in a site
 *    that had five.
 *
 * What went in: the trajectory. "Su trabajo avanza desde el retrato hacia una
 * producción progresivamente más personal y autoral" was in the client's brief
 * and nowhere on the site, and it is the one sentence that explains why El
 * Rescate matters.
 */
export const about: AboutPage = {
  heading: {
    eyebrow: "Sobre Mariela",
    title:
      "El arte se convirtió en mi profesión, pero también en una *manera de mirar*.",
  },

  /* Who she is, where she trained, and where the work is going. */
  intro: [
    "Soy una artista boliviana dedicada al realismo figurativo contemporáneo.",
    "Mi formación comenzó en 2022 en la Academia de Artes Figurativas de Santa Cruz de la Sierra, donde cursé estudios de dibujo y pintura, para posteriormente especializarme en carboncillo.",
    "Entre mis referentes está William-Adolphe Bouguereau, cuya sensibilidad para la figura y la expresión marcó mi manera de mirar desde los primeros años de formación.",
    "Mi trabajo avanza desde el retrato hacia una producción progresivamente más personal y autoral.",
  ],

  /*
   * How she works. The heading is a plain statement of practice rather than a
   * fifth variation on looking, and the paragraphs are hers, unchanged.
   */
  statement: {
    eyebrow: "El trabajo",
    titleLines: ["El realismo, como *medio*."],
    paragraphs: [
      "Detrás de cada obra existe una historia, un vínculo o una emoción que no siempre es visible a primera vista.",
      "Antes de comenzar, necesito comprender qué se quiere conservar, recordar o transmitir. A partir de ahí, cada decisión —la composición, la luz, el contraste o el detalle— se construye para ser fiel no solamente a una imagen, sino a lo que esa imagen significa.",
      "El realismo deja de ser un fin para convertirse en el medio a través del cual esa dimensión más íntima puede tomar forma.",
    ],
    pullQuote:
      "No se trata únicamente de representar lo visible, sino de hacer sensible aquello que existe detrás.",
  },

  /* Why charcoal. The one section the rest of the site links to. */
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
};
