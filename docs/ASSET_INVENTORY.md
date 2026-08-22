# Inventario de assets

Última revisión: 2026-08-09, tras recibir `IMAGENES MARIELA/` y
`Fichas_tecnicas_obras_Mariela_Crapuzzi_Web_v4.pdf`.

## Resumen

**9 obras con fotografía y ficha técnica completa.** Una obra pendiente. Dos
fotografías de Mariela integradas. Ningún dato inventado: todas las fichas son
verbatim del PDF.

| Categoría | Estado |
| --- | --- |
| Obras fotografiadas | 9 de 10 |
| Fichas técnicas | 9 de 10, completas |
| Retrato de Mariela | ✅ |
| Mariela trabajando | ✅ |
| Sello / logotipo MC | ❌ pendiente de recibir |
| Recortes de mirada y detalles | ❌ sin seleccionar |
| Fotografías de proceso por obra | ❌ sin seleccionar |

---

## Catálogo

Leyenda: **APT** apto para web · **EDI** requiere edición · **RES** resolución
justa · **PR** pendiente de recibir

| Obra | Slug | Archivo | px | Estado |
| --- | --- | --- | --- | --- |
| Bajo su Protección | `bajo-su-proteccion` | `principal.jpg` + 7 extras | 1315 × 1920 | **APT** · recorte limpio a los bordes de la obra |
| Sueño de Primavera | `sueno-de-primavera` | `principal.jpg` + 3 extras | 1376 × 1920 | **APT** · recorte limpio |
| Toro Salvaje | `toro-salvaje` | `principal.jpg` | 1080 × 1920 | **EDI** · encuadre 9:16 que corta la hoja; asoma la pared arriba |
| Oltre lo Sguardo | `oltre-lo-sguardo` | `principal.jpg` + 7 extras | 1440 × 1920 | **EDI** · márgenes de papel y fondo visibles |
| Materia | `materia` | `principal.jpg` + 2 extras | 1440 × 1920 | **EDI** · pared, cinta adhesiva y márgenes de papel visibles |
| Gracia | `gracia` | `principal.jpg` + 1 extra | 1079 × 1920 | **EDI** · pared y márgenes de papel visibles |
| Nina | `nina` | `principal.jpg` + 4 extras | 1385 × 1920 | **EDI** · márgenes de papel visibles |
| Huella | `huella` | `principal.jpg` + 3 extras | 1079 × 1920 | **EDI** · fondo y márgenes visibles |
| Molly | `molly` | `principal.jpg` + 2 extras | 1452 × 1920 | **EDI** · márgenes de papel visibles |
| Jesús, la oveja y el lobo | `jesus-la-oveja-y-el-lobo` | — | — | **PR** · obra sin terminar |

### Dos problemas transversales

**1. Seis de nueve requieren recorte.** Las fotografías muestran la pared, la
cinta adhesiva o los márgenes del papel. El criterio del PDF es explícito —
*"la obra debe tener el mayor protagonismo visual"*— y un encuadre con pared y
cinta contradice ese criterio en una grilla de galería. El recorte a los bordes
de la obra es la corrección; los originales quedan intactos en
`IMAGENES MARIELA/`.

**2. Resolución justa.** Todas las imágenes tienen 1920 px de alto y entre 1079
y 1452 px de ancho. Para una obra mostrada a ~700 px de ancho en escritorio, en
pantalla 2× hacen falta ~1400 px: las de 1079 px quedan por debajo. Funciona,
pero no permite ampliar la obra ni mostrarla a sangre en pantallas grandes.
Refotografiar a ≥2400 px en el lado largo es lo que corresponde antes del
lanzamiento.

Ninguno de los dos bloquea la revisión del diseño.

### Extras

Cada carpeta de `public/obra/<slug>/` conserva sus imágenes adicionales como
`extra-01.jpg`, `extra-02.jpg`… Todavía **no están asignadas**: hace falta
revisarlas para decidir cuáles son recortes de detalle, cuáles son fotografías
de proceso y cuáles son tomas de contexto. Las secciones "El detalle" y "El
proceso" de las páginas editoriales solo se renderizan cuando tienen imágenes,
así que hoy no aparecen.

## Fotografía de la artista

| Archivo | Origen | Uso | Estado |
| --- | --- | --- | --- |
| `estudio/mariela-retrato.jpg` | `Mariela3.jpg` | `/sobre-mi`, columna izquierda | **APT** |
| `estudio/mariela-trabajando.jpg` | `Mariela6.jpg` | `/sobre-mi`, antes de `#proceso` | **APT** · Mariela de pie ante el tablero trabajando *Toro Salvaje* |
| `estudio/extra-01…07.jpg` | resto de `Mariela/` | sin asignar | |

`mariela-trabajando` es la mejor pieza del lote: manos, guante, carboncillo y
obra en curso en una sola imagen. Es exactamente lo que el briefing pedía para
el proceso.

## Identidad

| Asset | Uso | Estado |
| --- | --- | --- |
| Sello MC | Header, footer, favicon, OG | **PR** — se necesita en SVG. El header usa hoy el monograma tipográfico. |
| Imagen Open Graph | Metadata | **PR** — debería ser un recorte de obra. |

---

## Convención de archivos

```
public/obra/<slug>/principal.jpg
public/obra/<slug>/extra-NN.jpg
public/estudio/mariela-retrato.jpg
public/estudio/mariela-trabajando.jpg
public/marca/sello-mc.svg          ← pendiente
```

Cada archivo se declara en `src/content/works.ts` con su ancho y alto reales en
píxeles. `ArtworkFrame` toma de ahí la proporción de cada obra, en lugar de
forzarlas todas a un mismo recorte: el catálogo va de 100 × 70 a 33 × 27 cm y
un contenedor de proporción única cortaría composiciones ya resueltas.

## Especificaciones para el material entrante

- **Resolución:** lado largo ≥ 2400 px para obras completas, ≥ 3000 px para
  recortes de mirada que se muestren a sangre.
- **Formato:** JPEG o TIFF sin compresión agresiva. La conversión a AVIF/WebP
  la hace Next.js.
- **Color:** sRGB, sin dominante cálida en el papel.
- **Encuadre:** obra completa a escuadra, **sin marco, sin pared, sin cinta y
  sin reflejos**. Los detalles como archivo aparte, no como recorte del maestro.

---

## Material de referencia — no reutilizable

Propiedad de terceros, solo para estudio de dirección de arte.

| Origen | Contenido |
| --- | --- |
| `yuliabas.com/` | Espejo completo: 12 HTML incluidos `index`, `about` y las nueve series |
| `kristalynmiguel.com/` | 5 HTML, 8 imágenes |
| `lillicoart.com/` | 7 HTML, `styles.css`, `navigation.js`, 12 WebP |
| `static.parastorage.com/` | Bundles de plataforma Wix del espejo de yuliabas |
