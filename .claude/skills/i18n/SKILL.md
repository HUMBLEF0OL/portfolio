---
name: i18n
description: next-intl i18n conventions for the portfolio — locale routing, message catalogs (3 locales), translation helpers, locale switcher, and middleware locale detection. Use when adding or translating pages, adding message keys, or touching anything under src/i18n or messages.
---

# i18n Skill — next-intl

## Key Files

- `src/i18n/routing.ts` — locale list (12) and default locale (`defineRouting`).
- `src/i18n/navigation.ts` — locale-aware navigation (`Link`, `useRouter`,
  `usePathname`, `redirect`). Always import navigation from here.
- `src/i18n/request.ts` — server request config; loads `messages/<locale>.json`.
- `messages/<locale>.json` — translation catalogs at the **repo root**, one per
  locale: `en, es, zh` (`en` is the source of truth).
- `src/app/layout.tsx` — wraps the tree in `NextIntlClientProvider`.
- `src/app/[locale]/layout.tsx` — `generateStaticParams` + `setRequestLocale`.
- `src/middleware.ts` — locale detection + redirect.

## Adding a New Translation Key

1. Add the key to `messages/en.json` under the appropriate namespace.
2. Add the **same key** to **all 11 other** locale files (identical structure).
3. Type inference is automatic — no code generation needed.

> The harness convention: a missing key in any locale, or a hardcoded
> user-facing string in JSX, is a Convention violation. Use the
> `add-translations` skill to keep all 12 files in sync.

## Client vs Server Components

```tsx
// Client component
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('Header')
  return <p>{t('navLinks.home')}</p>
}
```

```tsx
// Server component / route handler
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('Page')
  return <p>{t('sections.loading')}</p>
}
```

## Data files reference keys

`src/data/*.json` holds content keyed to translations (e.g.
`titleKey: "projects.skinbattle.title"`). When adding such a key, add the
matching translation to every `messages/*` file.

## Adding a New Locale

1. Add the locale code to `src/i18n/routing.ts` → `locales`.
2. Create `messages/<locale>.json` with all keys from `en.json`.
3. Mirror the new locale in `src/config/site.ts` (`locales` + `ogLocaleMap`) —
   `check:harness` asserts `site.ts` locales match `routing.ts`.

## Pluralisation & Formatting

```json
{ "items": "{count, plural, =0 {No items} one {# item} other {# items}}" }
```

Use ICU message format for plurals and date/number formatting.

## Navigation

Use the wrappers from `@/i18n/navigation` (`Link`, `redirect`, `useRouter`,
`usePathname`) — never raw `next/link` / `next/navigation` — so the active
locale prefix is preserved.
