import { CountUp } from '@/components/op/CountUp'
import { cn } from '@/lib/utils'
import site from '@/data/site.json'

type Accent = 'foreground' | 'highlight' | 'primary'

const ACCENT_CLASS: Record<Accent, string> = {
  foreground: 'text-op-text',
  highlight: 'text-op-yellow',
  primary: 'text-op-cyan',
}

export default function StatBar() {
  const stats = site.stats

  return (
    <section className="border-op-line bg-op-elev-alt border-b">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-stretch">
        {stats.map((stat, i) => {
          const accentClass = ACCENT_CLASS[stat.accent as Accent]
          const isLast = i === stats.length - 1

          return (
            <div
              key={stat.label}
              className={cn('flex-1 px-7 py-8', !isLast && 'border-op-line border-r')}
            >
              {stat.value === null ? (
                <span
                  className={cn('font-numeric leading-none font-semibold', accentClass)}
                  style={{ fontSize: 'clamp(2rem,4vw,3.25rem)' }}
                >
                  {stat.display === '1/1' ? (
                    <>
                      1<span className="text-op-magenta">/</span>1
                    </>
                  ) : (
                    stat.display
                  )}
                </span>
              ) : (
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className={cn(
                    'font-numeric text-[clamp(2rem,4vw,3.25rem)] leading-none font-semibold',
                    accentClass
                  )}
                />
              )}
              <p className="text-op-dim mt-2.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
