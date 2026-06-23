import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import caseStudies from '@/data/caseStudies.json'

const base = siteConfig.url.replace(/\/$/, '')

// Fixed date keeps the build deterministic — never `new Date()` here.
const LAST_MODIFIED = new Date('2026-06-23')

const slugs = caseStudies.caseStudies.map((c) => c.slug)

/**
 * Emits, per locale, the home, /about, and every /work/<slug> case-study route,
 * each carrying `alternates.languages` (hreflang incl. `x-default`).
 */
function alternatesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of siteConfig.locales) {
    languages[locale] = `${base}/${locale}${path}`
  }
  languages['x-default'] = `${base}/${siteConfig.defaultLocale}${path}`
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  const paths: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    ...slugs.map((slug) => ({ path: `/work/${slug}`, priority: 0.7 })),
  ]

  for (const { path, priority } of paths) {
    const languages = alternatesFor(path)
    for (const locale of siteConfig.locales) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority,
        alternates: { languages },
      })
    }
  }

  return entries
}
