import { getMessages } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/op/Reveal'
import { GlitchText } from '@/components/op/GlitchText'
import type { ServicesContent } from '@/types/content'

export default async function Services() {
  const messages = await getMessages()
  const { section, items } = messages.Services as ServicesContent
  return (
    <section id="services" className="cv-section border-op-line border-b">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
              <span className="text-op-magenta">{section.eyebrow}</span> {'>'} {section.kicker}
            </p>
            <GlitchText
              as="h2"
              className="anton text-op-text"
              style={{
                fontSize: 'clamp(1.9rem,5vw,4rem)',
                lineHeight: 0.98,
                maxWidth: '16ch',
              }}
            >
              {section.heading}
            </GlitchText>
          </div>
          <p className="text-op-muted max-w-[34ch] text-[1.0625rem] leading-[1.55]">
            {section.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((service, i) => (
            <Reveal key={service.number} delay={i % 2 ? 60 : 0}>
              <article
                data-cursor-hover
                className={cn(
                  'bg-op-elev clip-notch-18 p-6 transition-shadow sm:p-[34px]',
                  'shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]',
                  'hover:shadow-[inset_0_0_0_1px_var(--color-op-cyan)]'
                )}
              >
                <header className="flex items-baseline gap-4">
                  <span className="font-numeric text-op-yellow text-[2.4rem] font-bold">
                    {service.number}
                  </span>
                  <h3 className="text-op-text text-[1.5rem] font-semibold tracking-[-0.01em]">
                    {service.title}
                  </h3>
                </header>
                <p className="text-op-muted my-4 max-w-[42ch] text-[1.0625rem] leading-[1.6]">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-op-cyan px-[9px] py-[5px] font-mono text-[0.75rem] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
