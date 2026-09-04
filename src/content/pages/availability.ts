import type { ContactPage } from "../types";

/**
 * The enquiry a reader sends from a work's own page.
 *
 * A third form, and it exists because the other two do not fit. /encargos asks
 * what you want made — formats, references, a description of a piece that does
 * not exist yet. Someone looking at a finished drawing is asking the opposite
 * question: whether this one, or a print of it, can still be had. Sending them
 * to the commission form meant filling in "Formato deseado" for a work whose
 * dimensions are printed on the same screen.
 *
 * Four fields, because that is all it takes. Which work is being asked about
 * travels with the message — the form is on the piece's own page, so the
 * reader should not have to type its name and Mariela should not have to guess.
 *
 * `obra` is declared here but never rendered: the page supplies it, the server
 * validates against this list, and it appears as the first row of the email.
 */
export const availability: ContactPage = {
  form: "disponibilidad",
  kindLabel: "Consulta por una obra",

  heading: {
    title: "¿Te interesa esta *obra*?",
  },
  paragraphs: [
    "Escríbeme para consultar por la obra original o por la edición impresa.",
  ],

  fields: [
    /* Filled by the page, not by the reader. See the note above. */
    { name: "obra", label: "Obra", kind: "text", required: true },
    { name: "nombre", label: "Nombre", kind: "text", required: true },
    {
      name: "correo",
      label: "Correo electrónico",
      kind: "email",
      required: true,
    },
    /*
      Where it would go. The edition is priced without shipping — the cost
      depends on the destination, and framing only exists as an option in
      Santa Cruz — so an enquiry that does not say where the person is costs
      a round trip before Mariela can answer the one question they asked.
      The commission form asks the same thing under the same label.
    */
    { name: "lugar", label: "País o ciudad", kind: "text", required: true },
    {
      name: "interes",
      label: "¿Qué te interesa?",
      kind: "select",
      required: true,
      /*
        Both are offered on every work, whatever its current state. A piece
        with the original sold still takes enquiries about its edition, and a
        reader who asks about something unavailable gets a real answer rather
        than a form that would not let them ask.
      */
      options: [
        "La obra original",
        "Un print de la obra",
        "Ambas opciones",
        "Otra consulta",
      ],
    },
    {
      name: "mensaje",
      label: "Mensaje",
      kind: "textarea",
      required: true,
    },
  ],

  submitLabel: "Enviar consulta",
  confirmation:
    "Gracias por escribir. Te responderé con la disponibilidad y los detalles.",
  confirmationNote: "Suelo responder en el transcurso de la semana.",
  channelsLabel: "También puedes escribirme",

  /*
    The way to the other form. Not part of ContactPage — that type lost its
    `commissionNote` when /contacto went away — so the work page renders it.
  */
};

/**
 * The same four fields under two different questions.
 *
 * A work with an edition carries two asks, and they are not the same
 * enquiry: one is about a unique drawing, the other about a copy that can be
 * printed again. Sending both to a form headed "¿Te interesa esta obra?" with
 * a dropdown asking which, right after the reader pressed a button that said
 * which, is a question answered twice.
 *
 * So the button decides the form. Each mode sets the heading, the line under
 * it, and the value of `interes` — which stops being a field the reader fills
 * and becomes one the page already knows, travelling in the payload so the
 * enquiry still arrives naming what it is about.
 *
 * `default` is what a reader sees arriving with no hash at all — from a
 * bookmark, or scrolling past. There the dropdown is the right question,
 * because nothing has been asked yet.
 */
export const availabilityModes = {
  original: {
    title: "Consultar por la *obra original*",
    paragraph:
      "Escríbeme y te comparto la disponibilidad, las medidas y los detalles de la pieza.",
    interes: "La obra original",
  },
  print: {
    title: "Consultar por los *prints*",
    paragraph:
      "Escríbeme y te comparto los formatos disponibles, el papel y los detalles de la edición.",
    interes: "Un print de la obra",
  },
  default: {
    title: "¿Te interesa esta *obra*?",
    paragraph:
      "Escríbeme para consultar por la obra original o por la edición impresa.",
    interes: null,
  },
} as const;
