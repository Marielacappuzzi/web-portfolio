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

- Serif en peso 300–400. **La itálica es excepción**, reservada a la frase
  destacada de una sección. Nunca por defecto.
- Titulares: `leading` 1.05–1.12, `tracking` −0.02em. A mayor tamaño, más
  cerrado el interletrado.
- Cuerpo: sans, peso 400, `leading` 1.72, medida máxima 62ch.
- Eyebrow: sans, versales, `tracking` 0.24em, color `fg-muted`. Siempre precede
  al titular, siempre separado por `space-md`.
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

## Enlaces y acciones

Sin botones rellenos. Tres niveles:

1. **Acción principal** — texto en versales pequeñas sobre una línea de 1px que
   ocupa el ancho del texto. Al hover la línea se retrae desde la derecha y
   vuelve a trazarse desde la izquierda, en 400 ms.
2. **Enlace secundario** — texto con subrayado a 1px en `rule`, que pasa a
   `fg-strong` al hover.
3. **Enlace de navegación** — sin subrayado. Al hover y en la ruta activa,
   aparece una línea bajo el texto.

Foco: `outline: 1px solid currentColor; outline-offset: 4px`. Visible sobre
ambos fondos. Nunca se elimina.

## Movimiento

Sin librerías. CSS e `IntersectionObserver`.

| Primitiva | Qué hace | Duración |
| --- | --- | --- |
| `Reveal` | `opacity` 0→1, `translateY` 14px→0 | 900 ms, `cubic-bezier(.16,1,.3,1)` |
| `Reveal` escalonado | `delay` de 90 ms entre hermanos, máximo 4 | |
| `ImageReveal` | `clip-path` inset desde abajo + `scale` 1.04→1 | 1400 ms |
| `Rule` | `scaleX` 0→1 desde la izquierda | 700 ms |

Reglas: se dispara una sola vez, nunca al revés. Nada se mueve en el eje X.
Ningún cambio de escala supera el 4%. Sin parallax con `scrub`, sin scroll
hijacking, sin scroll suave sintético, sin cursor custom.

`prefers-reduced-motion: reduce` → solo `opacity`, 300 ms, sin transformaciones.
El contenido es visible sin JavaScript: el estado inicial oculto se aplica desde
el propio observador, no desde el CSS servido.

## Breakpoints

Los de Tailwind. `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.

Tres composiciones reales: móvil (una columna, obra a sangre), tablet (dos
columnas en grilla, texto a medida completa), escritorio (grilla de 12, obra
asimétrica).

## Qué el sistema no tiene

Colores de acento. Gradientes. Sombras. Glassmorphism. Esquinas redondeadas en
imágenes. Cards. Bordes decorativos. Texturas de papel o carboncillo. Iconos
ilustrativos. Botones rellenos. Badges de color. Animaciones de entrada rápidas.
