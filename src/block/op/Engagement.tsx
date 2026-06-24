'use client'

import { useState } from 'react'
import { useMessages } from 'next-intl'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/op/Reveal'
import { GlitchText } from '@/components/op/GlitchText'
import type { EngagementContent } from '@/types/content'

export default function Engagement() {
  const messages = useMessages()
  const { pricing, faq } = messages.Engagement as EngagementContent
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-op-line border-b">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{pricing.section.eyebrow}</span> {'>'}{' '}
          {pricing.section.kicker}
        </p>
        <GlitchText
          as="h2"
          className="anton text-op-text mb-[60px]"
          style={{ fontSize: 'clamp(1.9rem,5vw,4rem)', lineHeight: 0.98 }}
        >
          {pricing.section.heading}
        </GlitchText>

        <div className="mb-24 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 60}>
              <article
                className={cn(
                  'clip-notch-18 p-6 sm:p-[34px]',
                  tier.featured
                    ? 'bg-op-elev-warm shadow-[inset_0_0_0_1px_var(--color-op-yellow)]'
                    : 'bg-op-elev shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]'
                )}
                style={
                  tier.featured
                    ? { filter: 'drop-shadow(0 0 22px rgba(252,238,10,0.14))' }
                    : undefined
                }
              >
                {tier.badge ? (
                  <span className="bg-op-yellow text-op-base mb-4 inline-block px-2.5 py-1 font-mono text-[0.6875rem] font-semibold tracking-[0.1em] uppercase">
                    {tier.badge}
                  </span>
                ) : null}
                <h3 className="text-op-text text-[1.25rem] font-semibold">{tier.name}</h3>
                <p className="mt-3">
                  <span
                    className={cn(
                      'font-numeric text-[2.2rem] font-bold',
                      tier.featured ? 'text-op-yellow' : 'text-op-text'
                    )}
                    style={
                      tier.featured ? { textShadow: '0 0 18px rgba(252,238,10,0.4)' } : undefined
                    }
                  >
                    {tier.price}
                  </span>
                  <small className="text-op-dim font-mono text-[0.85rem] uppercase">
                    {' '}
                    {tier.priceUnit}
                  </small>
                </p>
                <p className="text-op-muted my-5 text-[1rem] leading-[1.55]">{tier.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-op-muted flex gap-2.5 text-[0.9375rem]">
                      <span
                        className={cn(tier.featured ? 'text-op-yellow' : 'text-op-cyan')}
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <h3
            className="anton text-op-text"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1 }}
          >
            {faq.section.heading}
          </h3>
          <div className="border-op-line-strong border-t">
            {faq.items.map((item, i) => {
              const isOpen = openIndex === i
              const isLast = i === faq.items.length - 1
              return (
                <div
                  key={item.question}
                  className={cn(!isLast && 'border-op-line-strong border-b')}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="text-op-text flex w-full justify-between gap-5 py-[22px] text-left text-[1.1rem] font-medium"
                  >
                    {item.question}
                    <span
                      className="text-op-yellow shrink-0 text-[1.4rem] transition-transform"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="text-op-muted pb-[22px] text-[1.0625rem] leading-[1.6]">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
