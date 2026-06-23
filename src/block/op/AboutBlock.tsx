import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/op/Reveal'
import { GlitchText } from '@/components/op/GlitchText'
import about from '@/data/about.json'

const dossier = about.homepageDossier

export default function AboutBlock({ locale }: { locale: string }) {
  const bioHref = '/' + locale + dossier.bioLink.href

  return (
    <section className="bg-op-elev-alt">
      <div
        className="mx-auto max-w-[1320px] px-7"
        style={{ padding: 'clamp(80px,10vw,140px) 28px' }}
      >
        <p className="text-op-dim font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
          <span className="text-op-magenta">{dossier.eyebrow}</span> {'>'} {dossier.kicker}
        </p>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          {/* LEFT: portrait frame */}
          <Reveal>
            <div className="bg-op-elev clip-notch-20 relative p-3 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              <div className="relative">
                <Image
                  src="/avatar.png"
                  alt={dossier.name}
                  width={600}
                  height={440}
                  className="h-[440px] w-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                />
                {/* corner brackets */}
                <div
                  className="border-op-yellow absolute h-[18px] w-[18px] border-t-2 border-l-2"
                  style={{ top: 18, left: 18 }}
                />
                <div
                  className="border-op-yellow absolute h-[18px] w-[18px] border-t-2 border-r-2"
                  style={{ top: 18, right: 18 }}
                />
                <div
                  className="border-op-yellow absolute h-[18px] w-[18px] border-b-2 border-l-2"
                  style={{ bottom: 18, left: 18 }}
                />
                <div
                  className="border-op-yellow absolute h-[18px] w-[18px] border-r-2 border-b-2"
                  style={{ bottom: 18, right: 18 }}
                />
              </div>
              <div className="text-op-cyan mt-2 flex justify-between font-mono text-[0.625rem] tracking-[0.1em]">
                <span>ID·AR-001</span>
                <span>REC ◉</span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: dossier */}
          <Reveal delay={80}>
            <GlitchText
              as="h2"
              className="anton text-op-text text-[clamp(2.2rem,5vw,4rem)] leading-[0.92]"
            >
              {dossier.name}
            </GlitchText>

            <p className="text-op-yellow mt-2 font-mono text-[0.8125rem] tracking-[0.12em] uppercase">
              {dossier.class}
            </p>

            <p className="text-op-muted my-6 max-w-[58ch] text-[1.125rem] leading-[1.6]">
              {dossier.blurb}
            </p>

            {/* skill bars */}
            <div className="mb-8 flex max-w-[520px] flex-col gap-3.5">
              {dossier.skillBars.map((bar) => (
                <div key={bar.label} className="flex items-center">
                  <span className="text-op-dim2 w-[120px] font-mono text-[0.75rem] tracking-[0.08em] uppercase">
                    {bar.label}
                  </span>
                  <div className="flex flex-1 gap-1">
                    {Array.from({ length: bar.max }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          'h-[11px] flex-1',
                          i < bar.fill
                            ? 'bg-op-yellow shadow-[0_0_8px_rgba(252,238,10,0.5)]'
                            : 'bg-op-line'
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* footer row */}
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="text-op-muted px-3.5 py-2.5 font-mono text-[0.8125rem] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
                {dossier.ossChip.label}:{' '}
                <span className="text-op-text">{dossier.ossChip.name}</span> ·{' '}
                <span className="text-op-yellow">{dossier.ossChip.metric}</span>
              </span>
              <a
                href={bioHref}
                className="bg-op-console text-op-cyan clip-notch-9 inline-flex items-center gap-2 px-6 py-2.5 font-mono text-[0.8125rem] font-semibold shadow-[inset_0_0_0_1px_var(--color-op-cyan)] transition-[filter,transform] hover:[filter:drop-shadow(0_0_12px_rgba(0,229,255,0.5))]"
              >
                {dossier.bioLink.label} ▸
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
