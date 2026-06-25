'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { useLocale, useMessages } from 'next-intl'
import { usePathname } from 'next/navigation'
import config from '@/data/config.json'
import languages from '@/data/languages.json'
import { GlitchText } from '@/components/op/GlitchText'
import { LiveClock } from '@/components/op/LiveClock'
import { EASTER_EGGS_ENABLED, LOGO_COMBO_EVENT } from '@/lib/easter-eggs'
import { cn } from '@/lib/utils'
import type { NavContent } from '@/types/content'

// 5 rapid clicks within this window fire the logo easter egg instead of
// navigating home.
const LOGO_COMBO_COUNT = 5
const LOGO_COMBO_WINDOW_MS = 350

/** Operator-design fixed navigation bar. */
const Header = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const messages = useMessages()
  const nav = messages.Nav as NavContent
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const logoClicksRef = useRef(0)
  const logoNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(
    () => () => {
      if (logoNavTimerRef.current) clearTimeout(logoNavTimerRef.current)
    },
    []
  )

  const localize = (href: string) =>
    href.startsWith('#') ? `/${locale}${href}` : `/${locale}${href === '/' ? '' : href}`

  // Debounce logo clicks: a single click navigates home after a short pause,
  // but 5 rapid clicks fire the easter egg instead. When eggs are disabled the
  // logo behaves like a normal link.
  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!EASTER_EGGS_ENABLED) return
    e.preventDefault()
    const home = localize('/')
    logoClicksRef.current += 1
    if (logoNavTimerRef.current) clearTimeout(logoNavTimerRef.current)

    if (logoClicksRef.current >= LOGO_COMBO_COUNT) {
      logoClicksRef.current = 0
      window.dispatchEvent(new Event(LOGO_COMBO_EVENT))
      return
    }

    logoNavTimerRef.current = setTimeout(() => {
      logoClicksRef.current = 0
      window.location.href = home
    }, LOGO_COMBO_WINDOW_MS)
  }

  const switchLocale = (next: string) => {
    const rest = pathname.replace(/^\/[a-z]{2}/, '')
    window.location.replace(`/${next}${rest}`)
  }

  return (
    <header
      className={cn(
        // Transition only the cheap colour properties; the backdrop blur snaps
        // on/off with the binary scroll state. Animating backdrop-filter forces
        // the GPU to re-sample the blur every frame of the transition (jank).
        'fixed top-0 right-0 left-0 z-[1000] border-b transition-[background-color,border-color] duration-300',
        condensed
          ? 'border-op-line bg-[rgba(7,8,10,0.85)] backdrop-blur-[14px]'
          : 'border-transparent'
      )}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-7 py-[15px]">
        {/* Logo */}
        <a href={localize('/')} onClick={onLogoClick} className="flex items-center gap-[11px]">
          <span className="clip-notch-7 bg-op-yellow font-display text-op-base inline-flex h-[26px] w-[26px] items-center justify-center text-[1rem] leading-none">
            {config.identity.monogram}
          </span>
          <GlitchText className="anton text-op-text text-[1.2rem] leading-none">
            {config.identity.name.toUpperCase()}
          </GlitchText>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={localize(link.href)}
              className="text-op-dim2 hover:text-op-cyan font-mono text-[0.8125rem] tracking-[0.08em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          {config.nav.showClock && (
            <span className="font-mono text-[0.8125rem] tracking-[0.08em]">
              <LiveClock timezone={config.nav.clockTimezone} />
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
            href={localize(nav.cta.href)}
            className="clip-notch-10 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[18px] py-[11px] font-mono text-[0.75rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-1px] hover:[filter:drop-shadow(0_0_12px_rgba(252,238,10,0.55))]"
          >
            {nav.cta.label} ▸
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
            {nav.links.map((link) => (
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
