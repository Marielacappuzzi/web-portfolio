import type { LegalPage } from "../types";

/**
 * Legal pages.
 *
 * PENDING: both require real data — legal ownership, tax identification,
 * hosting provider, analytics in use, data retention periods and the
 * jurisdiction the site answers to. None of it exists in the project.
 *
 * Writing plausible-sounding legal text would be worse than an empty page: it
 * would be a document Mariela could be held to. So each page ships as a
 * structured outline of what it must cover, with a declared pending marker.
 * See docs/CONTENT_PENDING.md #18.
 */

export const privacy: LegalPage = {
  heading: {
    eyebrow: "Legal",
    title: "Política de privacidad",
  },
  topics: [
    "Responsable del tratamiento de los datos",
    "Datos que se recogen a través del formulario de contacto",
    "Finalidad y base legal del tratamiento",
    "Plazo de conservación",
    "Destinatarios y encargados de tratamiento",
    "Derechos de acceso, rectificación y supresión",
    "Cookies y herramientas de medición",
    "Contacto para ejercer los derechos",
  ],
};

export const legalNotice: LegalPage = {
  heading: {
    eyebrow: "Legal",
    title: "Aviso legal",
  },
  topics: [
    "Titularidad del sitio",
    "Datos identificativos y fiscales",
    "Condiciones de uso",
    "Propiedad intelectual de las obras y de las fotografías",
    "Responsabilidad sobre los contenidos",
    "Legislación aplicable y jurisdicción",
  ],
};
