import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * PWA web manifest (served at `/manifest.webmanifest`) for SERP branding and
 * installability. Icons reference the existing favicon; add PNG icons under
 * `public/` and list them here when available.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#05060a',
    theme_color: '#05060a',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}
