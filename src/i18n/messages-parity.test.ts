import { describe, it, expect } from 'vitest'
import { routing } from './routing'

// Collect every leaf + object key path, e.g. "Hero.headlineLines[0]".
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix]
  if (Array.isArray(obj)) {
    // Arrays: recurse by index so shape (length + nested keys) is compared.
    return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k)
  )
}

async function load(locale: string) {
  return (await import(`../../messages/${locale}.json`)).default
}

describe('message catalog parity', () => {
  it('every locale mirrors en.json key paths exactly', async () => {
    const en = new Set(keyPaths(await load('en')))
    for (const locale of routing.locales) {
      if (locale === 'en') continue
      const theirs = new Set(keyPaths(await load(locale)))
      const missing = [...en].filter((k) => !theirs.has(k))
      const extra = [...theirs].filter((k) => !en.has(k))
      expect({ locale, missing, extra }).toEqual({ locale, missing: [], extra: [] })
    }
  })
})
