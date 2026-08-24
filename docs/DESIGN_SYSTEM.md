# Sistema visual

## Concepto

**Papel y cámara.**

El carboncillo existe entre dos superficies: el papel blanco y la marca negra.
El sitio tiene exactamente dos fondos, y ninguno más.

| Fondo | Valor | Función |
| --- | --- | --- |
| **Papel** | `#F4F4F2` | Donde Mariela habla. Texto, relato, proceso, recorrido, formularios. |
| **Cámara** | `#0B0B0B` | Donde la obra aparece, iluminada como una pared de galería. El texto se retira. |

La alternancia entre ambos es el ritmo del sitio. No hay un tercer fondo, ni
cards, ni paneles, ni superficies elevadas. Una sección es papel o es cámara.

**El papel domina.** Yulia Bas —la referencia principal de dirección visual— es
tipografía negra sobre blanco con márgenes muy amplios; la oscuridad no forma
parte de su lenguaje. La cámara se reserva para tres momentos: el hero, la obra
colgada en las páginas editoriales, y el footer. Abre y cierra; no ocupa la
mitad del sitio.

Sobre eso, un solo gesto focal: **el recorte de la mirada**. Los detalles
ampliados de ojos aparecen a sangre sobre cámara, en los momentos de mayor peso
narrativo. Es el único recurso que el sistema se permite enfatizar, porque es el
centro conceptual del trabajo de Mariela.

**Sin color de acento.** El único acento es una línea de 1px que se traza al
revelarse: el primer trazo.

## Paleta

Neutros fríos. Ninguna dominante cálida.

```
ink            #0B0B0B    fondo cámara
paper          #F4F4F2    fondo papel
paper-bright   #FAFAF9    excepción para lectura larga
```

Los colores de texto son semánticos y se invierten con el fondo. Nunca se usa un
color literal en un componente.

| Token | Sobre papel | Sobre cámara |
| --- | --- | --- |
| `fg-strong` | `#111110` | `rgba(255,255,255,.92)` |
| `fg` | `#3D3D3B` | `rgba(255,255,255,.64)` |
| `fg-muted` | `#7C7C78` | `rgba(255,255,255,.46)` |
| `fg-faint` | `#A3A39E` | `rgba(255,255,255,.30)` |
| `rule` | `#DDDDD8` | `rgba(255,255,255,.15)` |

Se implementa con `data-ground="paper"` y `data-ground="chamber"`. Un componente
escrito una vez funciona sobre ambos fondos sin variantes.

Contraste verificado: `fg` sobre papel = 9.4:1. `fg` sobre cámara ≈ 8.1:1.
`fg-muted` solo se usa en texto ≥ 14px o en versales de rótulo.

## Tipografía

| Rol | Familia | Por qué |
| --- | --- | --- |
| Editorial | **Newsreader** | Serif de lectura con eje de tamaño óptico e itálicas reales. Editorial y literaria sin ser decorativa. Ninguna referencia la usa. |
| Neutra | **Instrument Sans** | Grotesca precisa que sostiene versales diminutas con tracking amplio sin fragilizarse. |

Ambas por `next/font/google`, autoalojadas, sin peticiones a terceros.

Las tres referencias usan Cormorant Garamond. No se usa. Ver `REFERENCE_AUDIT.md`.

### Escala

Fluida con `clamp()`. Sin breakpoints tipográficos.

| Token | Rango | Uso |
| --- | --- | --- |
| `text-2xs` | 10 → 11 px | Eyebrow de sección |
| `text-xs` | 12 → 13 px | Ficha técnica, etiquetas de estado |
| `text-sm` | 14 → 15 px | Navegación, pie de imagen |
| `text-base` | 16 → 17 px | Cuerpo |
| `text-lg` | 18 → 21 px | Entradilla |
| `text-xl` | 22 → 28 px | Título de obra en grilla |
| `text-2xl` | 28 → 42 px | Cita destacada |
| `text-3xl` | 36 → 64 px | Titular de sección |
| `text-4xl` | 44 → 92 px | Titular de hero |

### Reglas

- Serif en peso 300–400. **La itálica marca, no decora.** Se usa en dos
  lugares: la frase destacada de una sección (`PullQuote`, entera en cursiva)
  y **un solo sintagma por titular**, el que sostiene la frase. Se escribe en
  el contenido con `*asteriscos*` y lo resuelve `withEmphasis`, así los
  titulares siguen siendo texto plano y un editor podrá marcarlos el día que
  el contenido venga de un CMS. Nunca dos marcas en el mismo titular.
- Titulares: `leading` 1.05–1.12, `tracking` −0.02em. A mayor tamaño, más
  cerrado el interletrado.
- Cuerpo: sans, peso 400, `leading` 1.72, medida máxima 62ch.
- Eyebrow: sans, versales, `tracking` 0.24em, color `fg-muted`. Siempre precede
  al titular, siempre separado por `space-md`.
- Badge (`Badge`): el eyebrow dentro de un rectángulo de 1px en `rule`, para
  el concepto que va sobre el título de una obra. Al hover de la tarjeta el
  borde sube a `fg-faint` y el texto a `fg`.
- Ficha técnica: sans en `text-xs`, color `fg-muted`, sin versales.

## Espacio y ritmo

```
3xs .25   2xs .5   xs .75   sm 1   md 1.5   lg 2.5   xl 4   2xl 6 rem
3xl clamp(5rem, 10vw, 9rem)      padding vertical de sección
4xl clamp(7rem, 14vw, 13rem)     respiro mayor entre actos narrativos
```

El salto entre `2xl` y `3xl` es intencional. Es lo que produce la calma.

Ritmo vertical de la home: `3xl` entre secciones del mismo acto, `4xl` cuando
cambia el acto narrativo (mirada → obra → lenguaje → proceso → persona).

## Contenedores

| Token | Ancho | Uso |
| --- | --- | --- |
| `measure-wide` | 1440 px | Composiciones a casi sangre |
| `measure` | 1200 px | Contenedor por defecto |
| `measure-text` | 640 px | Columna de lectura |
| `measure-narrow` | 480 px | Introducciones y pies |

Margen lateral: `clamp(1.25rem, 5vw, 4rem)`.

Dos anchos distintos —composición y lectura— en lugar de uno solo. El texto
nunca hereda el ancho de la imagen.

## Grilla

12 columnas en `lg+`, 6 en `md`, 4 en `sm`. Canal `clamp(1rem, 2.5vw, 2rem)`.

La galería no es una grilla uniforme: las obras alternan entre 12, 8 y 6
columnas según su orientación y peso, para que la obra respire y no se lea como
catálogo de producto.

## Imágenes

- `next/image` siempre, con `sizes` explícito.
- Relación de aspecto declarada en el dato de la obra. Sin recortes automáticos
  que decidan por la composición de Mariela.
- La obra a sangre no lleva ficha superpuesta. Los metadatos van debajo.
- Sin bordes, sin sombras, sin esquinas redondeadas. La obra es la obra.
- Ausencia de imagen → `ArtworkFrame` renderiza el placeholder editorial:
  proporción correcta, hairline, y el título con la marca de pendiente. Se lee
  como una decisión, no como un error.

## Llegadas

Nada llega de golpe.

- **Anclas de la misma página** — Lenis las recorre con la misma curva que
  la rueda, con 96px de holgura para el encabezado fijo. `scroll-behavior`
  del navegador queda en `auto` porque competiría por el mismo gesto.
- **Anclas desde otra página** — el navegador salta al elemento antes de que
  Lenis exista, así que la página arranca arriba y baja sola. Espera a las
  tipografías: el destino todavía no está en su posición final.
- **Cambio de página** — un fundido cruzado de 260/380 ms con la API de View
  Transitions del navegador. El clic se intercepta *antes* de navegar: la
  API captura el cuadro actual, ejecuta el cambio y cruza ambos. Hacerlo
  después capturaría dos veces la misma página.

El encabezado y el pie llevan `view-transition-name` propio y se quedan
quietos. Un marco que se desvanece en cada navegación llama la atención
sobre el mecanismo en lugar de sobre la obra.

Todo esto se apaga con `prefers-reduced-motion`, y un navegador sin soporte
navega como antes.

## Navegación

«Obra» despliega el catálogo al pasar el puntero. Dos señales, porque el
panel contiene dos clases de enlace:

- Un **chevron** junto a la etiqueta indica que abre algo, y rota al abrirse.
  Sin él, un menú desplegable sólo se descubre por accidente.
- Las tres obras con página propia encabezan la lista y llevan una **flecha
  diagonal** al pasar el puntero: van a otra página. Las demás son anclas a su
  ficha en la galería y no llevan marca.

Los dos grupos se separan con una línea, no con un título: las flechas ya
dicen cuál es cuál. La flecha espera al puntero para que la lista en reposo
sea una columna de títulos y no una de títulos con símbolos.

## Contraste (medido, no estimado)

Los tonos sobre papel se midieron contra `#f4f4f2`. `fg-muted` estaba en
3,8:1 y `fg-faint` en 2,3:1 — ambos por debajo de AA, y se notaba justamente
en el formulario, donde son las etiquetas y los textos de ayuda. Ahora:

| Token | Valor | Contraste | Cumple |
| --- | --- | --- | --- |
| `fg-strong` | `#111110` | 17,2:1 | AA texto |
| `fg` | `#3d3d3b` | 9,9:1 | AA texto |
| `fg-muted` | `#5e5e5a` | 5,9:1 | AA texto |
| `fg-faint` | `#7c7c78` | 3,8:1 | AA grande / UI |
| `rule` | `#ddddd8` | 1,2:1 | decorativo |
| `field` | `#b4b4ad` | 1,7:1 | borde de campo |

`rule` y `field` son deliberadamente distintos: una línea de 1px es ornamento
y debe quedar callada, pero el borde de un campo es lo que indica dónde
escribir. Un mismo tono para ambos deja el formulario invisible.

## Enlaces y acciones

Sin esquinas redondeadas y sin relleno en reposo — el relleno aparece sólo
como respuesta al puntero. Cuatro niveles:

1. **Acción principal** — texto en versales pequeñas sobre una línea de 1px que
   ocupa el ancho del texto. Al hover la línea se retrae desde la derecha y
   vuelve a trazarse desde la izquierda, en 400 ms.
2. **Acción enmarcada** (`ActionButton`, utilidad `action-frame`) — rectángulo
   completo de 1px, trazado desde el reposo: un botón tiene que parecerlo
   antes de que el puntero lo encuentre. Al hover el fondo sube desde abajo en
   420 ms y el texto pasa al color del fondo, de modo que el botón se invierte
   en lugar de teñirse. El relleno es un pseudo-elemento escalado, no una
   transición de `background`: la transformación se compone en GPU y la
   entrada no se traba en una fila larga de botones. Como usa los tokens del
   fondo, el mismo componente sirve sobre papel y sobre cámara sin variantes.
3. **Enlace secundario** — texto con subrayado a 1px en `rule`, que pasa a
   `fg-strong` al hover.
4. **Enlace de navegación** — sin subrayado. Al hover y en la ruta activa,
   aparece una línea bajo el texto.

Foco: `outline: 1px solid currentColor; outline-offset: 4px`. Visible sobre
ambos fondos. Nunca se elimina.

## Movimiento

GSAP + ScrollTrigger para las entradas, Lenis para el scroll suavizado.
Ambos comparten el mismo reloj (`gsap.ticker`), así los triggers no se
desfasan de la posición real de la página.

| Primitiva | Qué hace | Duración |
| --- | --- | --- |
| `Reveal` texto | `opacity` 0→1, `y` 16px→0 | 1100 ms, `power3.out` |
| `Reveal` escalonado | `delay` de 90 ms entre hermanos, máximo 4 | |
| `Reveal` imagen | `opacity` 0→1, `scale` 1.03→1 | 1600 ms, `power2.out` |
| `Rule` | `scaleX` 0→1 desde la izquierda | 900 ms, `power2.inOut` |
| `ScrollZoom` | `scale` 1→1.06 atado al scroll | `scrub` |
| `ScrollReveal` | `opacity` 0→1, `y` 64px→0 atado al scroll | `scrub` 0.6 |
| `WorkGallery` | tira horizontal con la sección fijada | `scrub` 0.5 |
| `NavSubmenu` | regla + títulos escalonados 40 ms | 450/500 ms |
| `ContactSent` | regla, trazo del tilde, texto que sube | ~1 s en total |

Reglas: se dispara una sola vez y no vuelve atrás — al subir, nada se
re-oculta. Ningún cambio de escala supera el 6%. **Sin blur**: desenfocar
carboncillo lava la obra, y el brief es explícito en que la técnica nunca
debe gritar más fuerte que la obra. Sin cursor custom.

`ScrollReveal` es la entrada de la grilla de obra: la pieza sube mientras el
lector baja y se detiene cuando él se detiene. `Reveal` sigue siendo la
entrada por defecto — se dispara una vez y se reproduce sola.

`WorkGallery` fija la sección y convierte el gesto vertical en un recorrido
horizontal de láminas. Nunca secuestra el scroll: el pin dura exactamente el
ancho de la tira. Con menos de tres láminas, en pantallas angostas o con
movimiento reducido, es una tira deslizable normal.

El submenú de «Obra» abre con una regla que se traza y los títulos entrando
de a 40 ms. Se abre con el puntero y con el teclado; sin JavaScript queda
visible, así ningún enlace se pierde.

La confirmación del formulario dibuja el tilde en lugar de mostrarlo: un
tilde que aparece lee como notificación del sistema, uno que se traza lee
como una mano confirmando algo.

`prefers-reduced-motion: reduce` → no se arma ninguna entrada y Lenis no
arranca; el navegador scrollea la página como siempre.

El contenido es visible sin JavaScript: el estado oculto lo aplica el mismo
código que lo quita, nunca la hoja de estilos servida.

## Breakpoints

Los de Tailwind. `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.

Tres composiciones reales: móvil (una columna, obra a sangre), tablet (dos
columnas en grilla, texto a medida completa), escritorio (grilla de 12, obra
asimétrica).

## Qué el sistema no tiene

Colores de acento. Gradientes. Sombras. Glassmorphism. Esquinas redondeadas en
imágenes. Cards. Bordes decorativos. Texturas de papel o carboncillo. Iconos
ilustrativos. Botones rellenos. Badges de color. Animaciones de entrada rápidas.
