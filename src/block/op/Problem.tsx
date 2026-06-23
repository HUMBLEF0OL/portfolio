import site from '@/data/site.json'
import { Reveal } from '@/components/op/Reveal'
import { GlitchText } from '@/components/op/GlitchText'

export default function Problem() {
  const { eyebrow, kicker, heading, body } = site.problem

  return (
    <section className="border-op-line border-b">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <p className="text-op-dim mb-10 font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{eyebrow}</span> {'>'} {kicker}
        </p>

        <Reveal>
          <GlitchText
            as="h2"
            className="anton text-op-text"
            style={{
              fontSize: 'clamp(1.9rem,5vw,4rem)',
              lineHeight: 1,
              maxWidth: '18ch',
            }}
          >
            {heading}
          </GlitchText>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-op-muted mt-6 max-w-[62ch] text-[1.25rem] leading-[1.6]">{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
