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
    topics: [
      "Fotografías de referencia necesarias",
      "Formatos disponibles",
      "Tiempos de realización",
      "Reserva y anticipo",
      "Formas de pago",
      "Entrega y embalaje",
      "Envíos a Bolivia, Latinoamérica y Europa",
      "Preguntas frecuentes",
    ],
  },

  closing: {
    eyebrow: "Iniciar una conversación",
    title: "Cuéntame la historia que te gustaría convertir en una *obra*.",
    paragraph:
      "Compárteme brevemente qué te gustaría conservar o transmitir. Ese será el primer paso para comprender si podemos transformarlo en una obra.",
    primaryAction: { label: "Contar mi historia", href: "/contacto" },
    secondaryAction: { label: "Ver la obra", href: "/obra" },
  },
};
