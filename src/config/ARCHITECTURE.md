# src/config — App configuration

- `site.ts` — `siteConfig`, the single source of locale-neutral SEO facts
  (`name`, `description`, `url`, `defaultLocale`, `locales`, `ogImage`,
  `ogLocaleMap`, `twitter`, `trailingSlash`, `organization`).

`locales`/`defaultLocale` MUST match `src/i18n/routing.ts` (asserted by
`npm run check:harness`). The root layout's `metadataBase` and the
robots/sitemap/manifest surfaces all read `url` from here. See the `seo` skill.
