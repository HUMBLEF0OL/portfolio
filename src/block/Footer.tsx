import { getLocale } from 'next-intl/server'
import site from '@/data/site.json'
import { GlitchText } from '@/components/op/GlitchText'

/** Operator-design footer with giant ghost wordmark. */
const Footer = async () => {
  const locale = await getLocale()
  const localize = (href: string) => `/${locale}${href}`

  return (
    <footer className="bg-op-base relative w-full overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-7 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-8 pb-10">
          <p className="text-op-muted max-w-[34ch] text-[1.0625rem]">{site.footer.blurb}</p>
          <div className="flex flex-col items-start gap-[14px]">
            <a
              href={localize(site.footer.cta.href)}
              className="clip-notch-11 bg-op-yellow text-op-base inline-flex items-center gap-2 px-[22px] py-[13px] font-mono text-[0.8125rem] font-bold tracking-[0.06em] uppercase transition-[filter] hover:[filter:drop-shadow(0_0_12px_rgba(252,238,10,0.55))]"
            >
              {site.footer.cta.label} ▸
            </a>
            <div className="text-op-dim2 flex gap-5 font-mono text-[0.875rem]">
              <a href={site.social.emailHref} className="hover:text-op-cyan transition-colors">
                Email
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-cyan transition-colors"
              >
                GitHub
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-cyan transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-op-line text-op-dim flex flex-wrap items-center justify-between gap-3 border-t py-[18px] font-mono text-[0.75rem]">
          <span>{site.footer.copyright}</span>
          <span className="flex items-center gap-2">
            <span className="bg-op-magenta inline-block h-[7px] w-[7px]" />
            {site.footer.endLabel}
          </span>
        </div>

        <GlitchText
          as="div"
          className="anton text-op-ghost block leading-[0.8] tracking-[-0.01em] whitespace-nowrap"
        >
          <span style={{ fontSize: 'clamp(3rem,18vw,16rem)' }}>{site.footer.wordmark}</span>
        </GlitchText>
      </div>
    </footer>
  )
}

export default Footer
