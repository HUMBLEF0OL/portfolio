---
name: seo
description: Right-sized, config-driven SEO for the portfolio — site.ts as the single source of facts, localized generateMetadata, canonical/hreflang, and robots/sitemap/manifest. Use when adding pages or touching anything under src/app or src/config/site.ts.
paths:
  - src/app/**
  - src/config/site.ts
---

# SEO (right-sized, config-driven)

SEO is config-driven infrastructure, not per-page hand-work. One config feeds
metadata, sitemap, robots, and manifest so they never drift. The harness
(`npm run check:harness`) enforces completeness.

## The single source of truth

`src/config/site.ts` holds locale-neutral facts: `name`, `description`, `url`,
`defaultLocale`, `locales`, `ogImage`, `ogLocaleMap`, `twitter`, `trailingSlash`,
`organization`. Its `locales`/`defaultLocale` **MUST** match
`src/i18n/routing.ts` (harness-checked). `url` is the production domain
(`https://humblefool.vercel.app/`) — the single place it is defined.

There is intentionally **no** `routes.ts`/`seoRoutes`, `llms.txt` route,
JSON-LD module, or `ai`/`verification` config — the portfolio has no private
routes and doesn't need that surface.

## Surfaces

- `src/app/robots.ts` — allow all; points at `/sitemap.xml`; sets `host`.
- `src/app/sitemap.ts` — one entry per locale of the home route, each with
  `alternates.languages` (hreflang incl. `x-default`). Use a fixed
  `lastModified` date — never `new Date()` (keeps the build deterministic).
- `src/app/manifest.ts` — PWA manifest reading `siteConfig.name`/`description`.
- `src/app/layout.tsx` (root) — sets `metadataBase: new URL(siteConfig.url)` and
  the OG/Twitter defaults, deriving duplicated facts from `siteConfig`.

## Every page gets metadata

Each non-redirect `page.tsx` exports `generateMetadata` (redirect-only pages like
the root `/` → `/<locale>` are exempt). Title/description are localized via
next-intl under the `Seo` namespace; `siteConfig` supplies the URLs.

```tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

const base = siteConfig.url.replace(/\/$/, '')

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: Object.fromEntries(siteConfig.locales.map((l) => [l, `${base}/${l}`])),
    },
  }
}
```

## Adding a page / route

1. Add `generateMetadata` to the new `page.tsx` (or `check:harness` predicate 10
   fails).
2. Add localized `Seo.<key>.title` / `.description` to **all 12** `messages/*`
   files (`add-translations`).
3. If it is a new indexable route, add it to `sitemap.ts` (one entry per locale
   with hreflang alternates).

## Static rendering

The `[locale]` layout must export `generateStaticParams` and call
`setRequestLocale(locale)` before any next-intl API (harness predicate 14) so the
locale tree renders statically.

## GEO content guidance

Write answer-first headings, use semantic HTML — these are what generative
engines extract.

## Related

- Routing/layout patterns → the `routing` skill.
- Adding the message keys → the `add-translations` skill.
