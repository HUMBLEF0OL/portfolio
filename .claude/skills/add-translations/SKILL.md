---
name: add-translations
description: Add or update internationalized (i18n) copy across all locales in this next-intl portfolio. Use whenever introducing or changing any user-facing string, label, section title, or data key. Trigger on "add text", "new copy", "translate", "add a key", "update wording", "i18n", "new section title", or any task that surfaces visible text.
---

# Adding / updating translations

All user-facing text in this project comes from next-intl catalogs in `messages/`. There are **12 locale files** that MUST stay in sync.

## Locales (keep all in sync)
`en, es, fr, it, pt, ru, ja, ko, zh, ar, hi, de` — defined in `src/i18n/routing.ts`. `en.json` is the source of truth.

## Steps to add a key

1. Decide the namespace + key path (e.g. `About.title`, `Projects.cards.felis.description`). Mirror the existing nesting structure.
2. Add the key to **every** file in `messages/*.json` with the same path. Provide a real translation per language; if a translation is unknown, use the English value as a placeholder and flag it.
3. Read the string in code:
   - Server Component: `const t = await getTranslations("Namespace");` then `t("key")`.
   - Client Component (`"use client"`): `const t = useTranslations("Namespace");` then `t("key")`.
4. For nested namespaces, scope directly: `useTranslations("Projects.cards")`.

## Data-driven keys
Files in `src/data/*.json` reference translations by key (e.g. `titleKey: "projects.felis.title"`). When adding a data entry, add the matching `title`/`subtitle`/`description` keys under the right namespace in **all** locale files.

## Rules
- Never hardcode user-facing strings in components.
- Never add a key to only some locale files — all 12 or none.
- Preserve placeholders/ICU syntax (`{name}`) identically across locales.
- For links use the wrappers from `@/i18n/navigation`, not raw `next/link`.

## Verify
- Run `npm run lint` and ideally `npm run build`; missing keys in a locale will surface at runtime as the raw key.
