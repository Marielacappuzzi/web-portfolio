import { processSteps } from "../process";
import type { CommissionsPage } from "../types";

/**
 * /encargos — Copy.md §7, plus the five stages read as what a client can
 * expect.
 *
 * PENDING: the brief asks this page to also cover reference photographs,
 * formats, timings, deposit, payment, delivery, shipping and FAQ. No approved
 * copy exists for any of it, so `practical.topics` lists the headings and the
 * page renders them as declared gaps. Writing them requires Mariela's real
 * figures — inventing prices or turnaround times here would be a liability.
 * See docs/CONTENT_PENDING.md #16.
 */
export const commissions: CommissionsPage = {
  /*
   * The pause before the form.
   *
   * Toro Salvaje under the hand that is drawing it, with the charcoal sticks
   * on the tray beside the sheet. It says what a commission actually is —
   * someone making something by hand — which is the argument the page needs
   * before it starts asking for a name and an email, and it says it without
   * a word of copy.
   *
   * Two files. 1920 x 600 is 3.2:1 and on a phone that leaves the horse an
   * inch tall, so the portrait file reframes the same moment: the hand, the
   * pencil and the whole head, top to bottom.
   */
  banner: {
    src: "/encargos/proceso.jpg",
    mobileSrc: "/encargos/proceso-movil.jpg",
    alt: "La mano de Mariela Crapuzzi trabajando con un carboncillo sobre el dibujo de un caballo al galope, con la bandeja de barras de carboncillo y los difuminos junto al papel.",
  },

  heading: {
    eyebrow: "Obras por encargo",
    title: "Una historia personal, interpretada en una *obra única*.",
  },
  paragraphs: [
    "Un retrato no comienza con una fotografía. Comienza con una conversación.",
    "Puede nacer de una persona, una mascota, un recuerdo, un homenaje o una idea que todavía no tiene una imagen definitiva.",
    "A partir de esa historia, trabajo la selección de referencias, la composición y la expresión para crear una obra que no se limite a reproducir un parecido, sino que conserve aquello que ese vínculo representa.",
  ],

  kinds: {
    label: "Tipos de encargos",
    items: [
      "Retratos de personas",
      "Retratos de mascotas",
      "Homenajes",
      "Composiciones simbólicas",
      "Obras creadas a partir de una historia o concepto",
    ],
  },

  process: {
    eyebrow: "Cómo comienza una obra",
    title: "Toda obra comienza antes del *primer trazo*.",
    intro:
      "El proceso comienza escuchando. Antes de definir una composición necesito comprender qué historia existe detrás, qué emoción debe permanecer y qué elementos son realmente esenciales.",
    steps: processSteps,
  },

  practical: {
    eyebrow: "Antes de comenzar",
    title: "Detalles del encargo",
    sections: [
      {
        title: "Fotografías de referencia necesarias",
        body: [
          "Idealmente, las fotografías deben tener buena resolución, enfoque suficiente, iluminación que permita comprender los volúmenes, ojos claramente visibles y una expresión natural, evitando filtros fuertes.",
          "Sin embargo, una fotografía técnicamente imperfecta no descarta necesariamente un encargo. En homenajes o retratos donde las imágenes disponibles son limitadas, el material puede evaluarse para encontrar la mejor solución posible a partir de diferentes referencias.",
        ],
      },
      {
        title: "Formatos disponibles",
        body: [
          "Actualmente se trabajan cuatro formatos principales:",
        ],
        bullets: ["27 × 33 cm", "30 × 42 cm", "50 × 70 cm", "70 × 100 cm"],
      },
      {
        title: "",
        body: [
          "Los formatos pequeños están pensados principalmente para retratos individuales, mientras que los formatos mayores permiten desarrollar composiciones más complejas, incorporar más de una figura y trabajar con mayor profundidad narrativa.",
          "También puede evaluarse un formato especial cuando la composición de la obra lo requiera.",
        ],
      },
      {
        title: "Tiempos de realización",
        body: [
          "Como referencia, una obra en formato A3 requiere aproximadamente dos semanas. Una obra de aproximadamente 70 × 100 cm puede requerir alrededor de un mes.",
          "Los tiempos pueden variar según el tamaño, la cantidad de figuras, el nivel de detalle, la complejidad de la composición y el material de referencia disponible.",
        ],
      },
      {
        title: "Reserva y anticipo",
        body: [
          "Para comenzar un encargo personalizado se solicita un 50% de anticipo, que permite reservar el trabajo e iniciar el proceso.",
          "El 50% restante se abona una vez finalizada la obra y, en caso de requerir envío, antes de su despacho.",
        ],
      },
      {
        title: "Formas de pago",
        body: [
          "Se aceptan pagos mediante transferencia bancaria. Para operaciones internacionales también están disponibles PayPal y Takenos.",
          "En el caso de prints u obras ya terminadas, el pago se realiza en su totalidad antes de la entrega o del envío.",
        ],
      },
      {
        title: "Entrega y embalaje",
        body: [
          "En Santa Cruz de la Sierra, los encargos suelen entregarse enmarcados.",
          "En el caso de los prints, la obra se protege primero con papel libre de ácido, luego con material de amortiguación y finalmente se coloca dentro de un tubo rígido especial para obras sobre papel.",
          "La forma de preparación puede adaptarse según el formato y el destino, priorizando siempre la correcta conservación de la obra.",
        ],
      },
      {
        title: "Envíos",
        /*
          Rewritten by the client. The previous copy said deliveries were made
          within Bolivia and that international ones "could be evaluated" —
          written when there was no international logistics yet. Mariela now
          ships worldwide, so the hedge is gone and only the part that is still
          true remains: the cost depends on where it goes and on the piece.
        */
        body: [
          "Se realizan envíos a Bolivia y al resto del mundo.",
          "Los costos y tiempos de entrega se cotizan según el destino y las características de cada obra.",
        ],
      },
    ],
  },

  /*
   * The FAQ extends the block above; it never restates it.
   *
   * Ten of the fourteen questions supplied were already answered in full a
   * screen earlier — photographs, formats, timings, deposit, payment,
   * shipping, packing, framing. Asking them again would have made the page
   * read as padding. What survives is the four that add something: how a
   * commission actually starts, and the three reassurances a person needs
   * before writing — that the image need not be decided, that references can
   * be combined, and that poor or old photographs do not rule anything out.
   */
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que suelen preguntarme.",
    items: [
      /*
        "¿Cómo puedo encargar una obra?" removed: the form above answers it
        by asking for exactly what its answer described.
      */
      {
        question:
          "¿Puedo encargar una obra aunque todavía no tenga clara la imagen final?",
        answer: [
          "Sí. Una obra puede comenzar desde una historia, un vínculo, una emoción o una idea.",
          "Parte del proceso consiste en comprender aquello que se quiere representar, analizar las referencias disponibles y encontrar una composición capaz de transmitirlo.",
        ],
      },
      {
        question: "¿Puedo combinar varias fotografías en una misma obra?",
        answer: [
          "Sí, cuando la composición lo permita.",
          "Pueden utilizarse distintas referencias para construir una nueva imagen, seleccionando qué elementos conservar, modificar o dejar fuera según la historia que se quiera representar.",
        ],
      },
      {
        question:
          "¿Y si solo tengo fotografías antiguas, o quiero encargar un homenaje?",
        answer: [
          "Puedes enviarlas igualmente. Especialmente en homenajes o retratos de personas o animales que ya no están, es normal que las imágenes disponibles sean limitadas.",
          "El material se evalúa antes de comenzar y, cuando es posible, pueden combinarse distintas referencias para construir una imagen adecuada.",
          "En estos casos el proceso comienza comprendiendo la historia, el vínculo y aquello que se desea conservar a través de la obra.",
        ],
      },
    ],
  },

  /*
   * One ask, and it names the action. "Contar mi historia" described a mood;
   * a reader at the foot of this section has already decided and wants the
   * button that starts it. The second link went back to the gallery they just
   * came through, which is an exit, not an offer.
   */
  closing: {
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
    paragraph:
      "Compárteme brevemente qué te gustaría conservar o transmitir. Ese será el primer paso para comprender si podemos transformarlo en una obra.",
    primaryAction: { label: "Solicitar un encargo", href: "/#contacto" },
  },

  /*
   * The quotation form. It is the point of the page: everything above it
   * exists to get someone here, and everything below is for whoever wants
   * to read further before writing.
   *
   * PENDING: reference photographs cannot be attached. The contact endpoint
   * posts JSON to Resend and has no file handling; improvising an upload
   * without storage would be worse than asking for them by reply, so the
   * confirmation says so plainly instead.
   */
  quote: {
    form: "cotizacion",
    kindLabel: "Cotización de encargo",
    heading: { title: "Cotiza tu obra por *encargo*." },
    paragraphs: [
      "Cuéntame brevemente qué te gustaría convertir en una obra, selecciona el formato que tienes en mente y comparte las referencias disponibles. Con esa información podré evaluar el proyecto y enviarte una cotización.",
    ],
    fields: [
      { name: "nombre", label: "Nombre", kind: "text", required: true },
      {
        name: "correo",
        label: "Correo electrónico",
        kind: "email",
        required: true,
      },
      {
        name: "telefono",
        label: "Teléfono",
        hint: "Opcional",
        kind: "tel",
        required: false,
      },
      { name: "lugar", label: "País o ciudad", kind: "text", required: true },
      {
        name: "motivo",
        label: "Tipo de encargo",
        kind: "select",
        required: true,
        options: [
          "Retrato de persona",
          "Retrato de mascota",
          "Homenaje",
          "Composición simbólica",
          "Obra a partir de una historia o concepto",
          "Otro",
        ],
      },
      {
        name: "formato",
        label: "Formato deseado",
        kind: "select",
        required: true,
        options: [
          "27 × 33 cm",
          "30 × 42 cm",
          "50 × 70 cm",
          "70 × 100 cm",
          "Quiero asesoramiento sobre el formato",
        ],
      },
      {
        name: "mensaje",
        label: "Descripción del encargo",
        hint: "Cuéntame brevemente qué te gustaría representar, para quién es la obra y cualquier información que consideres relevante.",
        kind: "textarea",
        required: true,
      },
    ],
    submitLabel: "Solicitar cotización",
    confirmation:
      "Gracias por escribirme. Revisaré tu proyecto y te enviaré una cotización.",
    confirmationNote:
      "Si tienes fotografías de referencia, puedes responder a mi correo y adjuntarlas.",
    channelsLabel: "También puedes escribirme por",
  },
};
