import Image from 'next/image'
import { getMessages } from 'next-intl/server'

import { Reveal } from '@/components/op/Reveal'
import { cn } from '@/lib/utils'
import type { TestimonialsContent } from '@/types/content'

export async function Testimonials() {
  const messages = await getMessages()
  const data = messages.Testimonials as TestimonialsContent

  // Only render entries explicitly marked verified (real, consented). Drafts
  // (verified:false) stay hidden, and the whole section hides until at least
  // one verified entry exists.
  const quotes = data.quotes.filter((q) => q.verified)
  const trustedBy = data.trustedBy.filter((b) => b.verified)

  if (quotes.length === 0 && trustedBy.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="border-op-line border-b">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <Reveal>
          <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
            <span className="text-op-magenta">{data.section.eyebrow}</span> {'>'}{' '}
            {data.section.kicker}
          </p>
        </Reveal>

        {quotes.length > 0 && (
          <div className="mt-12">
            {quotes.map((q, i) => (
              <Reveal key={`${q.name}-${i}`} delay={i * 40}>
                <figure className="border-op-line-strong grid grid-cols-1 items-end gap-5 border-b py-[42px] sm:grid-cols-[1fr_auto] sm:gap-8">
                  <blockquote
                    className="text-op-text max-w-[30ch] leading-[1.3] font-medium"
                    style={{ fontSize: 'clamp(1.35rem,2.6vw,2.1rem)' }}
                  >
                    <span className="text-op-cyan" aria-hidden="true">
                      &ldquo;
                    </span>
                    {q.text}
                    <span className="text-op-cyan" aria-hidden="true">
                      &rdquo;
                    </span>
                  </blockquote>

                  <figcaption className="flex items-center gap-3.5">
                    {q.avatar && (
                      <Image
                        src={q.avatar}
                        alt={q.name}
                        width={46}
                        height={46}
                        className={cn('clip-notch-9 object-cover', 'h-[46px] w-[46px]')}
                      />
                    )}
                    <span>
                      <span className="text-op-text block font-semibold">{q.name}</span>
                      <span className="text-op-dim block font-mono text-[0.8125rem]">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {trustedBy.length > 0 && (
          <Reveal delay={80}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
                {data.section.trustedByLabel}
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {trustedBy.map((brand, i) => (
                  <span
                    key={`${brand.name}-${i}`}
                    className="anton text-op-logowall"
                    style={{ fontSize: '1.5rem' }}
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default Testimonials
