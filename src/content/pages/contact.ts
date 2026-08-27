import type { ContactPage } from "../types";

/**
 * /contacto — general enquiries.
 *
 * Four fields. It used to carry six, including phone, country and a "Retrato
 * por encargo" option in the reason list — which made it a slightly shorter
 * version of the commission form, under a different title. Anyone who wants a
 * quote now has a form built for that on /encargos, with formats and a brief;
 * this one is for the person asking about an available work, a print, an
 * exhibition, or anything that is not a price.
 *
 * The heading changed for the same reason. It read "Cuéntame la historia que
 * te gustaría convertir en una obra" — an invitation to commission something,
 * on the page that is explicitly not for that.
 */
export const contact: ContactPage = {
  heading: {
    eyebrow: "Contacto",
    title: "Consultar por una *obra*.",
  },
  paragraphs: [
    "Escríbeme por una obra disponible, un print, una exposición o cualquier otra consulta.",
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
      name: "motivo",
      label: "Motivo de consulta",
      kind: "select",
      required: true,
      /*
       * No "Retrato por encargo" here. It is the one reason that has a page
       * and a form of its own, and leaving it in this list is what made the
       * two forms compete.
       */
      options: [
        "Obra disponible",
        "Print",
        "Galería o exposición",
        "Prensa o colaboración",
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
    "Gracias por escribir. Revisaré tu mensaje y me pondré en contacto contigo.",
  confirmationNote: "Suelo responder en el transcurso de la semana.",
  channelsLabel: "También puedes escribirme",

  /* The one place the two forms are told apart, for whoever landed here first. */
  commissionNote: {
    text: "¿Quieres encargar una obra? La cotización tiene su propio formulario, con formatos y referencias.",
    action: { label: "Cotizar un encargo", href: "/encargos#cotizar" },
  },
};
