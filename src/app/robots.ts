import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

const base = siteConfig.url.replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
