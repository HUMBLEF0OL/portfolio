import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * PWA web manifest (served at `/manifest.webmanifest`) for SERP branding and
 * installability. Icons reference the monogram favicon set generated from
 * `src/app/icon.svg` (`.ico` + `apple-icon.png` are auto-linked by Next.js;
 * the PNGs below live under `public/` for installable / maskable use).
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
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
