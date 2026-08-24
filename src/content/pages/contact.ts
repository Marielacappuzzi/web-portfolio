import type { ContactPage } from "../types";

/**
 * /contacto — Copy.md §10, including the exact field labels and hints.
 *
 * The form is the primary channel; email and Instagram are secondary and
 * WhatsApp is deliberately absent. PENDING: no submission endpoint has been
 * decided. See docs/CONTENT_PENDING.md #21.
 */
export const contact: ContactPage = {
  heading: {
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
  },
  paragraphs: [
    "Puede ser un recuerdo, una persona, un animal, un vínculo o una idea que todavía no encontró su imagen.",
    "Compárteme brevemente qué te gustaría conservar o transmitir. Ese será el primer paso para comprender si podemos transformarlo en una obra.",
  ],

  fields: [
    {
      name: "nombre",
      label: "Nombre",
      hint: "¿Cómo te llamas?",
      kind: "text",
      required: true,
    },
    {
      name: "correo",
      label: "Correo electrónico",
      hint: "¿Dónde puedo responderte?",
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
    {
      name: "lugar",
      label: "País o ciudad",
      kind: "text",
      required: false,
    },
    {
      name: "motivo",
      label: "Motivo de la consulta",
      kind: "select",
      required: true,
      options: [
        "Obra disponible",
        "Retrato por encargo",
        "Print",
        "Galería o colaboración",
        "Otra consulta",
      ],
    },
    {
      name: "mensaje",
      label: "Mensaje",
      hint: "Cuéntame brevemente la historia, idea o consulta que te gustaría compartir.",
      kind: "textarea",
      required: true,
    },
  ],

  submitLabel: "Enviar mi consulta",
  confirmation:
    "Gracias por compartir tu historia. Revisaré tu mensaje y me pondré en contacto contigo personalmente.",
  confirmationNote:
    "Suelo responder en el transcurso de la semana. Si tu consulta es sobre un encargo, te escribiré para conocer la historia con más calma.",
  channelsLabel: "También puedes escribirme",
};
