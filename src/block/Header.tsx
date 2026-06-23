'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import site from '@/data/site.json'
import languages from '@/data/languages.json'
import { GlitchText } from '@/components/op/GlitchText'
import { LiveClock } from '@/components/op/LiveClock'
import { cn } from '@/lib/utils'

/** Operator-design fixed navigation bar. */
const Header = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const localize = (href: string) =>
    href.startsWith('#') ? `/${locale}${href}` : `/${locale}${href === '/' ? '' : href}`

  const switchLocale = (next: string) => {
    const rest = pathname.replace(/^\/[a-z]{2}/, '')
    window.location.replace(`/${next}${rest}`)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-[1000] border-b transition-[background-color,backdrop-filter] duration-300',
        condensed
          ? 'border-op-line bg-[rgba(7,8,10,0.85)] backdrop-blur-[14px]'
          : 'border-transparent'
      )}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-7 py-[15px]">
        {/* Logo */}
        <a href={localize('/')} className="flex items-center gap-[11px]">
          <span className="clip-notch-7 bg-op-yellow font-display text-op-base inline-flex h-[26px] w-[26px] items-center justify-center text-[1rem] leading-none">
            {site.identity.monogram}
          </span>
          <GlitchText className="anton text-op-text text-[1.2rem] leading-none">
            {site.identity.name.toUpperCase()}
          </GlitchText>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.links.map((link) => (
            <a
              key={link.label}
              href={localize(link.href)}
              className="text-op-dim2 hover:text-op-cyan font-mono text-[0.8125rem] tracking-[0.08em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          {site.nav.showClock && (
            <span className="font-mono text-[0.8125rem] tracking-[0.08em]">
              <LiveClock timezone={site.nav.clockTimezone} />
            </span>
          )}
        </nav>

        {/* Right: locale + CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <select
            aria-label="Language"
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="text-op-dim2 hover:text-op-cyan hidden bg-transparent font-mono text-[0.75rem] tracking-[0.08em] uppercase outline-none md:inline-block"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-op-base text-op-text">
                {l.code.toUpperCase()}
              </option>
            ))}
          </select>

          <a
            href={localize(site.nav.cta.href)}
            className="clip-notch-10 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[18px] py-[11px] font-mono text-[0.75rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-1px] hover:[filter:drop-shadow(0_0_12px_rgba(252,238,10,0.55))]"
          >
            {site.nav.cta.label} ▸
          </a>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex md:hidden"
            aria-expanded={menuOpen}
          >
            <Menu className="text-op-dim h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-op-line border-t bg-[rgba(7,8,10,0.97)] px-7 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {site.nav.links.map((link) => (
              <a
                key={link.label}
                href={localize(link.href)}
                onClick={() => setMenuOpen(false)}
                className="text-op-text py-3 font-mono text-[0.875rem] tracking-[0.08em] uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="border-op-line mt-2 flex flex-wrap gap-2 border-t pt-3">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={cn(
                    'font-mono text-[0.7rem] tracking-[0.08em] uppercase',
                    l.code === locale ? 'text-op-yellow' : 'text-op-dim2'
                  )}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
