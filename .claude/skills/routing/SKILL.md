---
name: routing
description: Next.js App Router patterns for the portfolio — the [locale] segment, layouts, metadata, static rendering, and loading/error route files. Use when creating route structure and page-level routing artifacts.
paths:
  - src/app/**
---

# Routing Patterns

The portfolio uses the Next.js App Router with a single locale segment. Routes
live in `src/app/`.

## Structure

```
src/app/
├── layout.tsx            # Root: <html>/<body>, providers, metadataBase
├── page.tsx              # Redirect-only → /<locale> (exempt from metadata rule)
├── not-found.tsx
├── robots.ts · sitemap.ts · manifest.ts
└── [locale]/
    ├── layout.tsx        # generateStaticParams + setRequestLocale + Header/Footer
    └── page.tsx          # Home page (composes src/block sections) + generateMetadata
```

## `[locale]` layout (static rendering)

```tsx
import { setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale) // MUST be called before any next-intl API
  return <>{children}</>
}
```

`generateStaticParams` + `setRequestLocale` are required — the harness
(`check:harness`, predicate 14) fails the layout without them.

## Metadata (SEO)

Every non-redirect `page.tsx` exports `generateMetadata` (or a static
`metadata`). Build localized metadata with next-intl + `siteConfig`; never
hand-write canonical/hreflang URLs ad hoc. See the `seo` skill.

```tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return { title: t('home.title'), description: t('home.description') }
}
```

## Loading & Error States

```tsx
// src/app/[locale]/loading.tsx
export default function Loading() {
  return <div className="text-highlight p-8">Loading…</div>
}
```

```tsx
// src/app/[locale]/error.tsx
'use client'
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Rules

- Never add `'use client'` to `page.tsx` — push interactivity to child components.
- Define `metadata` or `generateMetadata` in every non-redirect `page.tsx`.
- Keep the `[locale]` layout statically renderable (`generateStaticParams` +
  `setRequestLocale`).
- Use `loading.tsx` / `error.tsx` for route-level Suspense and error boundaries.
- Locale detection/redirect lives in `src/middleware.ts` — don't reimplement it
  per route.
