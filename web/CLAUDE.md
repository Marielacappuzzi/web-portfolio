@AGENTS.md

# Project context

Website for **Mariela Crappuzi**, a visual artist working in charcoal
(carboncillo). The site is editorial and contemplative — not a shop, not a
conventional portfolio.

Read `docs/` before building anything:

| File | Contains |
| --- | --- |
| `docs/Estrategia.md` | Positioning, sitemap, purpose of each page, visual direction |
| `docs/Estructura.md` | Final page list |
| `docs/Copy.md` | Approved Spanish copy, section by section |

The copy in `docs/Copy.md` is written and approved. Use it verbatim — do not
invent or paraphrase marketing text.

**Status: scaffolding only.** No pages have been built yet beyond the Next.js
starter. Building the site is the next task.

## Positioning (drives every design decision)

The hierarchy is **artist → work → artistic universe → commissions**. Mariela is
a visual artist first; commissions are a commercial expression of her practice,
not her identity. Never frame the site around "order a portrait".

Her differentiator is interpretation, not photorealism: she listens to the
story, understands the bond, and builds the composition around the gaze. The
gaze is the conceptual centre of the work.

Guiding visual principle, quoted from the brief:

> La técnica nunca debe gritar más fuerte que la obra.

Practically: no charcoal textures, paper grain, or decorative effects. Richness
comes from composition, whitespace, typography, and the artwork itself.

## Design direction

- Palette: white, black, greyscale, very neutral tones. No strong accent colour.
- Type: editorial serif for headings, neutral sans for body and navigation.
- Motion: slow, soft fades and subtle zooms. Motion should aid contemplation.
  Nothing that reads as technological or attention-seeking.
- Images: large format, cropped gazes, hands, strokes, real artwork texture.

Three reference sites inform the design, shared separately rather than
committed: `yuliabas.com` for visual direction and hierarchy,
`kristalynmiguel.com` for sensibility and artist presence, `lillicoart.com` for
narrative of process. Do not copy them — the formula is their combination with
Mariela's own identity. Ask for the snapshots if you need them locally.

## Pages

Main navigation: **Obra · Proceso · Encargos · Sobre mí · Contacto**. The MC
logo returns home. `Prints` is not a top-level page in this first stage.

Editorial pages, one per featured work: *Jesús, la oveja y el lobo*,
*La Leona con su instinto*, *Sueño de Primavera*.

Legal: privacy policy, legal notice.

The primary call to action is human, never commercial:

> Cuéntame la historia que te gustaría convertir en una obra.

Avoid "Comprar ahora", "Pedir presupuesto", "Encargar ya".

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 — configured through `@tailwindcss/postcss`, no config file
- Node 20 is the pinned runtime for this project

## Conventions

- Site copy is **Spanish** — it comes from `docs/Copy.md`.
- Code, identifiers, comments, and commit messages are **English**.
- Use the `@/*` alias for imports under `src/`.
- Fetch data in Server Components; add Client Components only where interaction
  requires them.
- Gallery items carry discreet metadata: title · year, medium · dimensions,
  and status tags (Obra personal / Obra por encargo / Print, Disponible /
  Colección privada / Agotado). Keep it quiet — the image leads.

## Next.js 16 gotchas

This version has breaking changes relative to older training data. Check
`node_modules/next/dist/docs/` before using an API. Notably:

- Request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are async
  and must be awaited.
- `images.domains` is removed — use `images.remotePatterns`.
- `middleware.ts` is now `proxy.ts`.
- `images.qualities` defaults to `[75]`.
- `next lint` is removed; run `eslint` through `npm run lint`.

## Content management (not built yet)

The client must be able to publish work and articles without touching code. The
admin panel is a later task — Supabase for auth, Postgres, and image storage,
with a rich text editor. Nothing of this exists yet; do not assume a CMS is
wired up.
