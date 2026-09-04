import type { ContactPage } from "../types";

/**
 * The four answers to "¿Qué te interesa?", named so nothing depends on a
 * string being retyped identically in three files: the form's options, the
 * hash that preselects one of them, and the rule that decides which a given
 * work may offer.
 */
export const enquiryOptions = {
  original: "La obra original",
  print: "Un print de la obra",
  both: "Ambas opciones",
  other: "Otra consulta",
} as const;

/**
 * The line under the heading, in three versions, because it has to be true.
 *
 * "Consultar por la obra original o por uno de sus prints" is right on El
 * Rescate, where both can be had. On Sueño de Primavera the original is in a
 * private collection and only the edition is left, so the same sentence
 * invites an enquiry the page cannot answer.
 */
export const enquiryIntros = {
  both: "Escríbeme para consultar por la obra original o por uno de sus prints.",
  printOnly:
    "Escríbeme para consultar por uno de los prints disponibles de esta obra.",
  originalOnly: "Escríbeme para consultar por la obra original.",
} as const;

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
    /*
      "uno de sus prints", the client's wording. "La edición impresa" is the
      right term for Sueño de Primavera, which has a numbered edition of ten
      on a named paper; on El Rescate it promises a formality that has not
      been described yet, and it is not what anyone would call it.
    */
    "Escríbeme para consultar por la obra original o por uno de sus prints.",
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
        The full set. Each work's page narrows it to what that work actually
        has — see `shapeEnquiry` — so nobody is offered the original of a
        drawing that hangs in someone's house. This list is the vocabulary,
        not the menu.
      */
      options: [
        enquiryOptions.original,
        enquiryOptions.print,
        enquiryOptions.both,
        enquiryOptions.other,
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
