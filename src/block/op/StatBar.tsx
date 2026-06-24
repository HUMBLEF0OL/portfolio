import { getMessages } from 'next-intl/server'
import { CountUp } from '@/components/op/CountUp'
import { cn } from '@/lib/utils'
import type { StatItem } from '@/types/content'

type Accent = 'foreground' | 'highlight' | 'primary'

const ACCENT_CLASS: Record<Accent, string> = {
  foreground: 'text-op-text',
  highlight: 'text-op-yellow',
  primary: 'text-op-cyan',
}

export default async function StatBar() {
  const messages = await getMessages()
  const stats = messages.Stats as StatItem[]

  return (
    <section className="border-op-line bg-op-line border-b">
      {/* gap-px over a line-colored track draws clean 1px dividers in both the
          2-col mobile grid and the 4-col desktop row, no per-cell border math. */}
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-px sm:grid-cols-4">
        {stats.map((stat) => {
          const accentClass = ACCENT_CLASS[stat.accent as Accent]

          return (
            <div key={stat.label} className="bg-op-elev-alt px-7 py-8">
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
