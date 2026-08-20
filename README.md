# Mariela Crappuzi — Website

Website for Mariela Crappuzi, a visual artist working in charcoal. The site is
editorial and contemplative: artist first, work second, commissions third.

```
.
└── web/                 Next.js site
    └── docs/            Strategy, structure, and approved copy
```

## Visual references

Three archived artist sites are used as visual direction. They are shared
separately (Drive) rather than committed — they are large and contain
third-party code.

| Site | Read it for |
| --- | --- |
| yuliabas.com | Visual direction, hierarchy, space, sophistication |
| kristalynmiguel.com | Sensibility, femininity, artist presence |
| lillicoart.com | Human narrative, technique, process |

The intended formula is Yulia Bas's visual direction + Kristalyn Miguel's
sensibility + Esme Lillico's narrative, with Mariela's own identity.

## Status

Scaffolding is complete. **No pages have been built yet** beyond the Next.js
starter — building the site is the next task.

| Piece | State |
| --- | --- |
| Next.js + TypeScript + Tailwind | Ready |
| Project documentation (`web/docs/`) | Ready — strategy, structure, copy |
| Agent context (`web/CLAUDE.md`) | Ready |
| Site pages | Not started |
| Admin panel (self-managed content) | Not started — planned with Supabase |

## Prerequisites

- Node.js 20
- npm 10 or newer

## Getting started

```bash
cd web
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Project documentation

Read these before building anything — they define the whole project:

| File | Contains |
| --- | --- |
| `web/docs/Estrategia.md` | Positioning, sitemap, purpose of each page, visual direction |
| `web/docs/Estructura.md` | Final page list |
| `web/docs/Copy.md` | Approved Spanish copy, section by section |

The copy is written and approved. Use it as-is rather than writing new text.

## Pages to build

Main navigation: **Obra · Proceso · Encargos · Sobre mí · Contacto**

Editorial pages, one per featured work:

- Jesús, la oveja y el lobo
- La Leona con su instinto
- Sueño de Primavera

Plus privacy policy and legal notice.

## Available scripts

Run from `web/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site is a Next.js app in `web/`, prerendered to static HTML at build time.
Every route is static; there is no database and no server-side data source yet.

### Vercel

1. Import `Marielacappuzzi/web-portfolio` in Vercel.
2. Set **Root Directory** to `web`. Everything else is detected.
3. Deploy. Canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`
   resolve from `VERCEL_PROJECT_PRODUCTION_URL` automatically, so the first
   deployment is already correct.
4. Once a custom domain is pointed at the project, set `NEXT_PUBLIC_SITE_URL`
   to it (no trailing slash). It takes precedence. See `web/.env.example`.

### Before going live

| | |
| --- | --- |
| Contact form endpoint | Not wired. The form validates and then says plainly that it is not connected. |
| Contact email and address | `web/src/content/site.ts` — still `null`. |
| Privacy policy and legal notice | Published as outlines; they need real ownership data. |
| Hero photograph | *Jesús, la oveja y el lobo* is unfinished; the band carries another piece meanwhile. |

Full list in `web/docs/CONTENT_PENDING.md`.

## Notes

- Site copy is Spanish; code, comments, and commit messages are English.
- The admin panel is a later stage. No CMS is wired up yet.
