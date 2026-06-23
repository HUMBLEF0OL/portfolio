import Footer from '@/block/Footer'
import Header from '@/block/Header'
import { NeuralGridFX } from '@/components/op/NeuralGridFX'
import { routing } from '@/i18n/routing'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React from 'react'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

const layout = async (props: LayoutProps) => {
  const { locale } = await props.params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  // Enable static rendering for the [locale] tree — must run before any
  // next-intl API call.
  setRequestLocale(locale)

  return (
    <div className="bg-op-base relative z-[1] flex min-h-screen w-full flex-col">
      <NeuralGridFX />
      <Header />
      <main className="relative z-[1] w-full flex-1">{props.children}</main>
      <Footer />
    </div>
  )
}

export default layout
