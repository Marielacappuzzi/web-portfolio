import type { LegalPage } from "../types";

/**
 * Legal pages.
 *
 * Both shipped as outlines until now, on the grounds that inventing legal text
 * would create a document Mariela could be held to. The client has since
 * supplied the wording, so both are complete — with one exception.
 *
 * The contact address still does not exist. Rather than invent a mailbox, the
 * sections that need one are listed in `contactSectionIndexes`, and the page
 * renders a declared marker there. Filling `email` in site.ts replaces every
 * one of them at once. See docs/CONTENT_PENDING.md.
 */

export const privacy: LegalPage = {
  heading: {
    eyebrow: "Legal",
    title: "Política de privacidad",
  },
  updated: "Última actualización: 2026",
  intro: [
    "En este sitio respetamos la privacidad de las personas que nos contactan y procuramos utilizar sus datos únicamente para atender las consultas recibidas.",
  ],
  sections: [
    {
      title: "Responsable",
      body: [
        "El sitio corresponde a Mariela Crapuzzi, artista visual con actividad profesional en Santa Cruz de la Sierra, Bolivia.",
      ],
    },
    {
      title: "Qué información recopilamos",
      body: [
        "A través del formulario de contacto podemos solicitar algunos de los siguientes datos:",
      ],
      bullets: [
        "Nombre",
        "Correo electrónico",
        "Teléfono, cuando se proporcione",
        "País o ciudad",
        "Motivo de la consulta",
        "Mensaje o información relacionada con la consulta",
        "Fotografías o referencias, en caso de que el formulario permita adjuntarlas",
      ],
    },
    {
      title: "Para qué utilizamos la información",
      body: ["La información proporcionada se utiliza únicamente para:"],
      bullets: [
        "responder consultas",
        "evaluar solicitudes de obras o encargos",
        "brindar información sobre obras o prints",
        "comunicarnos con la persona que realizó la consulta",
        "gestionar una posible colaboración o proyecto artístico",
      ],
    },
    {
      title: "",
      body: [
        "Los datos enviados mediante el formulario no se utilizan para enviar publicidad o comunicaciones comerciales no solicitadas.",
      ],
    },
    {
      title: "Conservación de la información",
      body: [
        "Los datos se conservarán durante el tiempo necesario para responder la consulta y, cuando exista una relación profesional posterior, durante el tiempo razonablemente necesario para gestionar dicha relación.",
      ],
    },
    {
      title: "Servicios de terceros",
      body: [
        "El funcionamiento del sitio puede apoyarse en proveedores tecnológicos necesarios para alojamiento, formularios, correo electrónico, reproducción de contenido multimedia u otros servicios relacionados con su funcionamiento.",
        "Estos proveedores pueden procesar únicamente la información necesaria para prestar sus respectivos servicios.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "El sitio puede utilizar cookies técnicas necesarias para su correcto funcionamiento.",
        "Determinados contenidos o servicios externos integrados en el sitio también pueden utilizar sus propias tecnologías de almacenamiento o cookies.",
        "Si posteriormente se incorporan herramientas adicionales de medición o publicidad, esta política deberá actualizarse para reflejar su utilización.",
      ],
    },
    {
      title: "Derechos sobre tus datos",
      body: [
        "Puedes solicitar información sobre tus datos personales, su corrección o su eliminación escribiendo al correo de contacto indicado en esta página.",
      ],
    },
    {
      title: "Seguridad",
      body: [
        "Se adoptan medidas razonables para proteger la información recibida y evitar accesos o usos no autorizados.",
        "Sin embargo, ningún sistema de transmisión o almacenamiento de información en Internet puede considerarse completamente infalible.",
      ],
    },
    {
      title: "Cambios en esta política",
      body: [
        "Esta Política de Privacidad puede actualizarse cuando cambie el funcionamiento del sitio o los servicios utilizados.",
        "La versión publicada en esta página será siempre la versión vigente.",
      ],
    },
    {
      title: "Contacto",
      body: [
        "Para cualquier consulta relacionada con privacidad o tratamiento de información personal:",
        "Mariela Crapuzzi · Santa Cruz de la Sierra, Bolivia",
      ],
    },
  ],
  // "Responsable" and "Contacto" both print the address.
  contactSectionIndexes: [0, 10],
};

export const terms: LegalPage = {
  heading: {
    eyebrow: "Legal",
    title: "Términos y condiciones",
  },
  updated: "Última actualización: 2026",
  intro: [
    "El acceso y utilización de este sitio implica la aceptación de las siguientes condiciones.",
  ],
  sections: [
    {
      title: "Finalidad del sitio",
      body: [
        "Este sitio tiene como finalidad presentar el trabajo artístico de Mariela Crapuzzi, incluyendo obras, proyectos, procesos creativos, prints y servicios de obras por encargo.",
        "El sitio funciona principalmente como portfolio y medio de contacto. Actualmente no constituye una tienda online ni realiza ventas o pagos directamente desde la plataforma.",
      ],
    },
    {
      title: "Información sobre obras y encargos",
      body: [
        "La información publicada sobre obras, prints, formatos, disponibilidad, tiempos o encargos tiene carácter informativo.",
        "La disponibilidad de una obra, la aceptación de un encargo, los tiempos definitivos, los costos, el transporte y cualquier otra condición se confirman directamente con Mariela antes de iniciar un proyecto.",
        "El envío de un formulario de contacto no implica la aceptación automática de un encargo ni genera por sí mismo una relación contractual.",
      ],
    },
    {
      title: "Obras disponibles y colección privada",
      body: ["El estado de las obras puede indicarse mediante términos como:"],
      bullets: [
        "Disponible",
        "Colección privada",
        "Obra por encargo",
        "Print disponible",
        "Agotado",
      ],
    },
    {
      title: "",
      body: [
        "La información puede actualizarse a medida que cambie la disponibilidad de las piezas.",
      ],
    },
    {
      title: "Propiedad intelectual",
      body: [
        "Las obras, dibujos, fotografías, textos, identidad visual, logotipos y demás contenidos publicados en este sitio pertenecen a sus respectivos titulares y están protegidos por los derechos correspondientes.",
        "No está permitido copiar, reproducir, distribuir, modificar, comercializar o utilizar las obras o imágenes publicadas sin autorización previa.",
        "La visualización del contenido dentro del sitio no concede derechos de reproducción o explotación sobre las obras.",
      ],
    },
    {
      title: "Fotografías y referencias",
      body: [
        "Las fotografías utilizadas como referencia en trabajos por encargo son tratadas únicamente con el propósito de desarrollar la obra solicitada.",
        "Cuando una historia, imagen o referencia pertenezca a un cliente, su utilización pública deberá respetar la privacidad de las personas involucradas.",
      ],
    },
    {
      title: "Contenido del sitio",
      body: [
        "Se procura mantener la información del sitio actualizada y correcta.",
        "Sin embargo, algunos contenidos pueden cambiar, actualizarse o modificarse a medida que evoluciona la obra y actividad profesional de Mariela.",
      ],
    },
    {
      title: "Enlaces y servicios externos",
      body: [
        "El sitio puede contener enlaces o servicios pertenecientes a terceros, como redes sociales, plataformas de video u otras herramientas.",
        "Mariela Crapuzzi no controla necesariamente el funcionamiento, disponibilidad o políticas propias de dichos servicios externos.",
      ],
    },
    {
      title: "Uso del sitio",
      body: [
        "El usuario se compromete a utilizar el sitio de forma legítima y a no realizar acciones que puedan afectar su funcionamiento, seguridad o contenidos.",
      ],
    },
    {
      title: "Modificaciones",
      body: [
        "Estos Términos y Condiciones pueden actualizarse cuando sea necesario para reflejar cambios en el sitio, sus contenidos o su funcionamiento.",
        "La versión publicada en esta página será considerada la versión vigente.",
      ],
    },
    {
      title: "Contacto",
      body: [
        "Para consultas relacionadas con el sitio, las obras o estos términos:",
        "Mariela Crapuzzi · Santa Cruz de la Sierra, Bolivia",
      ],
    },
  ],
  contactSectionIndexes: [10],
};
