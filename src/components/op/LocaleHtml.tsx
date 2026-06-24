'use client'

import { useLocale } from 'next-intl'
import { useEffect } from 'react'

/**
 * Sets <html lang> and <html dir> to the active locale on the client.
 *
 * The root layout renders above the [locale] segment, so it cannot resolve the
 * per-page locale during static rendering. This component runs inside the
 * [locale] layout (which knows the locale) and corrects the document element —
 * giving Arabic its `dir="rtl"` and every locale its correct `lang`.
 */
export function LocaleHtml() {
  const locale = useLocale()

  useEffect(() => {
    const el = document.documentElement
    el.lang = locale
    el.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  return null
}
