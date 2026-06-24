'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale, useMessages } from 'next-intl'
import { cn } from '@/lib/utils'
import { GlitchText } from '@/components/op/GlitchText'
import cs from '@/data/caseStudies.json'
import type { WorkChrome, CaseStudyCopy } from '@/types/content'

const items = cs.caseStudies

export default function Work() {
  const locale = useLocale()
  const messages = useMessages()
  const chrome = messages.Work as WorkChrome
  const copyBySlug = messages.CaseStudies as Record<string, CaseStudyCopy>
  const [active, setActive] = useState(0)
  const activeItem = items[active]
  const activeCopy = copyBySlug[activeItem.slug]

  return (
    <section id="work" className="border-op-line border-b">
      <div className="mx-auto max-w-[1320px]" style={{ padding: 'clamp(80px,10vw,140px) 28px' }}>
        <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{chrome.eyebrow}</span> {'>'} {chrome.kicker}
        </p>
        <GlitchText
          as="h2"
          className="anton text-op-text mb-[60px]"
          style={{ fontSize: 'clamp(1.9rem,5vw,4rem)', lineHeight: 0.98 }}
        >
          {chrome.heading}
        </GlitchText>

        <div className="grid grid-cols-1 items-start gap-[60px] lg:grid-cols-[1fr_0.78fr]">
          {/* LEFT: mission list */}
          <div className="border-op-line-strong border-t">
            {items.map((item, i) => {
              const isActive = i === active
              const copy = copyBySlug[item.slug]
              return (
                <a
                  key={item.slug}
                  href={'/' + locale + '/work/' + item.slug}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'border-op-line-strong block border-b px-1 py-7 transition',
                    isActive && 'bg-op-elev pl-[18px]'
                  )}
                >
                  <div className="flex justify-between gap-5">
                    <div className="flex items-baseline gap-5">
                      <span
                        className={cn(
                          'font-numeric text-[1.5rem] font-bold',
                          isActive ? 'text-op-yellow' : 'text-op-dim'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3
                          className={cn('anton', isActive ? 'text-op-cyan' : 'text-op-text')}
                          style={{ fontSize: 'clamp(1.6rem,2.6vw,2.4rem)', lineHeight: 1 }}
                        >
                          {copy.name}
                        </h3>
                        <p className="text-op-muted max-w-[46ch] text-[1rem] leading-[1.5]">
                          {copy.row.blurb}
                        </p>
                        <span className="text-op-cyan font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                          {copy.category}
                        </span>
                      </div>
                    </div>
                    <div className="font-numeric text-op-yellow text-[1.5rem] font-bold whitespace-nowrap">
                      {item.row.headlineMetric.value}
                      <span className="text-op-dim font-mono text-[0.7rem]">
                        {' '}
                        {item.row.headlineMetric.unit}
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* RIGHT: sticky preview monitor */}
          <div className="sticky top-24 hidden lg:block">
            <div className="bg-op-elev clip-notch-16 p-2.5 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              <div className="flex justify-between px-2 pb-2.5">
                <span className="text-op-cyan font-mono text-[0.6875rem]">{activeItem.host}</span>
                <span className="text-op-dim font-mono text-[0.6875rem]">{chrome.feedLabel}</span>
              </div>
              <div className="bg-op-console relative h-[300px] overflow-hidden">
                {activeItem.image ? (
                  <Image
                    src={activeItem.image}
                    alt={activeCopy.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 40vw"
                  />
                ) : (
                  <div className="text-op-cyan flex flex-col gap-1.5 p-6 font-mono text-[0.85rem]">
                    {activeItem.console.map((line, li) => (
                      <span key={li}>{line}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-op-dim mt-6 font-mono text-[0.75rem]">{chrome.hint}</p>
      </div>
    </section>
  )
}
