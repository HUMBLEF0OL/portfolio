import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import about from '@/data/about.json'
import site from '@/data/site.json'
import { Reveal } from '@/components/op/Reveal'
import { CountUp } from '@/components/op/CountUp'
import { GlitchText } from '@/components/op/GlitchText'
import { CursorHUD } from '@/components/op/CursorHUD'
import { siteConfig } from '@/config/site'

const base = siteConfig.url.replace(/\/$/, '')

type PageProps = Readonly<{ params: Promise<{ locale: Locale }> }>

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: `About · ${site.identity.name}`,
    description: about.page.intro.subhead,
    alternates: {
      canonical: `${base}/${locale}/about`,
      languages: {
        ...Object.fromEntries(siteConfig.locales.map((l) => [l, `${base}/${l}/about`])),
        'x-default': `${base}/${siteConfig.defaultLocale}/about`,
      },
    },
  }
}

const Eyebrow = ({ eyebrow, kicker }: { eyebrow: string; kicker: string }) => (
  <p className="text-op-dim mb-7 font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
    <span className="text-op-magenta">{eyebrow}</span> {'>'} {kicker}
  </p>
)

const CornerBrackets = () => (
  <>
    <span className="border-op-yellow absolute top-[18px] left-[18px] h-[18px] w-[18px] border-t-2 border-l-2" />
    <span className="border-op-yellow absolute top-[18px] right-[18px] h-[18px] w-[18px] border-t-2 border-r-2" />
    <span className="border-op-yellow absolute bottom-[18px] left-[18px] h-[18px] w-[18px] border-b-2 border-l-2" />
    <span className="border-op-yellow absolute right-[18px] bottom-[18px] h-[18px] w-[18px] border-r-2 border-b-2" />
  </>
)

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = about.page

  return (
    <>
      <CursorHUD label={p.hudLabel} />

      {/* INTRO */}
      <header className="border-op-line border-b">
        <div className="mx-auto max-w-[1180px] px-7 pt-[140px] pb-[72px]">
          <Eyebrow eyebrow={p.eyebrow} kicker={p.kicker} />
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <Reveal>
                <GlitchText as="h1" className="anton text-op-text mb-[26px] block">
                  <span
                    style={{
                      fontSize: 'clamp(2.6rem,6vw,5rem)',
                      lineHeight: 0.92,
                      display: 'inline',
                    }}
                  >
                    {p.intro.headline}{' '}
                    <span className="text-op-yellow">{p.intro.headlineHighlight}</span>
                  </span>
                </GlitchText>
              </Reveal>
              <Reveal delay={80}>
                <p
                  className="border-op-cyan text-op-muted max-w-[52ch] border-l-2 pl-4"
                  style={{ fontSize: 'clamp(1.0625rem,1.6vw,1.3rem)', lineHeight: 1.55 }}
                >
                  {p.intro.subhead}
                </p>
              </Reveal>
            </div>
            <Reveal delay={120} className="relative order-first md:order-none">
              <div className="clip-notch-18 bg-op-elev relative p-[11px] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
                <Image
                  src={about.avatar.src}
                  alt={about.avatar.alt}
                  width={600}
                  height={360}
                  className="block h-[360px] w-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                />
              </div>
              <CornerBrackets />
            </Reveal>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="border-op-line bg-op-elev-alt border-b">
        {/* gap-px over a line track = clean dividers in both 2-col mobile and
            4-col desktop, without per-cell border/padding math. */}
        <div className="bg-op-line mx-auto grid max-w-[1180px] grid-cols-2 gap-px md:grid-cols-4">
          {p.stats.map((s, i) => (
            <div key={s.label} className="bg-op-elev-alt px-7 py-[34px]">
              <div
                className={
                  i === 2
                    ? 'font-numeric text-op-yellow leading-none font-bold'
                    : i === 3
                      ? 'font-numeric text-op-cyan leading-none font-bold'
                      : 'font-numeric text-op-text leading-none font-bold'
                }
                style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)' }}
              >
                <CountUp
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </div>
              <div className="text-op-dim mt-2.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BIO ARTICLE */}
      <article
        className="mx-auto max-w-[820px] px-7"
        style={{ paddingBlock: 'clamp(72px,9vw,120px)' }}
      >
        {/* SYS.01 DOSSIER */}
        <Reveal as="section" className="mb-[72px]">
          <Eyebrow eyebrow={p.dossier.eyebrow} kicker={p.dossier.kicker} />
          <p className="text-op-text mb-6 text-[1.3rem] leading-[1.55]">
            {p.dossier.paragraphs[0]}
          </p>
          {p.dossier.paragraphs.slice(1).map((para, i) => (
            <p key={i} className="text-op-muted mb-5 text-[1.0625rem] leading-[1.7] last:mb-0">
              {para}
            </p>
          ))}
        </Reveal>

        {/* SYS.02 DOCTRINE */}
        <Reveal as="section" className="mb-[72px]">
          <Eyebrow eyebrow={p.doctrine.eyebrow} kicker={p.doctrine.kicker} />
          <div className="grid grid-cols-1 md:grid-cols-2">
            {p.doctrine.values.map((v, i) => (
              <div
                key={v.title}
                className={`border-t py-[22px] ${i < 2 ? 'border-op-yellow' : 'border-op-line-strong'} ${i % 2 === 0 ? 'md:pr-7' : 'md:pl-7'}`}
              >
                <h3 className="text-op-text mb-2 text-[1.15rem] font-semibold">{v.title}</h3>
                <p className="text-op-muted text-[1rem] leading-[1.55]">{v.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* SYS.03 IN_THE_OPEN */}
        <Reveal as="section">
          <Eyebrow eyebrow={p.inTheOpen.eyebrow} kicker={p.inTheOpen.kicker} />
          <div className="clip-notch-18 bg-op-elev relative p-8 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
            <div className="mb-3.5 flex items-center justify-between gap-4">
              <h3 className="anton text-op-text text-[1.7rem] leading-none">{p.inTheOpen.name}</h3>
              <span className="font-numeric text-op-yellow text-[1.3rem] font-bold">
                {p.inTheOpen.metric}
              </span>
            </div>
            <p className="text-op-muted mb-3.5 text-[1.0625rem] leading-[1.6]">
              {p.inTheOpen.description}
            </p>
            <a
              href={p.inTheOpen.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-op-cyan hover:text-op-yellow font-mono text-[0.875rem] transition-colors"
            >
              {p.inTheOpen.link.label} ▸
            </a>
          </div>
        </Reveal>
      </article>

      {/* CTA */}
      <section className="border-op-line bg-op-elev-alt border-t">
        <div
          className="mx-auto max-w-[1180px] px-7 text-center"
          style={{ paddingBlock: 'clamp(72px,9vw,120px)' }}
        >
          <GlitchText as="h2" className="anton text-op-text mx-auto mb-[22px] block">
            <span
              style={{
                fontSize: 'clamp(1.9rem,4.6vw,3.6rem)',
                lineHeight: 0.98,
                display: 'inline-block',
                maxWidth: '22ch',
              }}
            >
              {p.cta.heading}
            </span>
          </GlitchText>
          <p className="text-op-muted mx-auto mb-8 max-w-[42ch] text-[1.0625rem]">
            {p.cta.subhead}
          </p>
          <a
            href={`/${locale}${p.cta.button.href}`}
            className="clip-notch-13 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[26px] py-4 font-mono text-[0.9375rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-2px] hover:[filter:drop-shadow(0_0_16px_rgba(252,238,10,0.6))]"
          >
            {p.cta.button.label} ▸
          </a>
        </div>
      </section>
    </>
  )
}
