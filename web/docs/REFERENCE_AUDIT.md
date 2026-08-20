# Auditoría de referencias

Inspección directa de los tres sitios de referencia. El objetivo es extraer
principios reutilizables, no componentes ni identidad.

---

## Estado del material recibido

| Referencia | Material local | Estado |
| --- | --- | --- |
| lillicoart.com | `lillicoart.com/www.lillicoart.com/` — 7 HTML, `styles.css` (53 KB), `navigation.js` (28 KB), 12 imágenes WebP | **Completo.** Sitio hecho a mano, código legible. La referencia más útil técnicamente. |
| kristalynmiguel.com | `kristalynmiguel.com/kristalynmiguel.com/` — 5 HTML con CSS embebido, 8 imágenes | **Completo.** También hecho a mano, tokens visibles en el `<style>` del `<head>`. |
| yuliabas.com | `static.parastorage.com/` — solo bundles del CDN de Wix. `hts-log.txt` confirma que el destino era `https://www.yuliabas.com/` | **Incompleto.** Faltan los HTML del dominio. Auditado en vivo: home, `/about` y una página de proyecto. |

`static.parastorage.com/hts-log.txt` línea 1 confirma el origen:
`HTTrack ... launched at https://www.yuliabas.com/`. El espejo escribió 135
archivos en `C:\My Web Sites\Mariela Crappuzi 3`, carpeta que ya no existe en
este equipo. Solo se copió al workspace la carpeta del CDN, que contiene
código de plataforma Wix sin valor de diseño.

**Pendiente:** la carpeta `www.yuliabas.com` del espejo original, si se conserva.

---

## Referencia 01 — Yulia Bas

**Referencia principal de dirección visual.** Auditada en vivo (home, `/about`,
`/portraits-of-imperfection`) el 2026-08-09, porque el espejo local está
incompleto.

Palabras de Mariela sobre esta referencia: *"la tipografía, la jerarquía clara
entre títulos y textos, el uso generoso del espacio libre y la selección muy
cuidada de imágenes."*

### Lo que realmente hay, medido

**Home — 3 bloques de contenido.**

1. Obra a sangre en carrusel, con el nombre en versales espaciadas y el
   descriptor `CONTEMPORARY ARTIST / BARCELONA`.
2. `CURRENT` — el proyecto en curso (DOM Residence) y la selección para la
   Bienal de Venecia.
3. `ENQUIRIES` — *For collectors, curators and galleries*, con dos accesos:
   **Request a catalogue** y **Arrange a studio visit**.

**Toda la prosa de la home es una sola frase**, la del anuncio de la Bienal. No
hay párrafos, no hay declaración de artista, no hay biografía, no hay proceso.
Su "declaración" en la home son tres palabras y una ciudad.

**Página de proyecto — cuatro elementos.** Título de la serie → rango de años
(`2018 - 2023`) → statement de **unas 30 palabras** → grilla de 18 imágenes.
Sin captions individuales, sin ficha técnica, **sin CTA al final**.

**Página About — ~240 palabras**, tercera persona, una fotografía, formulario de
contacto. Nada más.

**Nav:** `HOME · WORKS · CV · ABOUT`. WORKS despliega nueve proyectos con nombre
propio —*9000 cuts*, *my grandmom's bag*, *siamese twins*— nunca categorías
genéricas.

### Por qué funciona

El alto valor no lo cargan los adjetivos: lo cargan **los proyectos con nombre
propio, una credencial institucional y dos accesos**. La home no explica nada,
introduce. La profundidad se alcanza haciendo clic, no haciendo scroll.

Y el sitio es predominantemente **claro**: tipografía negra sobre blanco, con
márgenes muy amplios. La oscuridad no forma parte de su lenguaje.

### Qué tomamos

1. **Home corta.** Cuatro secciones como máximo, con prosa mínima.
2. **Fondo claro como norma.** El papel domina; la cámara oscura es la excepción
   que abre y cierra, no la mitad del sitio.
3. Nav corta y sin ruido; el sello lleva al inicio.
4. Eyebrows en versales con tracking amplio como sistema de rotulación.
5. Obra a sangre, sin ficha superpuesta. Los metadatos llegan después.
6. Espacio vacío tratado como material, no como sobra.
7. **CTA de acceso, nunca de transacción.**
8. Que cada obra destacada tenga nombre y página propia.
9. En la página de obra: título → concepto → obra → texto breve. La ficha
   técnica va al final y en voz baja.

### Qué no tomamos

Su layout ni su carrusel. Su lenguaje de exclusividad explícita (*"for
collectors, curators and galleries"*) — el briefing lo descarta. Su estructura de
nueve series: Mariela tiene tres obras destacadas. Su tercera persona: Mariela
habla en primera en todo `Copy.md`. Y su ausencia total de ficha técnica: la
galería de Mariela sí necesita metadatos discretos.

### La diferencia que hay que tener presente

La home de Yulia Bas puede permitirse el silencio porque tiene nueve cuerpos de
obra y una Bienal de Venecia detrás. Mariela tiene tres obras y ninguna
exposición registrada. Copiar la restricción al pie dejaría una home vacía.

Por eso la home de Mariela conserva **una** frase de posicionamiento (el párrafo
del hero) y **una** declaración de dos líneas: es lo que sustituye a la
credencial que ella todavía no tiene. Todo lo demás se movió a las páginas
internas.

---

## Referencia 02 — Kristalyn Miguel

Auditada en el código local.

**Qué hace.**

- Tokens declarados en `:root`: `--linen #F8F5EF`, `--ivory #EDE8DE`,
  `--charcoal #1A1A18`, `--gold #B8A98A`, `--sage #8A9488`.
- Tipografía: Cormorant Garamond (serif) + Jost (sans), ambas de Google Fonts.
- Escala de espaciado con salto grande al final: `0.5 / 1 / 2 / 4 / 7 / 11rem`.
  El `--space-xxl: 11rem` es lo que produce la sensación de calma.
- `--max-w: 1200px` para layout, `--max-text: 680px` para lectura. Dos anchos, no uno.
- Estructura de home: hero declarativo → dos obras nombradas con caption
  (`Qualia`, `Marrow` — "from The Alive Series") → cuerpo de obra actual →
  extensión de estudio → sobre la artista → contacto.
- La artista aparece en tercera persona, con foto de estudio, después de la obra.
- Reveal por scroll con `IntersectionObserver`, sin librería.

**Por qué funciona.** La presencia humana llega *después* de que la obra ya
estableció autoridad. La foto de estudio no compite: contextualiza. El texto
sobre la artista es corto y no biográfico.

**Qué tomamos.**

1. Dos anchos de contenedor: uno para composición, otro para lectura.
2. Un salto de espaciado deliberadamente grande para el respiro entre secciones.
3. Presentar la artista después de la obra, con texto breve y una imagen de trabajo.
4. Captions discretos que nombran la obra y su serie, no que la explican.
5. Reveal por `IntersectionObserver` sin dependencias.

**Qué no tomamos.** Su paleta lino/oro/salvia — es exactamente el fondo beige
cálido que el briefing descarta. Tampoco su romanticismo tipográfico ni el uso
de la tercera persona: Mariela habla en primera persona en todo `Copy.md`.

---

## Referencia 03 — Esme Lillico

Auditada en el código local. Es el caso más cercano en materia y en riesgo.

**Qué hace.**

- Fondo oscuro por defecto: `--ink #0d0d0d`, texto en `rgba(255,255,255,0.72)`.
- Secciones claras (`--paper #f5f3f0`) usadas como excepción, no como norma.
- Escala tipográfica fluida completa con `clamp()`, de `--text-xs` a `--text-3xl`.
- `.label`: 0.55rem, tracking `0.28em`, versales, opacidad 0.45. Muy contenido.
- Titulares en Cormorant Garamond **itálica** de peso 300.
- Home: hero a pantalla completa con retrato emergiendo del negro → carrusel de
  obra seleccionada → declaración de la artista → par de retratos con caption y
  nota de exposición → divisor → CTA de encargos → contacto → footer.
- Movimiento: GSAP + ScrollTrigger + Lenis. Reveal con clip-path wipe, parallax
  con `scrub` en el hero, `.reveal` con `IntersectionObserver` como capa base.
- Fallback correcto: si GSAP no carga, una animación CSS revela el body a los 3.5s.
- `@media (prefers-reduced-motion)` reduce los reveals a un fade de 0.5s.
- Página About: label → h1 → divisor → tres párrafos → blockquote → párrafo de cierre.

**Por qué funciona.** El proceso y el material se cuentan como parte de la obra,
no como ficha técnica. El texto siempre precede o acompaña a la imagen, nunca la
sustituye. La progresión revela el universo de a poco.

**Qué tomamos.**

1. La estructura narrativa: material → mirada → proceso → obra.
2. Escala tipográfica fluida con `clamp()` en lugar de breakpoints tipográficos.
3. El `.label` como rótulo de sección: versales diminutas, tracking muy amplio.
4. Alternancia de fondo claro/oscuro como recurso de ritmo, con la excepción
   ganada en vez de arbitraria.
5. Caption de obra en dos líneas: título en serif, ficha en sans diminuta.
6. `prefers-reduced-motion` tratado desde el sistema, no como parche.
7. Reveal progresivo por scroll con delays escalonados cortos.

**Qué no tomamos.**

- GSAP, ScrollTrigger y Lenis. Tres dependencias desde CDN para lo que aquí se
  resuelve con CSS e `IntersectionObserver`. El scroll suave de Lenis además roza
  el scroll hijacking que el briefing descarta.
- El acento umber `#8b6f47` y las sombras cálidas `rgba(180,140,100,…)`.
- Los titulares en itálica por defecto. En Mariela la itálica es excepción.
- El body que arranca en `opacity: 0` esperando JS. Riesgo de accesibilidad y de
  performance percibida.
- Su copy y su voz.

---

## Riesgo de convergencia y cómo se evita

Las tres referencias, **sin excepción**, usan Cormorant Garamond como serif. Dos
de las tres usan una geométrica ligera (Jost, Inter) como sans. Adoptar ese par
haría que Mariela pareciera una cuarta versión del mismo sitio.

**Decisión: ninguna tipografía de las referencias se reutiliza.**

| | Referencias | Mariela |
| --- | --- | --- |
| Serif | Cormorant Garamond (las tres) | **Newsreader** |
| Sans | Jost, Inter | **Instrument Sans** |

Newsreader tiene eje de tamaño óptico e itálicas reales; es editorial y literaria
sin ser decorativa. Instrument Sans es una grotesca neutra que sostiene versales
diminutas con tracking amplio sin volverse frágil.

---

## Longitud de las tres homes, medida

| Sitio | Bloques de contenido | Prosa en la home |
| --- | --- | --- |
| Yulia Bas | 3 | una frase |
| Kristalyn Miguel | 5 | ~140 palabras |
| Esme Lillico | 6 | ~180 palabras |
| **Mariela** | **4** | **~90 palabras** |

Ninguna de las tres explica su universo en la portada. Todas lo introducen y
mandan a una página interna. Esa es la lectura correcta de *"uso generoso del
espacio libre"*: no es solo margen, es **cuánto contenido se decide no poner**.

## Síntesis: cómo se combinan

| De | Principio | Cómo aparece en Mariela |
| --- | --- | --- |
| Yulia Bas | **Home corta, la profundidad se alcanza haciendo clic** | 4 secciones; el resto de `Copy.md` vive en las páginas internas |
| Yulia Bas | Fondo claro como norma | Papel domina; la cámara abre y cierra |
| Yulia Bas | Obra a sangre, sin ficha superpuesta | Hero, selección de obra, cabecera de las editoriales |
| Yulia Bas | CTA de acceso, no de transacción | `ContactCallout`, sin botones rellenos en todo el sitio |
| Yulia Bas | Cada obra tiene nombre propio | Tres páginas editoriales, no fichas de catálogo |
| Kristalyn Miguel | La persona llega después de la obra | Mariela no aparece en la home; `/sobre-mi` es su página |
| Kristalyn Miguel | Dos anchos de contenedor | `max-w-default` para composición, `max-w-text` para lectura |
| Kristalyn Miguel | Respiro por espaciado, no por decoración | Salto grande al final de la escala de espaciado |
| Esme Lillico | Narrativa de proceso como valor | `/sobre-mi#proceso` y `/encargos`, con las mismas cinco etapas |
| Esme Lillico | Alternancia claro/oscuro como ritmo | Sistema de dos fondos: papel y cámara |
| Esme Lillico | Reveal contemplativo y `prefers-reduced-motion` | Primitivas `Reveal`, `ImageReveal` y `Rule`, sin dependencias |
| **Mariela** | **La mirada como centro** | **Ver `DESIGN_SYSTEM.md` §Concepto** |

La identidad final —el concepto de los dos fondos, el tratamiento de la mirada,
la voz en primera persona, la ausencia total de acento cromático y el modo en
que lo pendiente se declara en vez de disimularse— no viene de ninguna
referencia.
