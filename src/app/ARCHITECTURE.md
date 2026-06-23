# src/app — App Router

Next.js App Router entry point.

- `layout.tsx` — root layout: `<html>`/`<body>`, fonts, `ThemeProvider`,
  `NextIntlClientProvider`, and the site `metadata` (incl. `metadataBase` from
  `@/config/site`).
- `page.tsx` — redirect-only root that sends `/` to `/<locale>` (exempt from the
  metadata predicate).
- `not-found.tsx` — 404 page.
- `globals.css` — Tailwind v4 CSS-first design system (`@theme`, angular-clip
  utilities). See the `design-tokens` skill.
- `robots.ts`, `sitemap.ts`, `manifest.ts` — SEO surfaces; each reads
  `@/config/site`.
- `[locale]/` — the locale segment: `layout.tsx` (with `generateStaticParams` +
  `setRequestLocale`) and `page.tsx` (home, with `generateMetadata`).

See the `routing` and `seo` skills.
