import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { siteConfig } from '@/config/site'
import Hero from '@/block/op/Hero'
import Ticker from '@/block/op/Ticker'
import StatBar from '@/block/op/StatBar'
import Problem from '@/block/op/Problem'
import Services from '@/block/op/Services'
import Work from '@/block/op/Work'
import AboutBlock from '@/block/op/AboutBlock'
import Testimonials from '@/block/op/Testimonials'
import Process from '@/block/op/Process'
import Engagement from '@/block/op/Engagement'
import Contact from '@/block/op/Contact'
import { CursorHUD } from '@/components/op/CursorHUD'
import { MobileCTA } from '@/components/op/MobileCTA'
import site from '@/data/site.json'

const base = siteConfig.url.replace(/\/$/, '')

type PageProps = Readonly<{ params: Promise<{ locale: string }> }>

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        ...Object.fromEntries(siteConfig.locales.map((l) => [l, `${base}/${l}`])),
        'x-default': `${base}/${siteConfig.defaultLocale}`,
      },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <CursorHUD label={site.availability.hudLabel} />
      <Hero />
      <Ticker />
      <StatBar />
      <Problem />
      <Services />
      <Work />
      <AboutBlock locale={locale} />
      <Testimonials />
      <Process />
      <Engagement />
      <Contact />
      <MobileCTA />
    </>
  )
}
