import type { CommissionsPage } from "../types";

/**
 * /encargos — rebuilt as a page someone can use.
 *
 * What was removed, and why:
 *
 *  · The five stages (escuchar, encontrar la imagen, interpretar, crear,
 *    proteger y entregar). A person deciding whether to ask for a price does
 *    not first need to follow how Mariela reasons through each decision.
 *  · "Encargos realizados", a row of four finished pieces. They are all in the
 *    gallery, each labelled as a commission — this was a second gallery with
 *    the same photographs in it.
 *  · Two videos of commissions in progress, for the same reason.
 *  · The closing invitation, which repeated the form directly above it.
 *
 * What is left is the order somebody actually needs: what can be asked for,
 * what to send, the form, and then — for whoever wants it — every practical
 * figure Mariela supplied. Nothing here is invented; see the note on prices at
 * the foot of this file.
 */
export const commissions: CommissionsPage = {
  heading: {
    eyebrow: "Encargos",
    title: "Una obra creada a partir de aquello que *quieres conservar*.",
  },

  intro: {
    paragraph:
      "Retratos de personas, mascotas, homenajes y composiciones creadas a partir de una historia, una imagen o un vínculo.",
    action: { label: "Cotizar un encargo", href: "#cotizar" },
  },

  /*
   * The only thing said before the form: what to have ready. Three
   * instructions, in the order the fields ask for them.
   */
  brief: {
    title: "Cómo solicitar una cotización",
    paragraph:
      "Elige el formato que tienes en mente, comparte brevemente la idea detrás de la obra y envía las fotografías de referencia disponibles. Con esa información, Mariela podrá evaluar el proyecto y enviarte una cotización personalizada.",
  },

  quote: {
    kind: "Cotización de encargo",
    title: "Cotiza tu obra por encargo.",
    paragraph:
      "Cuéntame brevemente qué te gustaría convertir en una obra, selecciona el formato que tienes en mente y comparte las referencias disponibles. Con esa información podré evaluar el proyecto y enviarte una cotización.",
    fields: [
      { name: "nombre", label: "Nombre", kind: "text", required: true },
      {
        name: "correo",
        label: "Correo electrónico",
        kind: "email",
        required: true,
      },
      { name: "telefono", label: "Teléfono", kind: "tel", required: false },
      { name: "lugar", label: "País o ciudad", kind: "text", required: true },
      {
        name: "tipo",
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
        /*
          The four real formats, plus the honest fifth option. Someone who does
          not know what 30 × 42 cm looks like on a wall should not have to
          guess in order to send the form.
        */
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
      "Gracias. Recibí tu solicitud y revisaré el proyecto para enviarte una cotización.",
    confirmationNote:
      "Te escribiré al correo que dejaste. Si necesito ver las fotografías de referencia, te las pediré en esa misma respuesta.",
  },

  /*
   * After the form, for whoever wants to go deeper. Every figure here was
   * supplied by Mariela: the four formats, two weeks for an A3 and about a
   * month for a 70 × 100, the 50% deposit, the three payment methods, framed
   * delivery in Santa Cruz, and shipping quoted per destination.
   *
   * Rendered as disclosures, so the page does not make anyone read eight
   * headings before reaching the form — which is above this block anyway.
   */
  practical: {
    eyebrow: "Para saber más",
    title: "Detalles del encargo",
    sections: [
      {
        title: "Fotografías de referencia",
        body: [
          "Idealmente las fotografías deben tener buena resolución y enfoque suficiente, con una iluminación que permita comprender los volúmenes, los ojos visibles y una expresión natural, evitando filtros fuertes.",
          "Una fotografía técnicamente imperfecta no descarta necesariamente un encargo. En homenajes y en retratos de personas o animales que ya no están, es habitual que el material disponible sea limitado: puede evaluarse y, cuando es posible, combinarse distintas referencias.",
        ],
      },
      {
        title: "Formatos disponibles",
        body: ["Actualmente se trabajan cuatro formatos principales:"],
        bullets: ["27 × 33 cm", "30 × 42 cm", "50 × 70 cm", "70 × 100 cm"],
      },
      {
        title: "",
        body: [
          "Los formatos pequeños están pensados principalmente para retratos individuales. Los mayores permiten incorporar más de una figura, composiciones más complejas y mayor profundidad narrativa.",
          "También puede evaluarse un formato especial cuando la composición de la obra lo requiera.",
        ],
      },
      {
        title: "Tiempos de realización",
        body: [
          "Como referencia, una obra en formato A3 —aproximadamente 30 × 42 cm— requiere alrededor de dos semanas. Una obra de aproximadamente 70 × 100 cm, alrededor de un mes.",
          "Son tiempos aproximados. Pueden variar según el tamaño, la cantidad de figuras, el nivel de detalle, la complejidad de la composición y el material de referencia disponible.",
        ],
      },
      {
        title: "Reserva y anticipo",
        body: [
          "Para comenzar un encargo se solicita un 50% de anticipo, que reserva el trabajo e inicia el proceso.",
          "El 50% restante se abona al terminar la obra y, si requiere envío, antes de su despacho.",
        ],
      },
      {
        title: "Formas de pago",
        body: [
          "Transferencia bancaria. Para operaciones internacionales, también PayPal y Takenos.",
          "En prints y en obras ya terminadas, el pago se realiza en su totalidad antes de la entrega o del envío.",
        ],
      },
      {
        title: "Entrega y embalaje",
        body: [
          "En Santa Cruz de la Sierra los encargos suelen entregarse enmarcados.",
          "Los prints se protegen con papel libre de ácido, luego con material de amortiguación, y se envían dentro de un tubo rígido adecuado para obra sobre papel.",
        ],
      },
      {
        title: "Envíos",
        body: [
          "Actualmente se realizan entregas dentro de Bolivia. Los envíos internacionales pueden evaluarse según el destino.",
          "Hasta contar con una logística internacional estandarizada, los costos, tiempos y condiciones se cotizan de forma individual para cada envío.",
        ],
      },
    ],
  },

  /*
   * Two questions, not fourteen.
   *
   * Of the four the brief proposed, two were already answered word for word in
   * the block above: reference photographs of poor quality, and international
   * shipping. Both are the second paragraph of their own section, a screen
   * higher. Asking them again would make the page read as padding, which is
   * the thing this rewrite exists to remove.
   *
   * What survives is the two the practical detail genuinely leaves open —
   * whether a commission can start without a decided image, and whether
   * several photographs can become one composition. Neither is a matter of
   * process or price, so neither has anywhere else to be answered.
   */
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que suelen preguntarme.",
    items: [
      {
        question: "¿Puedo encargar una obra aunque no tenga clara la imagen final?",
        answer: [
          "Sí. Puede partir de una historia, una persona, un animal, un vínculo o una idea.",
          "Las referencias disponibles se evalúan para encontrar la mejor forma de representarla.",
        ],
      },
      {
        question: "¿Puedo combinar varias fotografías?",
        answer: [
          "Sí, cuando el proyecto lo permita pueden utilizarse diferentes referencias para construir una composición.",
        ],
      },
    ],
  },
};

/*
 * PENDING — prices.
 *
 * The page explains formats, timings, the deposit and how to pay, but never
 * what a commission costs, because no price list was supplied. Every enquiry
 * therefore has to be answered by hand. If Mariela wants a starting figure per
 * format on the page, the four numbers are all that is missing.
 *
 * PENDING — reference photograph uploads. See QuoteForm in types.ts and the
 * note in CommissionForm: the form asks for references in words because there
 * is no file storage in this project yet.
 */
