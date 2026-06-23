# src/i18n — Internationalization (next-intl)

- `routing.ts` — the 12 locales and `defaultLocale` (`defineRouting`). Source of
  truth for the locale list; `src/config/site.ts` must mirror it.
- `request.ts` — server request config; loads `messages/<locale>.json`.
- `navigation.ts` — locale-aware `Link`, `redirect`, `useRouter`,
  `usePathname`. Always import navigation from here, not raw `next/*`.

Catalogs live in `messages/<locale>.json` at the repo root; locale detection is
in `src/middleware.ts`. See the `i18n` skill.
