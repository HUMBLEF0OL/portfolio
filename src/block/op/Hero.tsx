'use client'

import { cn } from '@/lib/utils'
import { HeroCanvas } from '@/components/op/HeroCanvas'
import { ScrambleText } from '@/components/op/ScrambleText'
import site from '@/data/site.json'

export default function Hero() {
  const { hero } = site

  return (
    <header className="border-op-line relative flex min-h-screen flex-col justify-between overflow-hidden border-b">
      {/* Background: matrix rain + gradient scrim */}
      <div className="absolute inset-0">
        <HeroCanvas className="absolute inset-0 h-full w-full opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,8,10,0.55) 0%, rgba(7,8,10,0) 24%, rgba(7,8,10,0) 52%, rgba(7,8,10,0.85) 100%)',
          }}
        />
      </div>

      {/* Top status row */}
      <div className="border-op-line text-op-dim relative z-[3] mx-auto flex w-full max-w-[1320px] flex-wrap justify-between gap-3.5 border-b px-7 pt-[94px] pb-[13px] font-mono text-[0.75rem] tracking-[0.16em] uppercase">
        <span className="text-op-cyan">{hero.statusRow.left}</span>
        <span>{hero.statusRow.center}</span>
        <span className="text-op-yellow inline-flex items-center gap-2">
          <span className="tm-pulse-dot bg-op-yellow h-1.5 w-1.5 rounded-full" />
          {hero.statusRow.right}
        </span>
      </div>

      {/* Headline block */}
      <div className="relative z-[3] mx-auto w-full max-w-[1320px] px-7 pb-11">
        <p className="text-op-magenta mb-5 font-mono text-[0.8125rem] tracking-[0.2em] uppercase">
          {hero.eyebrow}
        </p>

        <h1
          className="anton tm-glitch text-op-text"
          style={{
            fontSize: 'clamp(2.4rem,8vw,6.25rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.005em',
          }}
        >
          {hero.headlineLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          <ScrambleText text={hero.headlineHighlight} className="text-op-yellow" />
          <span className="text-op-yellow">_</span>
        </h1>

        {/* Sub-row */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p
            className="border-op-cyan text-op-muted max-w-[48ch] border-l-2 pl-4"
            style={{
              fontSize: 'clamp(1.0625rem,1.4vw,1.25rem)',
              lineHeight: 1.55,
            }}
          >
            {hero.subhead}
          </p>

          <div className="flex flex-wrap gap-[13px]">
            {hero.ctas.map((cta) =>
              cta.variant === 'primary' ? (
                <a
                  key={cta.href}
                  href={cta.href}
                  className={cn(
                    'clip-notch-13 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[26px] py-4 font-mono text-[0.875rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-2px] hover:[filter:drop-shadow(0_0_16px_rgba(252,238,10,0.6))]'
                  )}
                >
                  {cta.label} ▸
                </a>
              ) : (
                <a
                  key={cta.href}
                  href={cta.href}
                  className={cn(
                    'clip-notch-13 bg-op-console text-op-cyan inline-flex items-center gap-2 px-6 py-4 font-mono font-semibold shadow-[inset_0_0_0_1px_var(--color-op-cyan)] hover:[filter:drop-shadow(0_0_12px_rgba(0,229,255,0.5))]'
                  )}
                >
                  {cta.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
