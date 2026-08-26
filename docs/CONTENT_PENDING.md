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

## Resuelto el 2026-08-23

La portada del inicio está entregada en dos archivos: `public/portada/
inicio.jpg` (1920 × 750) y `inicio-movil.jpg` (960 × 1500). Muestran *Bajo su
Protección* enmarcada sobre una pared clara. `CoverImage` sirve cada una por
`<picture>`, de modo que un teléfono nunca descarga la de escritorio.

La pared mide 0,72 de luminancia donde va el texto, así que el hero pasó a
fondo claro con tipografía oscura: oscurecer la fotografía para poder poner
texto blanco habría sido hacer gritar a la técnica por encima de la obra.
Cierra el ítem 0.

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


---

## Revisión del 2026-08-23

**Resuelto.** Llegó `Mariela_Crapuzzi_Acerca_de_la_Artista.docx`. La intro y el
bloque «La mirada» de `/sobre-mi` son ahora **texto de Mariela, verbatim**; solo
las etiquetas cortas de cada idea son editoriales. Queda resuelto también el
conflicto 2021 / 2022: manda **2022**, por ser el documento más reciente y
firmado por ella.

**Abierto.**

| # | Qué falta | Dónde se resuelve | Impacto |
| --- | --- | --- | --- |
| A | ~~Correo público~~ — **cerrado.** No se publica dirección de correo. Instagram es el único canal directo; el resto pasa por el formulario. | — | — |
| B | ~~Voz mezclada~~ — **cerrado.** `Acerca de la Artista` se pasó a primera persona. Solo cambian pronombres y desinencias verbales; ninguna frase se reescribió, cortó ni agregó. | — | — |
| C | **Fotografía definitiva de Jesús, la oveja y el lobo.** La obra sigue sin terminar. | `works.ts` → `image` | **B** |
| D | **Destino del formulario:** `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. | Variables de entorno | **B** |
| E | **Recorte de seis fotografías** con pared, cinta o márgenes de papel a la vista. | `public/obra/` | **A** |


---

## Revisión del 2026-08-24

**Resuelto.** El cliente entregó el contenido de `/encargos` («Detalles del
encargo»: fotografías, formatos, tiempos, reserva, pago, entrega y envíos), la
Política de privacidad y los Términos y condiciones. Las tres páginas están
completas y ya no queda ningún marcador de pendiente en ellas, salvo el correo.

`/aviso-legal` pasó a **`/terminos`**, con redirección permanente desde la ruta
vieja. El footer enlaza a las dos.

**Preguntas frecuentes.** De las catorce preguntas entregadas se publican
**cuatro**. Las otras diez —fotografías, formatos, tiempos, reserva, pago,
envíos, embalaje, enmarcado y tipos de encargo— ya estaban respondidas palabra
por palabra en «Detalles del encargo», una pantalla más arriba. Sobreviven las
que agregan algo: cómo se encarga una obra, y las tres tranquilidades que una
persona necesita antes de escribir —que la imagen no tiene que estar decidida,
que se pueden combinar referencias, y que una fotografía antigua o pobre no
descarta nada.

**Abierto.**

| # | Qué falta | Dónde | Impacto |
| --- | --- | --- | --- |
| A | **Correo de contacto.** Es lo único que falta en las páginas legales: aparece cuatro veces en Privacidad y dos en Términos como marcador declarado, nunca como dirección inventada. También lo esperan el footer y `/contacto`. | `src/content/site.ts` → `email` | **B** |
| C | Fotografía definitiva de *Jesús, la oveja y el lobo*. | `works.ts` → `image` | **B** |
| D | Destino del formulario: `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. | Entorno | **B** |


---

## Revisión del 2026-08-24 (2)

**Correo cargado, solo en las páginas legales.** `web.marielacrappuzzi@gmail.com`
vive en `site.legalEmail` y aparece únicamente en Privacidad y Términos, que es
donde hay que nombrar una dirección: es adonde alguien escribe para pedir que
borren sus datos. Sigue sin aparecer en el footer ni en `/contacto`, que
enrutan por el formulario, y por eso `site.email` sigue en `null`.

> **Ojo con la grafía.** El buzón real dice `crappuzzi` (doble p); el texto que
> se muestra dice `crapuzzi`. Los enlaces `mailto` usan siempre el real, así
> que hacer clic funciona. Pero **quien copie el texto a mano escribirá a una
> casilla que no existe**. Registrar la dirección corregida y reenviarla al
> buzón real cerraría el agujero.

**Teléfono internacional.** `react-phone-number-input` aporta los 245
territorios, sus prefijos y los nombres de país en español. Se usan sus datos,
no su componente: ese trae su propia hoja de estilos y traería un segundo
lenguaje visual al formulario.


---

## Revisión del 2026-08-26 — reestructura de arquitectura

**Hecho.** «Jesús, la oveja y el lobo» pasó a **El Rescate** en todo el sitio,
incluidos slug (`/obra/el-rescate`), carpetas de assets y nombres de video; la
ruta vieja redirige. La home tiene un solo bloque de obra —«Obras insignia», con
El Rescate primero— y la grilla completa vive solo en `/obra`, dividida en
«Obras destacadas» y «Todas las obras». Sobre mí perdió las cuatro tarjetas
duplicadas, la mención a Sueño de Primavera y la frase repetida del inicio.
Oltre lo Sguardo quedó en gris neutro (R=G=B=89; venía con R−B de 30,6 en el
archivo fuente, no por CSS). Ninguna página repite una imagen.

**Falta material fotográfico para las tres destacadas.** La estructura ya está
lista y cada bloque aparece solo si tiene imágenes, así que nada se rompe
mientras tanto — pero hoy se ven así:

| Obra | Principal | Detalle | Enmarcada en pared |
| --- | --- | --- | --- |
| **El Rescate** | obra en proceso | ❌ falta | ❌ falta |
| **Bajo su Protección** | ✅ | ✅ ×3 | ✅ |
| **Sueño de Primavera** | ✅ | ✅ ×2 | ✅ |

**El Rescate es el caso urgente:** su página tiene una sola fotografía —la obra
en proceso— más el video. Al terminarla hacen falta la placa definitiva, al
menos un recorte de detalle y un mockup enmarcado.

Dónde van: `public/obra/el-rescate/`, declaradas en `src/content/works.ts` como
`image`, `detailImages` y `framedImages`.

> El bloque «La historia» toma prestada una imagen de detalle o de pared **solo
> si esa sección tiene otra de sobra**, así que añadir fotos nunca deja una
> sección vacía ni vuelve a duplicar nada.
