import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import csData from '@/data/caseStudies.json'
import site from '@/data/site.json'
import { Reveal } from '@/components/op/Reveal'
import { CountUp } from '@/components/op/CountUp'
import { GlitchText } from '@/components/op/GlitchText'
import { CursorHUD } from '@/components/op/CursorHUD'
import { siteConfig } from '@/config/site'

const base = siteConfig.url.replace(/\/$/, '')
const studies = csData.caseStudies
const bySlug = (slug: string) => studies.find((s) => s.slug === slug)

type Study = (typeof studies)[number]

type PageProps = Readonly<{ params: Promise<{ locale: string; slug: string }> }>

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const study = bySlug(slug)
  if (!study) return {}
  return {
    title: `${study.name} · Case study · ${site.identity.name}`,
    description: study.tagline,
    alternates: {
      canonical: `${base}/${locale}/work/${slug}`,
      languages: {
        ...Object.fromEntries(siteConfig.locales.map((l) => [l, `${base}/${l}/work/${slug}`])),
        'x-default': `${base}/${siteConfig.defaultLocale}/work/${slug}`,
      },
    },
  }
}

const Eyebrow = ({ prefix, kicker }: { prefix: string; kicker: string }) => (
  <p className="text-op-dim mb-[20px] font-mono text-[0.8125rem] tracking-[0.16em] uppercase">
    <span className="text-op-magenta">{prefix}</span> {'>'} {kicker}
  </p>
)

const LINK_LABELS: Record<string, string> = { github: 'GitHub', npm: 'npm', live: 'Live' }

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const study = bySlug(slug)
  if (!study) notFound()
  const s = study as Study
  const next = bySlug(s.next)
  const links = Object.entries(s.links ?? {})

  return (
    <>
      <CursorHUD label="CASE_FILE" />

      {/* HEADER */}
      <header className="border-op-line border-b">
        <div className="mx-auto max-w-[1180px] px-7 pt-[140px] pb-16">
          <Eyebrow prefix="// CASE_FILE" kicker={s.displaySlug} />
          <div className="mb-[26px] flex flex-wrap gap-2.5">
            <span className="text-op-cyan px-[11px] py-[6px] font-mono text-[0.6875rem] tracking-[0.1em] uppercase shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              {s.category}
            </span>
            <span className="text-op-dim px-[11px] py-[6px] font-mono text-[0.6875rem] tracking-[0.1em] uppercase shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              {s.year}
            </span>
            {s.isPrivate && (
              <span className="text-op-magenta px-[11px] py-[6px] font-mono text-[0.6875rem] tracking-[0.1em] uppercase shadow-[inset_0_0_0_1px_var(--color-op-magenta)]">
                Private
              </span>
            )}
          </div>
          <GlitchText as="h1" className="anton text-op-text mb-6 block">
            <span
              style={{
                fontSize: 'clamp(2.6rem,7vw,5.5rem)',
                lineHeight: 0.9,
                maxWidth: '16ch',
                display: 'inline-block',
              }}
            >
              {s.name}
            </span>
          </GlitchText>
          <p
            className="border-op-cyan text-op-muted mb-8 max-w-[52ch] border-l-2 pl-4"
            style={{ fontSize: 'clamp(1.0625rem,1.8vw,1.45rem)', lineHeight: 1.45 }}
          >
            {s.tagline}
          </p>

          {links.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-3">
              {links.map(([key, url]) => (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-notch-10 bg-op-console text-op-cyan inline-flex items-center gap-1.5 px-4 py-2.5 font-mono text-[0.75rem] font-semibold tracking-[0.06em] uppercase shadow-[inset_0_0_0_1px_var(--color-op-cyan)] transition-[filter] hover:[filter:drop-shadow(0_0_10px_rgba(0,229,255,0.45))]"
                >
                  {LINK_LABELS[key] ?? key} ▸
                </a>
              ))}
            </div>
          )}

          {/* metrics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {s.metrics.map((m, i) => (
              <div
                key={i}
                className="clip-notch-14 bg-op-elev px-6 py-[26px] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]"
              >
                <div
                  className="font-numeric text-op-yellow leading-none font-bold"
                  style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)' }}
                >
                  {m.value === null ? (
                    m.display
                  ) : (
                    <CountUp
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.decimals}
                    />
                  )}
                </div>
                <div className="text-op-dim mt-2.5 font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HERO CONSOLE */}
      <div className="border-op-line border-b">
        <div className="mx-auto max-w-[1180px] px-7 py-[44px]">
          <Reveal className="clip-notch-18 bg-op-elev p-[11px] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
            <div className="flex items-center justify-between px-2 pt-1.5 pb-2.5">
              <span className="text-op-cyan font-mono text-[0.6875rem] tracking-[0.06em]">
                {s.host}
              </span>
              <span className="text-op-dim font-mono text-[0.6875rem]">FEED//LIVE</span>
            </div>
            <div className="bg-op-console relative h-[460px] overflow-hidden">
              <div
                aria-hidden
                className="anton pointer-events-none absolute leading-[0.8] whitespace-nowrap"
                style={{
                  right: 18,
                  bottom: -26,
                  fontSize: 'clamp(5rem,15vw,12rem)',
                  color: 'rgba(0,229,255,0.05)',
                }}
              >
                {s.displaySlug}
              </div>
              <div className="text-op-cyan flex flex-col gap-[9px] p-7 font-mono text-[0.95rem] tracking-[0.02em]">
                {s.console.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-op-dim">$</span>
                  <span className="tm-blink bg-op-yellow inline-block h-[17px] w-[9px]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* BODY */}
      <article
        className="mx-auto max-w-[820px] px-7"
        style={{ paddingBlock: 'clamp(72px,9vw,116px)' }}
      >
        {/* 01 CONTEXT */}
        <Reveal className="mb-[76px]">
          <Eyebrow prefix="// 01" kicker="CONTEXT" />
          <p className="text-op-muted text-[1.25rem] leading-[1.65]">{s.context}</p>
        </Reveal>

        {/* 02 THE_PROBLEM */}
        <Reveal className="mb-[76px]">
          <Eyebrow prefix="// 02" kicker="THE_PROBLEM" />
          <h2
            className="anton text-op-text mb-[22px]"
            style={{ fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', lineHeight: 1.02 }}
          >
            {s.problem.head}
          </h2>
          <p className="text-op-muted mb-[26px] text-[1.0625rem] leading-[1.65]">
            {s.problem.body}
          </p>
          <div className="border-op-magenta border-l-2 py-1 pl-[18px]">
            <p className="text-op-magenta mb-1.5 font-mono text-[0.75rem] tracking-[0.12em] uppercase">
              BEFORE
            </p>
            <p className="text-op-text text-[1.0625rem]">{s.problem.before}</p>
          </div>
        </Reveal>

        {/* 03 APPROACH */}
        <Reveal className="mb-[76px]">
          <Eyebrow prefix="// 03" kicker="APPROACH" />
          <p className="text-op-muted mb-7 text-[1.0625rem] leading-[1.65]">{s.approach.intro}</p>
          <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {s.approach.cards.map((c) => (
              <div
                key={c.heading}
                className="clip-notch-14 bg-op-elev p-6 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]"
              >
                <h3 className="text-op-text mb-2 text-[1.1rem] font-semibold">{c.heading}</h3>
                <p className="text-op-muted text-[0.9375rem] leading-[1.55]">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {s.stack.map((tech) => (
              <span
                key={tech}
                className="text-op-cyan px-[11px] py-[6px] font-mono text-[0.8125rem] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {/* 04 THE_RESULT */}
        <Reveal className="mb-[76px]">
          <Eyebrow prefix="// 04" kicker="THE_RESULT" />
          <h2
            className="anton text-op-text mb-[30px]"
            style={{ fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', lineHeight: 1.02 }}
          >
            {s.result.head}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="clip-notch-16 bg-op-elev p-7 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]">
              <p className="text-op-magenta mb-4 font-mono text-[0.75rem] tracking-[0.12em] uppercase">
                Before
              </p>
              <ul className="flex flex-col gap-3">
                {s.result.before.map((b, i) => (
                  <li key={i} className="text-op-muted text-[1.0625rem]">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="clip-notch-16 bg-op-elev-warm p-7 shadow-[inset_0_0_0_1px_var(--color-op-yellow)]"
              style={{ filter: 'drop-shadow(0 0 20px rgba(252,238,10,0.12))' }}
            >
              <p className="text-op-yellow mb-4 font-mono text-[0.75rem] tracking-[0.12em] uppercase">
                After
              </p>
              <ul className="flex flex-col gap-3">
                {s.result.after.map((a, i) => (
                  <li key={i} className="text-op-text text-[1.0625rem]">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* QUOTE */}
        <Reveal
          as="figure"
          className="clip-notch-20 bg-op-elev relative m-0 p-10 shadow-[inset_0_0_0_1px_var(--color-op-line-strong)]"
        >
          <blockquote
            className="text-op-text mb-[26px]"
            style={{ fontSize: 'clamp(1.25rem,2.2vw,1.6rem)', lineHeight: 1.4 }}
          >
            <span className="text-op-cyan">&ldquo;</span>
            {s.quote.text}
            <span className="text-op-cyan">&rdquo;</span>
          </blockquote>
          <figcaption className="flex items-center gap-3.5">
            <span className="clip-notch-7 bg-op-yellow font-display text-op-base inline-flex h-12 w-12 items-center justify-center text-[1.1rem]">
              {s.quote.name.charAt(0)}
            </span>
            <span>
              <span className="text-op-text block text-[1rem] font-semibold">{s.quote.name}</span>
              <span className="text-op-dim block font-mono text-[0.8125rem]">{s.quote.role}</span>
            </span>
          </figcaption>
        </Reveal>
      </article>

      {/* CTA BAND */}
      <section className="border-op-line bg-op-elev-alt border-y">
        <div
          className="mx-auto max-w-[1180px] px-7 text-center"
          style={{ paddingBlock: 'clamp(72px,9vw,116px)' }}
        >
          <GlitchText as="h2" className="anton text-op-text mx-auto mb-7 block">
            <span
              style={{
                fontSize: 'clamp(1.9rem,4.6vw,3.4rem)',
                lineHeight: 0.98,
                maxWidth: '20ch',
                display: 'inline-block',
              }}
            >
              Have a similar problem?
            </span>
          </GlitchText>
          <a
            href={`/${locale}#contact`}
            className="clip-notch-13 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[26px] py-4 font-mono text-[0.9375rem] font-bold tracking-[0.06em] uppercase transition-[filter,transform] hover:translate-y-[-2px] hover:[filter:drop-shadow(0_0_16px_rgba(252,238,10,0.6))]"
          >
            Book a 20-min call ▸
          </a>
        </div>
      </section>

      {/* NEXT CASE */}
      {next && (
        <div className="mx-auto max-w-[1180px] px-7 pt-[44px] pb-[72px]">
          <a
            href={`/${locale}/work/${next.slug}`}
            className="clip-notch-18 bg-op-elev flex items-center justify-between gap-6 p-[30px] shadow-[inset_0_0_0_1px_var(--color-op-line-strong)] transition-shadow hover:shadow-[inset_0_0_0_1px_var(--color-op-cyan)]"
          >
            <span>
              <span className="text-op-dim mb-2 block font-mono text-[0.75rem] tracking-[0.12em] uppercase">
                Next case file
              </span>
              <span className="anton text-op-text block text-[1.6rem] leading-none">
                {next.name}
              </span>
            </span>
            <span className="text-op-yellow font-mono text-[1.5rem]">▸</span>
          </a>
        </div>
      )}
    </>
  )
}
