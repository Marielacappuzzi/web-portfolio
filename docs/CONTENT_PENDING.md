# Pendientes de contenido

Registro vivo de todo lo que falta o hay que confirmar. Nada de esto se inventó.
Cada ítem indica exactamente dónde se resuelve.

Leyenda de impacto: **B** bloquea el lanzamiento · **A** alto · **M** medio.

---

## Resuelto el 2026-08-09

El PDF de fichas técnicas y la carpeta `IMAGENES MARIELA/` cerraron los ítems
1 (parcial), 2, 7, 8, 9, 10, 11, 12 y 13. Nueve obras están en el sitio con
fotografía y ficha completa, y las dos fotografías de Mariela están integradas.
Detalle en `ASSET_INVENTORY.md`.

## Resuelto el 2026-08-22

Sin correo público en el sitio, por decisión de Mariela: publicar una
dirección la entrega a los recolectores, y el formulario ya llega a su
bandeja. Instagram queda como único canal directo. Cierra el ítem 3.

El formulario entrega por Resend en `marielacrapuzzi9@gmail.com`. Cierra el
ítem 21.

## Resuelto el 2026-08-21

La grafía del apellido queda cerrada: **Crapuzzi**, confirmado por Mariela y
por el certificado de autenticidad firmado. El repositorio de GitHub y la
carpeta local usan otra grafía; `site.ts` es la autoridad. Cierra el ítem 6.

## Bloquean el lanzamiento

| # | Qué falta | Dónde se resuelve | Impacto |
| --- | --- | --- | --- |
| 0 | **Portada del inicio**, 1920 × 750 | `public/portada/inicio.jpg` → `home.ts` → `hero.cover` | **B** — el hero muestra hoy una placa declarada. Necesita aire a la izquierda para el titular; ver `CoverImage`. |
| 0b | **Página editorial para _Oltre lo Sguardo_** | `works.ts` → `hasEditorialPage` | **M** — sus 7 fotografías ya están descritas y declaradas, pero la obra no tiene página propia, así que sólo se ve el recorte de la mirada en el inicio. La estrategia nombra tres obras editoriales y ésta no está entre ellas: decisión de Mariela, no técnica. |
| 1 | Fotografía definitiva de **Jesús, la oveja y el lobo** | `works.ts` → `image` | **B** — es la obra del hero. Sigue sin terminar; confirmado en el briefing y ausente del PDF. |
| 4 | **Instagram**: handle y URL | `site.ts` → `instagramHandle`, `instagramUrl` | **B** |
| 5 | **Sello MC** en SVG | `public/marca/sello-mc.svg` | **B** — el header usa hoy el monograma tipográfico. |
| 6b | Recorte de 6 fotografías y resolución de todo el lote | `IMAGENES MARIELA/` → `public/obra/` | **B** — ver `ASSET_INVENTORY.md` §Dos problemas transversales. |

## Decisiones sobre el catálogo que requieren confirmación

| # | Punto | Impacto |
| --- | --- | --- |
| 7 | **Cambio de título.** El PDF llama **Bajo su Protección** a la obra que `Copy.md` llama *La Leona con su instinto* y `Estrategia.md` *La leona y su cría*. Se usó el título del PDF, y la URL cambió a `/obra/bajo-su-proteccion`. El texto breve de `Copy.md` se conservó. | **A** |
| 8 | **«Toro Salvaje» representa un caballo.** El texto alternativo describe lo que se ve. Confirmar que el título es intencional. | **M** |
| 9 | Los **extras** de cada obra están copiados pero sin asignar a "El detalle" ni "El proceso". Hace falta revisarlos y decidir cuáles van. | **A** |
| 10 | Faltan **recortes ampliados de miradas**, el gesto focal del sistema visual. | **A** |

## Textos que faltan

| # | Qué falta | Dónde | Impacto |
| --- | --- | --- | --- |
| 15 | Historia extendida de cada obra destacada | `works.ts` → `longStory` | **A** — `Copy.md` solo trae el texto breve. Las páginas editoriales lo necesitan. |
| 16 | Contenido de `/encargos`: formatos, tiempos, reserva, pago, envíos, FAQ | Fase 4 | **A** — `Copy.md` cubre el bloque de la home, no la página. |
| 17 | Contenido de `/sobre-mi` y de la sección de proceso extendida | Fase 4 | **A** |
| 18 | Política de privacidad y aviso legal | Fase 4 | **A** — requieren datos reales de titularidad. |

## Decisiones a confirmar

| # | Decisión | Tomada | Impacto |
| --- | --- | --- | --- |
| 19 | "Proceso" vive como sección de `/sobre-mi#proceso`, sin página ni ítem de navegación propios | Sí, ver `PROJECT_CONTEXT.md` §7 | **A** |
| 19b | La home tiene 4 secciones; el resto de `Copy.md` se reubicó a las páginas internas | Sí, ver `PROJECT_CONTEXT.md` §8. Ningún texto se reescribió ni se descartó | **A** |
| 19c | El hero mantiene la plancha de "imagen pendiente" en lugar de usar otra obra | Sí, por instrucción expresa: no reemplazar la obra principal por otra. Revisable ahora que hay nueve obras fotografiadas | **A** |
| 20 | Título "La Leona con su instinto" en lugar de "La leona y su cría" | Sí, por ser el copy aprobado | **M** |
| 21 | Destino del formulario de contacto | Sí | **Resuelto** — Resend, entregando en `marielacrapuzzi9@gmail.com`. Falta cargar las tres variables en Vercel y verificar el dominio en Resend; ver `.env.example`. |
| 22 | Dominio definitivo | Sí | **Resuelto** — `marielacrapuzzi.com`. Se resuelve en `src/lib/site-url.ts`: gana `NEXT_PUBLIC_SITE_URL`, después el host que Vercel inyecta, y localhost en desarrollo. |

---

## Cómo se ve un pendiente en el sitio

- **Imagen de obra ausente** → `ArtworkFrame` dibuja una plancha con la
  proporción correcta, el título y la marca "Imagen pendiente".
- **Fotografía de proceso o retrato ausente** → `Figure` hace lo mismo, con la
  etiqueta de qué fotografía falta.
- **Dato de contacto ausente** → el componente `Pending` en el footer.
- **Ficha técnica incompleta** → la línea simplemente no se renderiza.

Ningún pendiente rompe la maquetación, y ninguno se disimula.
