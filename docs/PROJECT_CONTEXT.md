# Contexto del proyecto — Mariela Crapuzzi

Documento de síntesis. Consolida el briefing, la estrategia y las decisiones tomadas
antes de escribir código. Fuentes de verdad, en orden de prioridad:

1. `Mariela_Crapuzzi_Acerca_de_la_Artista.docx` — texto de la artista. Verbatim
   en `/sobre-mi`. **Manda sobre la biografía de `Copy.md`.**
2. `Mariela_Crapuzzi_Obras_Textos_Fichas_Web_FINAL_v2` — textos y fichas de obra.
3. `Fichas_tecnicas_obras_..._v4.pdf` — criterio de presentación de la ficha.
4. `docs/Copy.md` — copy aprobado del resto del sitio. Se usa verbatim.
5. `docs/Estructura.md` — lista final de páginas.
6. `docs/Estrategia.md` — posicionamiento, función de cada página, dirección visual.
7. Instrucciones de dirección de arte del 2026-08-08 y del 2026-08-20 (ver §6).

---

## 1. Quién es

Mariela Crapuzzi. Artista boliviana dedicada al **realismo figurativo
contemporáneo**. Santa Cruz de la Sierra.

Formación desde **2022** en la Academia de Artes Figurativas de Santa Cruz de la
Sierra: dibujo y pintura, y luego especialización en carboncillo.

> **Conflicto de fechas.** `Copy.md` dice *"Mi relación profesional con el arte
> comenzó en 2021"*. `Acerca de la Artista` —posterior y firmado por Mariela—
> sitúa la formación en 2022. El sitio usa **2022**; la frase de 2021 no se
> publica en ninguna página.

En el centro de su trabajo está la emoción como materia de la obra. El realismo
no es el fin, sino el medio.

## 2. Diferencial

No es el parecido con la fotografía. Es la interpretación previa al primer trazo:

- Escucha la historia y comprende el vínculo.
- Decide qué potenciar, qué transformar, qué dejar fuera.
- Construye la composición alrededor de la mirada.
- Comienza la obra por los ojos, porque ahí se define la identidad emocional.

**Todo el sitio existe para hacer visible ese proceso invisible.**

## 3. Jerarquía de posicionamiento

```
ARTISTA → OBRA → UNIVERSO ARTÍSTICO → ENCARGOS
```

El encargo es una expresión comercial de su práctica, no su identidad. Nunca
encuadrar el sitio como "pedí tu retrato".

## 4. Hilo narrativo

```
Una mirada contiene una historia
  → Mariela escucha e interpreta esa historia
    → el carboncillo le da forma
      → la obra conserva algo que va más allá de la imagen
```

Las tres obras con página propia son la misma secuencia en formato editorial:

| Obra | Concepto | Rol narrativo |
| --- | --- | --- |
| Sueño de Primavera | EL ORIGEN | Formación, Bouguereau, primera edición en print |
| La Leona con su instinto | INTERPRETAR UNA HISTORIA | Madre e hija, ir más allá de la foto |
| Jesús, la oveja y el lobo | UNA VOZ PROPIA | Primera obra personal, etapa autoral |

## 5. Reglas duras

- Principio rector: **la técnica nunca debe gritar más fuerte que la obra**.
- Sin ecommerce, sin checkout, sin precios destacados.
- Sin urgencia, escasez, contadores ni fórmulas de landing.
- Sin texturas de papel o manchas de carboncillo decorativas.
- Sin glassmorphism, gradientes, brillos, sombras marcadas ni cards de SaaS.
- Sin scroll hijacking, parallax excesivo ni cursores custom.
- Sin inventar datos: años, medidas, exposiciones, premios, precios.
- El alto valor se percibe en la ejecución, nunca se afirma con adjetivos.

## 6. Conflictos detectados entre fuentes y cómo se resolvieron

| # | Conflicto | Fuentes | Decisión |
| --- | --- | --- | --- |
| 1 | Navegación: ¿incluye "Proceso"? | Instrucción 2026-08-08 y `Copy.md` (footer) dicen **Obra · Sobre mí · Encargos · Contacto**. `Estrategia.md` y `CLAUDE.md` incluyen Proceso. | Nav de 4 ítems. El contenido de Proceso vive como sección editorial dentro de `/sobre-mi#proceso`. Ver §7. |
| 2 | Título de la obra | `Estrategia.md`: "La leona y su cría". `Copy.md` + instrucción: "La Leona con su instinto". | **La Leona con su instinto** (copy aprobado manda). |
| 3 | Apellido | `Copy.md` + instrucción: **Crapuzzi**. `README.md`, carpeta local y handle de GitHub: Crappuzi / cappuzzi. | **Cerrado el 2026-08-21: Crapuzzi.** Confirmado por Mariela y por el certificado de autenticidad firmado. `site.ts` es la autoridad; el repositorio conserva su nombre. |
| 4 | Página de Prints | `Estrategia.md` la lista en el sitemap. Instrucción la excluye de esta versión. | Sin página de prints. Se integra en home, galería y `/obra/sueno-de-primavera`. |

## 7. Decisión estructural: dónde vive "Proceso"

`Copy.md` contiene tres enlaces que apuntan a contenido de proceso extendido
("Conocer mi proceso", "Conocer mi forma de trabajar", "Descubrir el proceso
completo"), pero la lista de páginas aprobada no incluye `/proceso` y la
navegación tampoco.

Resolución: el proceso completo se construye como **sección editorial dentro de
`/sobre-mi`**, con ancla `#proceso`. Los tres enlaces resuelven ahí. Es coherente
con el pedido de que "Sobre mí" explique cómo mira, por qué el carboncillo y qué
sucede antes del primer trazo.

El componente se construye aislado (`ProcessSection`) para que promoverlo a
`/proceso` más adelante sea un archivo de página de cinco líneas.

**Pendiente de confirmación del cliente.**

## 8. La home es corta, y dónde fue a parar el copy

`Copy.md` está escrito como diez secciones de home. Las tres referencias tienen
homes de entre tres y seis bloques, y la principal —Yulia Bas— tiene **tres
bloques y una sola frase de prosa**. Ver `REFERENCE_AUDIT.md`.

Decisión: **la home introduce, las páginas internas explican.** Cuatro secciones.

Ningún texto aprobado se reescribió ni se descartó. Se reubicó.

| Bloque de `Copy.md` | Dónde vive ahora |
| --- | --- |
| §1 Hero | Home §1 |
| §2 Declaración — título y frase destacada | Home §2 |
| §2 Declaración — los tres párrafos | `/sobre-mi` |
| §3 Introducción a la galería — título | Home §3 |
| §3 Introducción a la galería — descripción | `/obra` |
| §4 Obras destacadas — concepto y título | Home §3 |
| §4 Obras destacadas — textos breves | `/obra` y `/obra/[slug]` |
| §5 El carboncillo | `/sobre-mi` |
| §6 Proceso creativo | `/sobre-mi#proceso` y `/encargos` |
| §7 Encargos | `/encargos` |
| §8 Sobre Mariela | `/sobre-mi` |
| §9 Print destacado | `/obra/sueno-de-primavera` |
| §10 Contacto final | Home §4, `/encargos` y `/contacto` |
| Footer | Footer |

Las cinco etapas del proceso se definen una sola vez en `src/content/process.ts`
y se leen dos veces: en `/sobre-mi` como el modo de trabajar de Mariela, en
`/encargos` como lo que un cliente puede esperar.

## 9. Arquitectura de rutas

Las diez rutas están construidas y el build las prerenderiza estáticamente.

| Ruta | Página |
| --- | --- |
| `/` | Inicio — 4 secciones |
| `/obra` | Galería única |
| `/obra/jesus-la-oveja-y-el-lobo` | Editorial de obra |
| `/obra/la-leona-con-su-instinto` | Editorial de obra |
| `/obra/sueno-de-primavera` | Editorial de obra + edición en print |
| `/sobre-mi` | Sobre Mariela, con la sección `#proceso` |
| `/encargos` | Encargos |
| `/contacto` | Formulario |
| `/privacidad` | Política de privacidad — pendiente de redacción |
| `/aviso-legal` | Aviso legal — pendiente de redacción |

Más `sitemap.xml`, `robots.txt` y una página 404.

## 10. Stack

Ya existente en el repositorio. No se cambia.

- Next.js 16.3.0, App Router, Turbopack
- React 19.2.8
- TypeScript 5, `strict: true`, alias `@/*` → `src/*`
- Tailwind CSS v4 vía `@tailwindcss/postcss` — sin archivo de configuración,
  los tokens se declaran con `@theme` en `globals.css`
- Node 20

Dependencias añadidas: **ninguna**. El movimiento se resuelve con CSS e
`IntersectionObserver` nativo. Ver `DESIGN_SYSTEM.md` §Movimiento.

Notas de Next.js 16 relevantes: `params` y `searchParams` son asíncronos;
`images.qualities` por defecto es `[75]`; `middleware.ts` es ahora `proxy.ts`;
`next lint` no existe.

## 11. Autogestión futura

Mariela debe poder actualizar obras, textos, prints y estados de disponibilidad
sin tocar código. Todavía no existe CMS.

Preparación aplicada ahora: todo el contenido vive en `src/content/` y se lee
mediante accesores **asíncronos** en `src/lib/content.ts`. Los componentes nunca
importan datos directamente. Cambiar el origen a Supabase más adelante es
reescribir un solo archivo.
