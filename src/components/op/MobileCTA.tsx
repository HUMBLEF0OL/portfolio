'use client'

import { useLocale } from 'next-intl'
import site from '@/data/site.json'

/** Sticky bottom call-to-action shown only on mobile. */
export function MobileCTA() {
  const locale = useLocale()
  return (
    <div className="border-op-line-strong fixed right-0 bottom-0 left-0 z-[1100] flex items-center gap-3 border-t bg-[rgba(7,8,10,0.94)] px-4 py-3 backdrop-blur-[12px] md:hidden">
      <div className="flex flex-1 flex-col">
        <span className="text-op-text text-[0.9375rem] font-bold">Free 20-min intro call</span>
        <span className="text-op-dim flex items-center gap-2 font-mono text-[0.6875rem]">
          <span className="tm-pulse-dot bg-op-yellow inline-block h-1.5 w-1.5 rounded-full" />
          {site.availability.label}
        </span>
      </div>
      <a
        href={`/${locale}${site.nav.cta.href}`}
        className="clip-notch-10 bg-op-yellow text-op-base inline-flex items-center gap-1.5 px-4 py-3 font-mono text-[0.8125rem] font-bold tracking-[0.06em] uppercase"
      >
        Book ▸
      </a>
    </div>
  )
}
