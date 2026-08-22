# Mariela Crapuzzi — Website

Website for Mariela Crapuzzi, a visual artist working in charcoal. The site is
editorial and contemplative: artist first, work second, commissions third.

```
.
├── src/     Application code
├── public/  Images and brand assets
└── docs/    Strategy, structure, approved copy, design system
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + Lenis for
motion · Resend for the contact form. Node 20.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

To exercise the contact form locally, copy `.env.example` to `.env.local` and
fill in the values. Without them the form validates and then says plainly that
it is not connected — it never reports a false success.

## Project documentation

Read these before changing anything — they define the project:

| File | Contains |
| --- | --- |
| `docs/Copy.md` | Approved Spanish copy, section by section — source of truth |
| `docs/Estrategia.md` | Positioning, purpose of each page, visual direction |
| `docs/Estructura.md` | Page list |
| `docs/PROJECT_CONTEXT.md` | Synthesis; resolves conflicts between the above |
| `docs/DESIGN_SYSTEM.md` | Palette, type, scales, grids, motion |
| `docs/CONTENT_PENDING.md` | Every declared gap and where it is resolved |
| `docs/ASSET_INVENTORY.md` | What exists, what is missing, specs for new files |

The copy is written and approved. Use it as-is rather than writing new text.

## Pages

Main navigation: **Obra · Sobre mí · Encargos · Contacto**. Hovering *Obra*
opens the catalogue; the process content lives at `/sobre-mi#proceso`.

Editorial pages: *Jesús, la oveja y el lobo*, *Bajo su Protección*,
*Sueño de Primavera*. Plus privacy policy and legal notice.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |

## Contact form

Enquiries are delivered by [Resend](https://resend.com) to Mariela's Gmail.
Nothing is stored: the form posts to `/api/contacto`, which validates on the
server and hands the message straight to Resend.

Two details in `src/lib/contact.ts` are deliberate and should survive any
rewrite:

- **The sender is always a verified address on Mariela's own domain**, never
  the visitor's. Forging the sender fails SPF and DKIM, and the message lands
  in spam. The visitor's address travels in `Reply-To`, so hitting Reply in
  Gmail answers them directly.
- **The module is marked `server-only`.** Importing it from a Client Component
  is a build error — that is the one mistake that would publish a live API key
  in a public JavaScript file.

Spam is handled by a honeypot field rather than a CAPTCHA. It costs the
visitor nothing, which matters on a page meant to read as the beginning of a
conversation.

### Setting it up

1. **Verify the domain in Resend** — Domains → Add Domain → `marielacrapuzzi.com`,
   then add the DNS records it gives you. Sending fails until this is done.
2. **Create an API key** — Resend → API Keys.
3. **Set the environment variables** in Vercel (Settings → Environment
   Variables) and in `.env.local` for development. All are listed with their
   purpose in `.env.example`.

Never commit real values. `.env.local` is git-ignored; `.env.example` carries
the documented template only.

## Deployment

Every route is prerendered to static HTML at build time except `/api/contacto`,
which runs on demand. There is no database.

### Vercel

1. Import `Marielacappuzzi/web-portfolio`.
2. Leave **Root Directory** empty — the project sits at the repository root.
3. Add the environment variables from `.env.example`.
4. Deploy. Canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`
   resolve from `VERCEL_PROJECT_PRODUCTION_URL` automatically, so the first
   deployment is already correct.
5. Once the domain is pointed at the project, set `NEXT_PUBLIC_SITE_URL` to it
   (no trailing slash). It takes precedence.

## Before going live

| | |
| --- | --- |
| Resend domain verification | Required before any enquiry can be delivered. |
| Public email address | `src/content/site.ts` — still `null`, so the footer shows a pending marker. Publishing a personal Gmail exposes it to scrapers; an address on the domain, forwarded to the Gmail, is the better answer. |
| Privacy policy and legal notice | Published as outlines; they need real ownership data. |
| Hero photograph | *Jesús, la oveja y el lobo* is unfinished; the cover carries another piece meanwhile. |

Full list in `docs/CONTENT_PENDING.md`.

## Visual references

Three archived artist sites inform the design. They are shared separately
rather than committed — they are large and contain third-party code.

| Site | Read it for |
| --- | --- |
| yuliabas.com | Visual direction, hierarchy, space, sophistication |
| kristalynmiguel.com | Sensibility, femininity, artist presence |
| lillicoart.com | Human narrative, technique, process |

The formula is their combination with Mariela's own identity — never a copy.

## Notes

- Site copy is Spanish; code, comments, and commit messages are English.
- The admin panel is a later stage. No CMS is wired up yet.
