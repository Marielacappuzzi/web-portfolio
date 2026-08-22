import type { ProcessStep } from "./types";

/**
 * The five stages, verbatim from docs/Copy.md §6.
 *
 * Defined once because two pages need them: /sobre-mi#proceso tells them as
 * how Mariela works, /encargos tells them as what a client can expect. Same
 * five stages, two readings.
 */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Escuchar",
    description:
      "Comprender la historia, el vínculo y aquello que se desea conservar o expresar.",
  },
  {
    number: "02",
    title: "Encontrar la imagen",
    description:
      "Seleccionar las referencias y definir la composición, la expresión y la atmósfera.",
  },
  {
    number: "03",
    title: "Interpretar",
    description:
      "Decidir qué detalles potenciar, qué elementos transformar y cuáles dejar fuera.",
  },
  {
    number: "04",
    title: "Crear",
    description:
      "Comenzar por la mirada y construir progresivamente la obra alrededor de ella.",
  },
  {
    number: "05",
    title: "Proteger y entregar",
    description:
      "Preparar cada pieza para que pueda conservarse y llegar a su destino con el cuidado que requiere.",
  },
];
