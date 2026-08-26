import type { WorkIndexPage } from "../types";

/**
 * /obra — the single gallery. Copy.md §3.
 *
 * One gallery in this first stage, as Mariela asked. The data model already
 * carries kind, status and order, so categories and filters become a query
 * change rather than a rebuild.
 */
/*
 * The page opens with the three flagships and only then shows the catalogue.
 * They used to sit inside the same grid as everything else, which flattened
 * the one hierarchy the site is built on.
 */
export const workIndex: WorkIndexPage = {
  eyebrow: "La obra",
  title: "Historias llevadas al *carboncillo*.",
  description:
    "Obras personales, retratos por encargo y piezas nacidas de vínculos, recuerdos e ideas que encontraron una forma de ser contadas.",
  featuredEyebrow: "Obras destacadas",
  restEyebrow: "Todas las obras",
  emptyMessage:
    "Las fotografías de las obras están en preparación. Mientras tanto, cada pieza aparece con su ficha en construcción.",
};
