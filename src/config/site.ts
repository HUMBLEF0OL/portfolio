/**
 * Locale-neutral SEO facts — the single source of truth for the SEO module.
 *
 * Locale-specific copy (page titles/descriptions) lives in next-intl messages
 * under the `Seo` namespace, NOT here. This object holds only facts that don't
 * change per locale.
 *
 * `locales`/`defaultLocale` MUST stay consistent with `src/i18n/routing.ts`
 * (the harness check `npm run check:harness` asserts this). `url` is the
 * production domain and is the single place it is defined — the root layout's
 * `metadataBase` and the robots/sitemap/manifest surfaces all read it.
 */
export const siteConfig = {
  name: 'HUMBLEF0OL',
  description:
    'Step into the Grid — the digital frontier of HUMBLEF0OL. Cybernetic UIs, modular code, and glitch-crafted experiences crafted at the edge of identity and interaction.',
  url: 'https://humblefool.vercel.app/',

  // i18n — mirrors src/i18n/routing.ts (harness-enforced).
  defaultLocale: 'en',
  locales: ['en', 'es', 'zh'],

  // Social cards.
  ogImage: '/og-image.png',
  ogLocaleMap: {
    en: 'en_US',
    es: 'es_ES',
    zh: 'zh_CN',
  },
  twitter: '@HUMBLEFOOL',

  // Canonical URL normalization policy.
  trailingSlash: false,

  // → Organization / author facts.
  organization: {
    name: 'Amit Rana',
    logo: '/og-image.png',
    sameAs: [] as string[],
  },
} as const
