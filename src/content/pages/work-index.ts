import type { WorkIndexPage } from "../types";

/**
 * /obra — the single gallery. Copy.md §3.
 *
 * One gallery in this first stage, as Mariela asked. The data model already
 * carries kind, status and order, so categories and filters become a query
 * change rather than a rebuild.
 */
export const workIndex: WorkIndexPage = {
  eyebrow: "Obras seleccionadas",
  title: "Historias llevadas al *carboncillo*.",
  description:
    "Obras personales, retratos por encargo y piezas nacidas de vínculos, recuerdos e ideas que encontraron una forma de ser contadas.",
  /*
   * The close. It used to be the home's — "Cuéntame la historia que te
   * gustaría convertir en una obra", with two buttons — which is copy from a
   * version of the project that still had a separate contact page. A reader
   * who has just been through the whole catalogue is at a different moment
   * than one who has just met Mariela.
   */
  closing: {
    title: "¿Quieres encargar una *obra*?",
    paragraph:
      "Si tienes una imagen, un vínculo o una idea que te gustaría convertir en una pieza original, puedes solicitar una cotización.",
    primaryAction: { label: "Solicitar un encargo", href: "/encargos" },
  },

  emptyMessage:
    "Las fotografías de las obras están en preparación. Mientras tanto, cada pieza aparece con su ficha en construcción.",
};
