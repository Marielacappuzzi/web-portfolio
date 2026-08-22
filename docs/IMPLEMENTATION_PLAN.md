# Plan de implementación

## Principios de arquitectura

1. **El contenido no vive en los componentes.** Todo texto y todo dato de obra
   está en `src/content/`. Los componentes reciben props.
2. **El acceso al contenido es asíncrono desde el primer día.** `src/lib/content.ts`
   expone funciones `async`. Hoy leen TypeScript estático; mañana leen Supabase.
   Los componentes no cambian.
3. **Server Components por defecto.** `"use client"` solo donde hay interacción
   real: menú móvil, formulario, observador de scroll.
4. **Cero dependencias nuevas.** Movimiento con CSS e `IntersectionObserver`.
5. **Lo que falta se declara, no se inventa.** Componente `Pending` y placeholder
   editorial en `ArtworkFrame`.

## Estructura de archivos

```
src/
├── app/
│   ├── layout.tsx                    fuentes, metadata, header, footer
│   ├── globals.css                   tokens @theme + capa base
│   ├── page.tsx                      Inicio
│   ├── icon.tsx                      favicon derivado del sello
│   ├── sitemap.ts  robots.ts
│   ├── not-found.tsx
│   ├── obra/page.tsx                 galería
│   ├── obra/[slug]/page.tsx          editorial de obra
│   ├── sobre-mi/page.tsx             + sección #proceso
│   ├── encargos/page.tsx
│   ├── contacto/page.tsx
│   ├── privacidad/page.tsx
│   └── aviso-legal/page.tsx
├── components/
│   ├── layout/       SiteHeader · SiteFooter · Section · Container
│   ├── primitives/   Reveal · Eyebrow · Display · Prose · ActionLink ·
│   │                 Rule · Pending · Figure
│   ├── work/         ArtworkFrame · WorkMeta · WorkCard · WorkGrid ·
│   │                 FeaturedWork
│   └── home/         una por sección de Copy.md
├── content/
│   ├── types.ts      Work, Site, HomeContent…
│   ├── site.ts       nav, footer, contacto, legal
│   ├── works.ts      catálogo de obras
│   └── home.ts       copy de la home, verbatim de Copy.md
└── lib/
    ├── content.ts    accesores async
    └── cn.ts
```

## Fases

### Fase 1 — Auditoría ✅

`PROJECT_CONTEXT.md`, `REFERENCE_AUDIT.md`, `ASSET_INVENTORY.md`, este documento.

### Fase 2 — Sistema visual ✅

`DESIGN_SYSTEM.md` + tokens en `globals.css`. Paleta, tipografía, escalas,
contenedores, ritmo vertical, grilla, imágenes, enlaces, estados, movimiento,
breakpoints.

### Fase 3 — Prototipo funcional (home) ✅ · revisada 2026-08-09

**Revisión.** La primera home tenía diez secciones y unas 600 palabras de prosa,
siguiendo el orden de `Copy.md` al pie de la letra. La auditoría en vivo de
yuliabas.com mostró que su home tiene tres bloques y una sola frase de prosa, y
que las otras dos referencias no pasan de seis bloques.

La home se rehízo a **cuatro secciones y ~90 palabras**. El copy aprobado no se
descartó: se reubicó a la página que le corresponde. Tabla completa en
`PROJECT_CONTEXT.md` §8.

Orden de construcción original:

Orden de construcción:

1. Tokens y capa base.
2. Primitivas: `Reveal`, `Eyebrow`, `Display`, `Prose`, `ActionLink`, `Rule`, `Pending`.
3. `Container` y `Section` con los dos fondos (papel / cámara).
4. `SiteHeader` — sello MC, nav de cuatro ítems, menú móvil, estado al hacer scroll.
5. `SiteFooter`.
6. Capa de contenido: `types.ts`, `site.ts`, `works.ts`, `home.ts`, `lib/content.ts`.
7. Sistema de obra: `ArtworkFrame` con placeholder, `WorkMeta`, `WorkCard`, `WorkGrid`.
8. Las diez secciones de la home, en el orden de `Copy.md`.
9. Responsive y `prefers-reduced-motion`.

### Fase 4 — Extensión del sistema ✅

1. `/obra` — galería única, escalable a filtros y colecciones.
2. `/obra/[slug]` — plantilla editorial. Concepto → título → obra sobre cámara →
   historia → detalles → proceso → ficha técnica → edición → obra siguiente.
3. `/sobre-mi` — recorrido, la declaración, el carboncillo y `#proceso`.
4. `/encargos` — conversación, tipos, cinco etapas, apartados prácticos.
5. `/contacto` — formulario de seis campos con validación, medios secundarios.
6. `/privacidad` y `/aviso-legal`.
7. `sitemap.ts`, `robots.ts`, `not-found.tsx`.

Bloques compartidos creados para no duplicar maquetación entre páginas:
`PageHeader`, `ProseSection`, `ProcessList`, `ContactCallout`, `PendingTopics`.

Pendiente en esta fase: JSON-LD de tipo `Person` y `VisualArtwork`, que necesita
datos reales de obra (año, medidas, técnica).

### Fase 5 — Pulido

Ritmo, jerarquía, consistencia, responsive en tres tamaños, `npm run build`,
Lighthouse, foco visible, contraste, orden de tabulación, `alt` reales,
`prefers-reduced-motion`, estados vacíos y marcadores de pendiente.

## Fuera de alcance en esta versión

- Ecommerce, carrito, checkout, precios.
- Panel de autogestión. Preparado, no construido.
- Filtros y categorías en la galería. La estructura de datos ya los contempla.
- Multi-idioma. El sitio es en español.
- Backend del formulario. El formulario se construye con validación y estados;
  el endpoint queda declarado y pendiente de decidir.

## Riesgos abiertos

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| No hay ningún asset | La home no puede evaluarse con obra real | Placeholder editorial con proporción y jerarquía correctas. La composición sí es evaluable. |
| Obra del hero sin terminar | Bloquea el lanzamiento | Confirmado por el briefing. El componente acepta la imagen final sin refactor. |
| Faltan email e Instagram | Footer y contacto incompletos | Marcador `Pending` visible. Registrado en `CONTENT_PENDING.md`. |
| Ubicación de "Proceso" | Decisión estructural sin confirmar | Sección aislada, promovible a página propia. |
| Grafía del apellido | Aparece en todo el sitio | Un solo valor en `site.ts`. |
