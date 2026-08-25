import type { Work } from "./types";

/**
 * The catalogue.
 *
 * Texts are verbatim from `Mariela_Crapuzzi_Obras_Textos_Fichas_Web_FINAL_v2`.
 * Technical sheets come from that document too, with one exception noted below.
 * Nothing here is inferred or written by anyone but Mariela.
 *
 * Each piece is split the same way: `shortStory` is the opening sentence — the
 * idea the work turns on — and `longStory` is the reasoning behind it. The
 * gallery shows only the opening line, so the writing is present everywhere
 * without the grid turning into a wall of description.
 *
 * Display rules, implemented in WorkMeta: title, then year immediately, then
 * technique / dimensions / status in a quieter hierarchy, with no field labels
 * and dimensions always in cm, alto × ancho.
 */
export const works: Work[] = [
  {
    slug: "bajo-su-proteccion",
    title: "Bajo su Protección",
    year: 2026,
    technique: "Carboncillo sobre papel 100% algodón, 270 g/m²",
    dimensions: "100 × 70 cm",
    kind: "commission",
    status: "private-collection",
    image: {
      src: "/obra/bajo-su-proteccion/principal.jpg",
      alt: "Carboncillo de una leona avanzando entre la hierba alta con su cría pegada al pecho, ambas mirando de frente.",
      width: 1315,
      height: 1920,
    },
    /*
     * No detail crops. The three that were here were closer framings of the
     * same composition the cover already shows at full width — the reader had
     * just scrolled past it. What this piece has that the others do not is the
     * process: the drawing half-finished, the studio, the signed certificate.
     */
    framedImages: [
      {
        src: "/obra/bajo-su-proteccion/extra-04.jpg",
        alt: "La obra enmarcada en negro y colgada sobre una pared blanca, junto a un sillón claro y un aparador bajo con libros y un ramo de olivo.",
        width: 1536,
        height: 1920,
        caption: "La obra, enmarcada.",
      },
    ],
    processImages: [
      {
        src: "/obra/bajo-su-proteccion/extra-05.jpg",
        alt: "Mariela dibujando con un difumino sobre el papel: la leona ya está resuelta y la cría es todavía un trazo de contorno.",
        width: 1080,
        height: 1920,
        caption: "La leona resuelta; la cría, aún en contorno.",
      },
      {
        src: "/obra/bajo-su-proteccion/extra-03.jpg",
        alt: "La obra terminada sobre el caballete del taller, con la mesa de trabajo y el carro de materiales al lado.",
        width: 1080,
        height: 1920,
        caption: "Terminada, en el taller.",
      },
      {
        src: "/obra/bajo-su-proteccion/extra-06.jpg",
        alt: "El certificado de autenticidad de la obra, firmado, junto a una reproducción impresa de la pieza.",
        width: 1079,
        height: 1920,
        caption: "Certificado de autenticidad, firmado.",
      },
    ],
    processVideos: [
      {
        src: "/video/bajo-su-proteccion-en-proceso.mp4",
        poster: "/video/bajo-su-proteccion-en-proceso.jpg",
        label: "Mariela Crapuzzi trabajando la obra Bajo su Protección.",
        portrait: true,
        caption: "La obra, en proceso.",
      },
      {
        src: "/video/bajo-su-proteccion-obra.mp4",
        poster: "/video/bajo-su-proteccion-obra.jpg",
        label:
          "Primer plano del carboncillo sobre el rostro de la cría, con la mano de Mariela trabajando el detalle.",
        portrait: true,
        caption: "El detalle, de cerca.",
      },
    ],
    concept: "INTERPRETAR UNA HISTORIA",
    shortStory:
      "Esta obra nació de un encargo inspirado en el vínculo entre una madre y su hija.",
    longStory: [
      "La figura de la leona apareció como una forma de hablar de esa fuerza que convive con el cuidado: instinto, inteligencia, determinación. Una presencia que no necesita mostrarse agresiva para dejar claro que está ahí.",
      "La composición fue construida alrededor de esa idea. La cría ocupa el frente mientras la leona emerge detrás de ella, envolviéndola con su cuerpo y sosteniendo la escena con la mirada. Los contrastes profundos del carboncillo acentúan su carácter y dan peso a una imagen en la que conviven protección y fuerza.",
      "Más que representar la maternidad de una única manera, la obra deja abierta una pregunta sobre aquello que somos capaces de sostener cuando algo verdaderamente nos importa.",
    ],
    featuredLinkLabel: "Descubrir la historia",
    featured: true,
    hasEditorialPage: true,
    printAvailable: false,
    order: 1,
    featuredOrder: 2,
  },

  {
    slug: "oltre-lo-sguardo",
    title: "Oltre lo Sguardo",
    year: 2024,
    technique: "Carboncillo sobre papel 100% algodón, 220 g/m²",
    dimensions: "42 × 29,7 cm",
    kind: "commission",
    status: "private-collection",
    image: {
      src: "/obra/oltre-lo-sguardo/principal.jpg",
      alt: "Carboncillo de una mujer joven de cabello ondulado y blusa de encaje de cuello alto, sosteniendo la mirada hacia quien observa.",
      width: 1242,
      height: 1802,
    },
    detailImages: [
      {
        src: "/obra/oltre-lo-sguardo/mirada.jpg",
        alt: "Recorte ampliado de la obra sobre los ojos de la figura, con el detalle del carboncillo en las pestañas y el iris.",
        width: 1000,
        height: 400,
        caption: "La mirada, a la escala en que se dibuja.",
      },
      {
        src: "/obra/oltre-lo-sguardo/extra-02.jpg",
        alt: "Encuadre cerrado del rostro y del encaje del cuello, donde se distingue el trazo hilo por hilo.",
        width: 1439,
        height: 1920,
        caption: "El encaje, hilo por hilo.",
      },
      {
        src: "/obra/oltre-lo-sguardo/extra-07.jpg",
        alt: "La obra vista en diagonal sobre la mesa, con la hoja de papel entrando en el encuadre por la izquierda.",
        width: 1440,
        height: 1920,
        caption: "La hoja, sobre la mesa de trabajo.",
      },
      {
        src: "/obra/oltre-lo-sguardo/extra-03.jpg",
        alt: "La obra completa todavía pegada a la pared del taller con cinta de papel en el borde superior.",
        width: 1439,
        height: 1920,
        caption: "Recién terminada, aún en la pared.",
      },
    ],
    framedImages: [
      {
        src: "/obra/oltre-lo-sguardo/extra-04.jpg",
        alt: "La obra enmarcada en negro con paspartú blanco, apoyada sobre un caballete de mesa entre plantas colgantes.",
        width: 1080,
        height: 1920,
        caption: "Enmarcada, con paspartú.",
      },
    ],
    processImages: [
      {
        src: "/obra/oltre-lo-sguardo/extra-05.jpg",
        alt: "La obra sobre el caballete del taller, con la mesa en primer plano cubierta de difuminos, gomas y barras de carboncillo.",
        width: 1079,
        height: 1920,
        caption: "En el taller, entre los materiales.",
      },
    ],
    shortStory: "No todo en esta imagen está dispuesto a ser comprendido.",
    longStory: [
      "La elegancia de otra época, el cabello apenas recogido y la delicadeza de la vestimenta construyen una imagen de aire romántico. Sin embargo, es la expresión la que sostiene el retrato.",
      "Su mirada parece guardar una certeza. En ella permanece una forma silenciosa de saberse a sí misma, la calma de quien no necesita explicar todo lo que comprende.",
      "Oltre lo Sguardo nace precisamente de esa distancia entre lo que podemos ver y aquello que solo podemos intuir.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 2,
  },

  {
    slug: "materia",
    title: "Materia",
    year: 2024,
    technique: "Carboncillo sobre papel 100% algodón, 220 g/m²",
    dimensions: "42 × 29,7 cm",
    kind: "commission",
    status: "private-collection",
    image: {
      src: "/obra/materia/principal.jpg",
      alt: "Carboncillo de un hombre de perfil con rastas largas y chaqueta de jean, la mirada dirigida fuera del encuadre.",
      width: 1267,
      height: 1751,
    },
    shortStory: "Algunas imágenes se sienten antes de comprenderse.",
    longStory: [
      "En esta obra, la textura se convierte en presencia: la piel, el cabello, la mirada, cada superficie construye una figura que parece extenderse más allá del papel.",
      "Un estudio sobre la materia y la capacidad del carboncillo para volverla casi tangible.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 3,
  },

  {
    slug: "toro-salvaje",
    title: "Toro Salvaje",
    year: 2025,
    technique: "Carboncillo sobre papel 100% algodón, 220 g/m²",
    /* 70 × 50 per the technical sheet PDF and confirmed by the client; the
       texts document lists 50 × 70. */
    dimensions: "70 × 50 cm",
    kind: "commission",
    status: "private-collection",
    image: {
      src: "/obra/toro-salvaje/principal.jpg",
      alt: "Carboncillo de un caballo al galope de frente, la crin al viento y el cuerpo emergiendo de un fondo de polvo y sombra.",
      width: 1080,
      height: 1880,
    },
    shortStory: "Hay una fuerza que no necesita imponerse para hacerse visible.",
    longStory: [
      "En el caballo conviven potencia y elegancia, impulso y dominio. Toro Salvaje nació como un encargo y, durante el proceso, se convirtió también en una reflexión sobre la libertad: esa capacidad de reconocer la propia fuerza y elegir qué hacer con ella.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 4,
  },

  {
    slug: "gracia",
    title: "Gracia",
    year: 2025,
    technique: "Carboncillo sobre papel 100% algodón, 220 g/m²",
    dimensions: "33 × 27 cm",
    kind: "commission",
    status: "private-collection",
    note: "Retrato infantil. Para el sitio se utiliza un título artístico y no el nombre de la retratada.",
    image: {
      src: "/obra/gracia/principal.jpg",
      alt: "Carboncillo de una niña pequeña con un lazo de encaje en el cabello y un vestido de puntilla, de ojos grandes y expresión serena.",
      width: 953,
      height: 1178,
    },
    shortStory: "Hay miradas que parecen conservar algo intacto.",
    longStory: [
      "En la suya, la inocencia convive con una quietud difícil de nombrar. Una dulzura serena que, durante el proceso de retratarla, terminó revelando algo más profundo.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 5,
  },

  {
    slug: "nina",
    title: "Nina",
    year: 2025,
    technique: "Carboncillo sobre papel 100% algodón, 220 g/m²",
    dimensions: "42 × 29,7 cm",
    kind: "commission",
    status: "private-collection",
    note: "Retrato de mascota.",
    image: {
      src: "/obra/nina/principal.jpg",
      alt: "Carboncillo de una perra golden retriever echada sobre una manta, con la boca abierta y la mirada hacia el frente.",
      width: 1242,
      height: 1806,
    },
    shortStory:
      "La identidad de Nina aparece también en el movimiento, en la energía, en esa forma particular de estar en el mundo.",
    longStory: [
      "Su expresión y su vitalidad fueron el punto de partida para retratar no solo sus rasgos, sino también ese carácter que la hace inconfundible.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 6,
  },

  {
    slug: "huella",
    title: "Huella",
    year: 2026,
    technique: "Carboncillo sobre papel 100% algodón, 270 g/m²",
    dimensions: "42 × 29,7 cm",
    kind: "commission",
    status: "private-collection",
    note: 'Retrato de mascota. Para el sitio se utiliza el título artístico "Huella".',
    image: {
      src: "/obra/huella/principal.jpg",
      alt: "Carboncillo de un bulldog francés de frente, con las orejas erguidas y una mancha clara en el pecho.",
      width: 847,
      height: 1232,
    },
    processVideos: [
      {
        src: "/video/huella-en-proceso.mp4",
        poster: "/video/huella-en-proceso.jpg",
        label: "El retrato de Huella en proceso.",
        portrait: true,
        caption: "Huella, en proceso.",
      },
    ],
    shortStory:
      "Existen vínculos que nos habitan aun cuando la ausencia ocupa su lugar.",
    longStory: [
      "Este retrato nace de aquello que permanece cuando una historia ha sido profundamente compartida.",
      "Una huella que permanece más allá de la imagen.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 7,
  },

  {
    slug: "molly",
    title: "Molly",
    year: 2026,
    technique: "Carboncillo sobre papel 100% algodón, 270 g/m²",
    dimensions: "33 × 27 cm",
    kind: "commission",
    status: "private-collection",
    note: "Retrato de mascota.",
    image: {
      src: "/obra/molly/principal.jpg",
      alt: "Carboncillo de una gata atigrada recostada sobre una tela, con una chapa colgando del collar y la mirada vuelta hacia un lado.",
      width: 1452,
      height: 1920,
    },
    processVideos: [
      {
        src: "/video/molly-en-proceso.mp4",
        poster: "/video/molly-en-proceso.jpg",
        label: "El retrato de Molly en proceso.",
        caption: "Molly, en proceso.",
      },
    ],
    shortStory:
      "En Molly, gran parte de su identidad parecía estar en el color.",
    longStory: [
      "Su pelaje carey, lleno de variaciones y contrastes, planteaba una pregunta: cuánto de ella permanecería al llevarla al carboncillo.",
      "La respuesta apareció durante el proceso. Al desaparecer el color, emergieron con mayor claridad los contrastes de su pelaje, la profundidad de su mirada y la elegancia de sus rasgos.",
      "El retrato, realizado para conservar el recuerdo de una compañera de trece años, terminó revelando algo más esencial: a veces, prescindir del color no significa perder información, sino descubrir otra forma de mirar.",
    ],
    featured: false,
    hasEditorialPage: false,
    printAvailable: false,
    order: 8,
  },

  {
    slug: "sueno-de-primavera",
    title: "Sueño de Primavera",
    attribution: "after William-Adolphe Bouguereau, Rêve de printemps (1901)",
    year: 2022,
    technique: "Grafito y carboncillo sobre papel 100% algodón, 220 g/m²",
    dimensions: "100 × 70 cm",
    status: "private-collection",
    image: {
      src: "/obra/sueno-de-primavera/principal.jpg",
      alt: "Carboncillo de una mujer sentada sobre un banco de piedra en un jardín, rodeada por tres querubines alados que le acercan flores.",
      width: 1376,
      height: 1920,
    },
    detailImages: [
      {
        src: "/obra/sueno-de-primavera/extra-01.jpg",
        alt: "La obra completa de frente: la mujer reclinada sobre el banco de piedra y los tres querubines que la rodean, entre el follaje del jardín.",
        width: 1376,
        height: 1920,
        caption: "La composición completa.",
      },
      {
        src: "/obra/sueno-de-primavera/extra-03.jpg",
        alt: "Dos impresiones de la obra sobre una mesa de madera, una detrás de otra, con el margen blanco del papel a la vista.",
        width: 1080,
        height: 1920,
        caption: "Dos ejemplares de la edición impresa.",
      },
    ],
    concept: "EL ORIGEN",
    shortStory:
      "En Rêve de printemps de William-Adolphe Bouguereau encontré una sensibilidad profundamente cercana a aquello que comenzaba a buscar en mi propio trabajo.",
    longStory: [
      "La belleza, la feminidad y, sobre todo, la capacidad de una expresión para sugerir algo que trasciende lo visible.",
      "La elección estuvo también ligada a mi formación en dibujo figurativo y a la tradición clásica que acompañaba ese aprendizaje. Reinterpretarla en carboncillo significó trasladar ese universo a un lenguaje diferente, despojado del color, donde la luz, los contrastes y las miradas adquirieran otro peso.",
      "Fue mi primera obra de gran formato y formó parte de mi primera exposición. Más que reproducir una imagen que admiraba, el proceso me permitió reconocer algo que continuaría apareciendo en mi trabajo años después: mi interés por aquello que una mirada puede contener sin llegar a explicarlo.",
    ],
    featuredLinkLabel: "Descubrir la obra",
    featured: true,
    hasEditorialPage: true,
    printAvailable: true,

    printEdition: {
      eyebrow: "Edición impresa",
      title: "Print de edición limitada",
      image: {
        src: "/obra/sueno-de-primavera/extra-02.jpg",
        alt: "El print de Sueño de Primavera enmarcado en negro con paspartú blanco, colgado sobre una pared clara en un interior.",
        width: 1920,
        height: 1920,
      },
      specs: [
        "Edición limitada de 10 ejemplares · Numerada y firmada por la artista",
        "Impresión Fine Art sobre Canson Infinity Edition Etching Rag, 100% algodón, 310 g/m², papel de calidad museo y libre de ácido",
        "Dimensiones del papel: 100 × 73 cm",
        "Cada ejemplar se entrega firmado, numerado y acompañado de su certificado de autenticidad",
      ],
      availability: "Último ejemplar disponible",
      details: {
        label: "Sobre el papel",
        body: "Canson Infinity Edition Etching Rag es un papel Fine Art 100% algodón de 310 g/m², libre de ácido y sin blanqueadores ópticos. Su superficie mate y de grano fino está concebida para reproducción artística de alta calidad y conservación a largo plazo.",
      },
      delivery: {
        label: "Entrega y envío",
        lines: [
          "En Santa Cruz de la Sierra: se entrega enmarcado.",
          "Envíos fuera de Santa Cruz de la Sierra e internacionales: la impresión se envía cuidadosamente protegida en un tubo rígido para Fine Art.",
        ],
      },
      action: { label: "Consultar por la edición", href: "/contacto" },
    },

    order: 9,
    featuredOrder: 1,
  },

  /*
   * PENDING — the work is unfinished and has no definitive photograph, so it
   * is absent from both source documents. Its text is the one approved in
   * docs/Copy.md §4. Adding `image` here replaces the placeholder everywhere.
   */
  {
    slug: "jesus-la-oveja-y-el-lobo",
    title: "Jesús, la oveja y el lobo",
    kind: "personal",
    image: null,
    ratio: "portrait",
    processVideos: [
      {
        src: "/video/jesus-en-proceso.mp4",
        poster: "/video/jesus-en-proceso.jpg",
        label:
          "Jesús, la oveja y el lobo en proceso, sobre el tablero de Mariela Crapuzzi.",
        portrait: true,
        caption:
          "La obra en curso. Las fotografías definitivas llegarán al terminarla.",
      },
    ],
    concept: "UNA VOZ PROPIA",
    shortStory:
      "Mi primera obra personal y el comienzo de una etapa más autoral: una búsqueda en la que la figuración se convierte en una manera de explorar ideas, símbolos e historias humanas.",
    featuredLinkLabel: "Conocer la obra",
    featured: true,
    hasEditorialPage: true,
    printAvailable: false,
    order: 10,
    featuredOrder: 3,
  },
];
