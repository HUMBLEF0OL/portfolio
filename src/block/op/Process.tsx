import { Reveal } from '@/components/op/Reveal'
import { GlitchText } from '@/components/op/GlitchText'
import process from '@/data/process.json'

export default function Process() {
  const { section, phases } = process

  return (
    <section className="bg-op-elev-alt">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{section.eyebrow}</span> {'>'} {section.kicker}
        </p>
        <GlitchText
          as="h2"
          className="anton text-op-text mb-[60px]"
          style={{
            fontSize: 'clamp(1.9rem,5vw,4rem)',
            lineHeight: 0.98,
            maxWidth: '18ch',
          }}
        >
          {section.heading}
        </GlitchText>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => (
            <Reveal key={phase.number} delay={i * 60}>
              <div className="border-op-yellow border-t pt-[26px] pr-[26px]">
                <div
                  className="font-numeric text-op-yellow mb-[18px] text-[2.6rem] font-bold"
                  style={{ textShadow: '0 0 18px rgba(252,238,10,0.35)' }}
                >
                  {phase.number}
                </div>
                <h3 className="text-op-text mb-2.5 text-[1.25rem] font-semibold">{phase.title}</h3>
                <p className="text-op-muted max-w-[30ch] text-[1rem] leading-[1.55]">
                  {phase.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
