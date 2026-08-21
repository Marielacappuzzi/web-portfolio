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

## Bloquean el lanzamiento

| # | Qué falta | Dónde se resuelve | Impacto |
| --- | --- | --- | --- |
| 0 | **Portada del inicio**, 1920 × 750 | `public/portada/inicio.jpg` → `home.ts` → `hero.cover` | **B** — el hero muestra hoy una placa declarada. Necesita aire a la izquierda para el titular; ver `CoverImage`. |
| 0b | **Descripción de 16 fotografías ya en disco** | `works.ts` → `detailImages` | **A** — `bajo-su-proteccion` tiene 7 archivos y sólo 1 declarado; `oltre-lo-sguardo` 7 y ninguno; `sueno-de-primavera` 3 y ninguno. Sin saber qué muestra cada una no se puede escribir su `alt`, y la galería horizontal necesita tres o más para activarse. |
| 1 | Fotografía definitiva de **Jesús, la oveja y el lobo** | `works.ts` → `image` | **B** — es la obra del hero. Sigue sin terminar; confirmado en el briefing y ausente del PDF. |
| 3 | **Correo electrónico** de contacto | `site.ts` → `email` | **B** — hoy el footer muestra el marcador de pendiente. |
| 4 | **Instagram**: handle y URL | `site.ts` → `instagramHandle`, `instagramUrl` | **B** |
| 5 | **Sello MC** en SVG | `public/marca/sello-mc.svg` | **B** — el header usa hoy el monograma tipográfico. |
| 6 | Grafía del apellido: **Crapuzzi** o **Crappuzi** | `site.ts` → `name`, `copyright` | **B** — el PDF confirma **Crapuzzi**; el repositorio y el handle de GitHub dicen otra cosa. |
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
| 21 | Destino del formulario de contacto (correo, Resend, Supabase, Formspree) | No | **A** — el formulario se construye con validación y estados; falta el endpoint. |
| 22 | Dominio definitivo | No | **M** — necesario para `metadataBase`, sitemap y URLs canónicas. |

---

## Cómo se ve un pendiente en el sitio

- **Imagen de obra ausente** → `ArtworkFrame` dibuja una plancha con la
  proporción correcta, el título y la marca "Imagen pendiente".
- **Fotografía de proceso o retrato ausente** → `Figure` hace lo mismo, con la
  etiqueta de qué fotografía falta.
- **Dato de contacto ausente** → el componente `Pending` en el footer.
- **Ficha técnica incompleta** → la línea simplemente no se renderiza.

Ningún pendiente rompe la maquetación, y ninguno se disimula.
