@AGENTS.md

# Project context

Website for **Mariela Crapuzzi**, a visual artist working in charcoal
(carboncillo). The site is editorial and contemplative — not a shop, not a
conventional portfolio.

Read `docs/` before building anything:

| File | Contains |
| --- | --- |
| `docs/Copy.md` | Approved Spanish copy, section by section — source of truth |
| `docs/Estructura.md` | Final page list |
| `docs/Estrategia.md` | Positioning, purpose of each page, visual direction |
| `docs/PROJECT_CONTEXT.md` | Synthesis, resolved conflicts between the above |
| `docs/DESIGN_SYSTEM.md` | Palette, type, scales, grids, motion |
| `docs/REFERENCE_AUDIT.md` | What each reference contributes, what to avoid |
| `docs/IMPLEMENTATION_PLAN.md` | Architecture and phases |
| `docs/ASSET_INVENTORY.md` | What exists, what is missing, specs for incoming files |
| `docs/CONTENT_PENDING.md` | Every declared gap and where it is resolved |

The copy in `docs/Copy.md` is written and approved. Use it verbatim — do not
invent or paraphrase marketing text.

**Status: home built.** Design system, content layer, header, footer and the
ten home sections are done and the production build passes. The remaining
pages are phase 4 of `docs/IMPLEMENTATION_PLAN.md`.

**No artwork or photography exists in the project.** Every image is a declared
placeholder. Never substitute a reference site's image or invent a work.

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

Full system in `docs/DESIGN_SYSTEM.md`. In short:

- **Two grounds, no third surface.** `data-ground="paper"` is where Mariela
  speaks; `data-ground="chamber"` is where the work hangs. No cards, no panels.
  Colours are semantic (`fg`, `fg-strong`, `fg-muted`, `rule`) and flip with the
  ground, so a component is written once.
- Type: **Newsreader** (editorial serif) + **Instrument Sans** (neutral).
  Not Cormorant Garamond — all three reference sites use it.
- No accent colour. The only accent is a 1px rule that draws itself.
- Motion: **GSAP + ScrollTrigger** for reveals, **Lenis** for smooth scrolling
  (`src/lib/reveal.ts`, `src/components/primitives/SmoothScroll.tsx`). Both
  share one clock so triggers stay locked to the scroll position. No blur, no
  parallax, no re-hiding on scroll-up. Hidden states are applied by the same
  code that removes them, never by the stylesheet, so content is never held
  hostage by JavaScript.
- Images: large format, cropped gazes, hands, strokes, real artwork texture.

Three reference sites inform the design, shared separately rather than
committed: `yuliabas.com` for visual direction and hierarchy,
`kristalynmiguel.com` for sensibility and artist presence, `lillicoart.com` for
narrative of process. Do not copy them — the formula is their combination with
Mariela's own identity. Ask for the snapshots if you need them locally.

## Pages

Main navigation: **Obra · Sobre mí · Encargos · Contacto**. The MC seal returns
home. `Prints` is not a top-level page in this first stage, and neither is
`Proceso` — the process content lives at `/sobre-mi#proceso`. See
`docs/PROJECT_CONTEXT.md` §7 for why, and §6 for the other conflicts this
document used to state incorrectly.

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
- **Content never lives in components.** Copy and artwork data are in
  `src/content/`; components receive props. Read through the async accessors in
  `src/lib/content.ts` — that is the only module that knows where content comes
  from, and the single file to rewrite when Supabase lands.
- Fetch data in Server Components; add Client Components only where interaction
  requires them (`Reveal`, `Rule`, `SiteHeader`).
- Missing information is declared, never invented: `ArtworkFrame` and `Figure`
  render an editorial placeholder, `Pending` marks absent data, and every gap is
  logged in `docs/CONTENT_PENDING.md`.
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
