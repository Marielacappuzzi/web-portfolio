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
    /*
     * The page: the work, the reasoning, the making, the room.
     *
     * The richest of the three, and the sequence is built to slow down rather
     * than to show everything at once. The finished sheet takes a column and
     * is the only thing on its screen; the reasoning follows it; the two
     * process photographs pair unevenly so the drawing-in-progress leads; the
     * framed shot runs edge to edge because it is the one picture that answers
     * what a 100 x 70 charcoal looks like on a wall; the certificate closes
     * small, which is where it belongs.
     */
    story: [
      /*
        Three views across, then the reasoning, then the footage, then the
        certificate.

        The row is the piece seen three ways — being drawn, hung on a wall,
        standing on the easel — which is what the finished sheet beside the
        specification cannot show on its own. It is a row and not a carousel:
        three things a reader can take in at a glance should not be put behind
        a control.
      */
      {
        kind: "trio",
        images: [
          {
            src: "/obra/bajo-su-proteccion/extra-05.jpg",
            alt: "Mariela dibujando con un difumino sobre el papel: la leona ya está resuelta y la cría es todavía un trazo de contorno.",
            width: 1080,
            height: 1920,
            caption: "La leona resuelta; la cría, aún en contorno.",
          },
          {
            src: "/obra/bajo-su-proteccion/extra-04.jpg",
            alt: "La obra enmarcada en negro y colgada sobre una pared blanca, junto a un sillón claro y un aparador bajo con libros y un ramo de olivo.",
            width: 1536,
            height: 1920,
            caption: "La obra, enmarcada.",
          },
          {
            src: "/obra/bajo-su-proteccion/extra-03.jpg",
            alt: "La obra terminada sobre el caballete del taller, con la mesa de trabajo y el carro de materiales al lado.",
            width: 1080,
            height: 1920,
            caption: "Terminada, en el taller.",
          },
        ],
      },
      {
        kind: "text",
        paragraphs: [
          "La figura de la leona apareció como una forma de hablar de esa fuerza que convive con el cuidado: instinto, inteligencia, determinación. Una presencia que no necesita mostrarse agresiva para dejar claro que está ahí.",
          "La composición fue construida alrededor de esa idea. La cría ocupa el frente mientras la leona emerge detrás de ella, envolviéndola con su cuerpo y sosteniendo la escena con la mirada. Los contrastes profundos del carboncillo acentúan su carácter y dan peso a una imagen en la que conviven protección y fuerza.",
        ],
      },
      {
        kind: "video",
        videos: [
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
      },
      /*
        The signed certificate is no longer here, at the client's request. It
        was closing the page on a document rather than on the work, and the
        page now ends on the footage. The file stays in the folder.
      */
    ],
    /*
     * The work hung in a stone-walled room. The drawing sits dead centre of
     * the wide file, so the crop holds at 50% and narrowing the frame takes
     * evenly from both sides rather than sliding the piece off one edge.
     */
    banner: {
      src: "/obra/banners/bajo-su-proteccion.jpg",
      mobileSrc: "/obra/banners/bajo-su-proteccion-movil.jpg",
      alt: "La obra Bajo su Protección colgada en un interior de piedra y hormigón, iluminada de lado, con un banco de madera y un jarrón bajo ella.",
      focus: "50% 50%",
      mobileFocus: "50% 42%",
    },
    /* Las dos miradas, alineadas una sobre otra, a un tercio de la altura. */
    coverFocus: "50% 30%",
    /*
      The band level with the sheet is about 570px of a 1920px drawing, and
      the two faces span nearly twice that — the cub cannot fit here at any
      value. Rendered at 16, 24, 30 and 36 and looked: 30 centres her face
      whole, and the top of the cub's head just reaches the bottom edge.
    */
    sheetFocus: "50% 30%",
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
      width: 1439,
      height: 1920,
    },
    detailImages: [
      {
        src: "/obra/oltre-lo-sguardo/extra-07.jpg",
        alt: "La obra vista en diagonal, con el borde de la hoja entrando por la izquierda y la firma de la artista junto al hombro.",
        width: 1440,
        height: 1920,
        caption: "La hoja, en diagonal.",
      },
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
      width: 1411,
      height: 1920,
    },
    detailImages: [
      {
        src: "/obra/materia/extra-01.jpg",
        alt: "La obra enmarcada en negro con paspartú blanco, sobre un caballete de mesa entre plantas y otros retratos del taller.",
        width: 1080,
        height: 1920,
        caption: "Enmarcada, en el taller.",
      },
      {
        src: "/obra/materia/extra-02.jpg",
        alt: "La obra completa sujeta a la pared del taller con cinta de papel, con el trazo de las rastas y el vaquero a la vista.",
        width: 1440,
        height: 1920,
        caption: "La hoja completa, en la pared.",
      },
    ],
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
    /*
     * The only piece whose other views live outside its own folder: these were
     * shot for the studio and the commissions page and show this work being
     * made. Referenced where they sit rather than copied, so there is one file
     * per photograph and no pair to keep in step.
     */
    detailImages: [
      {
        src: "/encargos/proceso-movil.jpg",
        alt: "La mano de la artista con un carboncillo sobre la obra, trabajando la crin del caballo, con los lápices en la mesa.",
        width: 960,
        height: 1500,
        caption: "La crin, en proceso.",
      },
      {
        src: "/estudio/extra-06.jpg",
        alt: "La obra ya firmada sobre el tablero del taller, con la artista de espaldas trabajando el fondo de polvo con la mano enguantada.",
        width: 1280,
        height: 1920,
        caption: "El fondo, hacia el final.",
      },
    ],
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
    detailImages: [
      {
        src: "/obra/gracia/extra-01.jpg",
        alt: "La obra enmarcada en blanco con paspartú, sobre un caballete de pie delante de una pared cubierta de cuadros.",
        width: 1080,
        height: 1920,
        caption: "Enmarcada, sobre el caballete.",
      },
    ],
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
    detailImages: [
      {
        src: "/obra/nina/extra-01.jpg",
        alt: "La hoja apoyada en la mesa de trabajo, con los difuminos, el lápiz de carbón y el polvo del material junto al borde del papel.",
        width: 1439,
        height: 1920,
        caption: "La hoja, sobre la mesa de trabajo.",
      },
      {
        src: "/obra/nina/extra-04.jpg",
        alt: "La obra enmarcada en negro con paspartú blanco, sobre un caballete de mesa delante de los estantes del taller.",
        width: 1080,
        height: 1920,
        caption: "Enmarcada, sobre el caballete.",
      },
    ],
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
    /*
     * `extra-01` and `extra-02` are the same wall shot a few centimetres
     * apart; only one is declared, because a second thumbnail of the same
     * photograph is not another view.
     */
    detailImages: [
      {
        src: "/obra/huella/extra-01.jpg",
        alt: "La hoja completa sobre la pared clara del taller, con el pelaje del perro trabajado hasta el borde del papel.",
        width: 1080,
        height: 1920,
        caption: "La hoja completa, en la pared.",
      },
      {
        src: "/obra/huella/extra-03.jpg",
        alt: "La obra enmarcada en negro con paspartú blanco, apoyada en un caballete de mesa junto a los carboncillos y difuminos.",
        width: 1166,
        height: 1920,
        caption: "Enmarcada, sobre la mesa de trabajo.",
      },
    ],
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
    detailImages: [
      {
        src: "/obra/molly/extra-01.jpg",
        alt: "La obra enmarcada en negro con paspartú blanco, sobre un caballete de pie delante de una pared con otros cuadros.",
        width: 1079,
        height: 1920,
        caption: "Enmarcada, sobre el caballete.",
      },
      {
        src: "/obra/molly/extra-02.jpg",
        alt: "Encuadre cerrado sobre la gata, donde se distingue el pelaje mechón por mechón y el nombre grabado en la chapa del collar.",
        width: 1438,
        height: 1920,
        caption: "El pelaje, mechón por mechón.",
      },
    ],
    processVideos: [
      {
        src: "/video/molly-en-proceso.mp4",
        poster: "/video/molly-en-proceso.jpg",
        label: "El retrato de Molly en proceso.",
        caption: "Molly, en proceso.",
        /*
         * The file is a 1280x720 container, but the picture inside it is a
         * 396x720 vertical strip with black bars either side — shot on a
         * phone and exported into a landscape frame. Declaring it portrait
         * lets object-cover crop the bars away instead of showing them.
         */
        portrait: true,
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
    /*
     * The page: the lightest of the three, and the only one with something
     * that can actually be acquired at the end of it.
     *
     * `extra-01` is deliberately absent. It is the same composition as
     * `principal.jpg` at a slightly tighter crop — near enough that showing
     * both would be the repetition this rewrite exists to remove. One plate of
     * the drawing, the reasoning beside it, then the edition: the framed print
     * in a room, and the two copies on the table.
     *
     * Nothing here runs edge to edge. The whole sequence stays inside the
     * column, and that restraint is what makes this the quiet one of the three.
     */
    story: [
      /*
        Three views, then the reasoning. The lightest of the three pages, and
        the only one where nothing runs edge to edge.

        `extra-01` earns its place here now. Against a full portrait plate it
        was a near-duplicate of `principal.jpg`; beside the landscape crop that
        opens the page it is the one image that shows the composition entire,
        which is a different thing to show.
      */
      {
        kind: "trio",
        images: [
          {
            src: "/obra/sueno-de-primavera/extra-01.jpg",
            alt: "La obra completa de frente: la mujer reclinada sobre el banco de piedra y los tres querubines que la rodean, entre el follaje del jardín.",
            width: 1376,
            height: 1920,
            caption: "La composición completa.",
          },
          {
            src: "/obra/sueno-de-primavera/extra-02.jpg",
            alt: "El print de Sueño de Primavera enmarcado en negro con paspartú blanco, colgado sobre una pared clara junto a un ventanal.",
            width: 1920,
            height: 1920,
            caption: "La edición, enmarcada.",
          },
          {
            src: "/obra/sueno-de-primavera/extra-03.jpg",
            alt: "Dos impresiones de la obra sobre una mesa de madera, una detrás de otra, con el margen blanco del papel a la vista.",
            width: 1080,
            height: 1920,
            caption: "Dos ejemplares de la edición impresa.",
          },
        ],
      },
      {
        kind: "text",
        paragraphs: [
          "La belleza, la feminidad y, sobre todo, la capacidad de una expresión para sugerir algo que trasciende lo visible.",
          "La elección estuvo también ligada a mi formación en dibujo figurativo y a la tradición clásica que acompañaba ese aprendizaje. Reinterpretarla en carboncillo significó trasladar ese universo a un lenguaje diferente, despojado del color, donde la luz, los contrastes y las miradas adquirieran otro peso.",
          "Fue mi primera obra de gran formato y formó parte de mi primera exposición. Más que reproducir una imagen que admiraba, el proceso me permitió reconocer algo que continuaría apareciendo en mi trabajo años después: mi interés por aquello que una mirada puede contener sin llegar a explicarlo.",
        ],
      },
    ],
    /*
     * Held slightly right of centre: the piece hangs at about 58% of the wide
     * file, with a tall window on the left. Centring the crop would push the
     * frame towards that window as the screen narrows and leave the drawing
     * clipped on the right.
     */
    banner: {
      src: "/obra/banners/sueno-de-primavera.jpg",
      mobileSrc: "/obra/banners/sueno-de-primavera-movil.jpg",
      alt: "El print de Sueño de Primavera enmarcado sobre una pared clara, junto a un ventanal en arco que da al jardín.",
      focus: "58% 50%",
      mobileFocus: "50% 40%",
    },
    /* El rostro de la figura central y los querubines que la rodean. */
    coverFocus: "50% 26%",
    /* The seated figure and all three cherubs inside the band. */
    sheetFocus: "50% 20%",
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
      action: { label: "Consultar por la edición", href: "/encargos#cotizar" },
    },

    order: 9,
    featuredOrder: 3,
  },

  /*
   * PENDING — the work is unfinished and has no definitive photograph, so it
   * is absent from both source documents. Its text is the one approved in
   * docs/Copy.md §4. Adding `image` here replaces the placeholder everywhere.
   */
  {
    /*
     * Renamed from "Jesús, la oveja y el lobo" to "El Rescate". The slug and
     * the asset paths keep the old name on purpose: the brief allows it where
     * changing them would break links, and nothing visible reads a slug.
     */
    slug: "jesus-la-oveja-y-el-lobo",
    /*
     * The page: two plates and nothing padding them out.
     *
     * This is everything that exists — one photograph of the work in progress
     * and one clip of the same session. There is no finished plate, no framed
     * shot and no technical sheet, because the piece is unfinished and none of
     * that has been made yet. The answer to thin material is scale, not
     * filler: the jaws run edge to edge at the full width of the screen, which
     * is the most violent thing on the site, and the clip follows. A short,
     * hard page.
     */
    story: [
      /*
        One block, because one is what exists.

        The plate of the work in progress now sits beside the sheet at the top
        of the page, so repeating it here would be the page showing the same
        photograph twice. What is left is the clip of that session — and no
        finished plate, no framed shot and no room, because the piece is
        unfinished and none of them have been made.
      */
      {
        kind: "video",
        videos: [
          {
            src: "/video/jesus-en-proceso.mp4",
            poster: "/video/jesus-en-proceso.jpg",
            label: "El Rescate en proceso, sobre el tablero de Mariela Crapuzzi.",
            portrait: true,
            caption:
              "La obra en curso. Las fotografías definitivas llegarán al terminarla.",
          },
        ],
      },
    ],
    /*
     * The wolf runs across the middle of the frame, from about 30% to 70%.
     * Centre holds it whole at every width; the dark floor and window at the
     * left are what the title sits on.
     */
    banner: {
      src: "/obra/banners/el-rescate.jpg",
      mobileSrc: "/obra/banners/el-rescate-movil.jpg",
      alt: "La obra El Rescate colgada en una sala oscura de hormigón, con un ventanal a la izquierda que da a un bosque de montaña.",
      focus: "50% 50%",
      mobileFocus: "50% 45%",
    },
    /* Las fauces del lobo, que es lo que la obra pone primero. */
    coverFocus: "50% 22%",
    /* The jaws centred, with both hands still in frame. */
    sheetFocus: "50% 35%",
    title: "El Rescate",
    kind: "personal",
    /*
     * The piece is unfinished, so this is the work in progress rather than a
     * finished plate: the wolf resolved, the sheet still on the board, her
     * hand in the frame. Better than a declared placeholder, and honest about
     * what it is — the caption says so wherever it appears.
     */
    image: {
      src: "/obra/jesus-oveja-lobo/jesus-en-proceso.jpg",
      alt: "La obra en proceso: el lobo a carboncillo con las fauces abiertas, y la mano de Mariela trabajando sobre él con un difumino.",
      width: 900,
      height: 1600,
    },
    ratio: "portrait",
    processVideos: [
      {
        src: "/video/jesus-en-proceso.mp4",
        poster: "/video/jesus-en-proceso.jpg",
        label:
          "El Rescate en proceso, sobre el tablero de Mariela Crapuzzi.",
        portrait: true,
        caption:
          "La obra en curso. Las fotografías definitivas llegarán al terminarla.",
      },
    ],
    concept: "UNA VOZ PROPIA",
    shortStory:
      "Mi primera obra personal y el comienzo de una etapa más autoral: una búsqueda en la que la figuración se convierte en una manera de explorar ideas, símbolos e historias humanas.",
    featured: true,
    hasEditorialPage: true,
    printAvailable: false,
    order: 10,
    featuredOrder: 1,
  },
];
