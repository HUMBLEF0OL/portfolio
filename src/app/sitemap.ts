import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

const base = siteConfig.url.replace(/\/$/, '')

// Fixed date keeps the build deterministic — never `new Date()` here.
const LAST_MODIFIED = new Date('2026-06-23')

/**
 * One entry per locale of the home route, each carrying `alternates.languages`
 * (hreflang incl. `x-default`). The portfolio is a single localized page; add
 * more routes here as they are introduced.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {}
  for (const locale of siteConfig.locales) {
    languages[locale] = `${base}/${locale}`
  }
  languages['x-default'] = `${base}/${siteConfig.defaultLocale}`

  return siteConfig.locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }))
}
