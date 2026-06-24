import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Anton, Chakra_Petch, JetBrains_Mono, Oxanium } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { siteConfig } from '@/config/site'

const chakra = Chakra_Petch({
  variable: '--font-chakra',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const oxanium = Oxanium({
  variable: '--font-oxanium',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Neural-grid / operator design system fonts (revamped services site).
const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: ['400'],
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'HUMBLEF0OL // Digital Interface Architect',
  description:
    'Step into the Grid — the digital frontier of HUMBLEF0OL. Explore cybernetic UIs, modular code, and imaginative systems crafted at the edge of identity and interaction. React, Tailwind, Next.js, shaders, state machines, and glitch-crafted experiences await.',
  keywords: [
    'Amit Rana',
    'HUMBLEF0OL',
    'Frontend Developer Portfolio',
    'Cyberpunk Developer',
    'Next.js Portfolio',
    'React Developer',
    'Tailwind CSS',
    'Creative Developer',
    'Web Interface Architect',
    'Glitch Art UI',
    'Modular Frontend Systems',
    'Digital Grid',
  ],
  authors: [{ name: siteConfig.organization.name, url: siteConfig.url }],
  creator: siteConfig.organization.name,
  // Single source of truth: the production URL lives in src/config/site.ts.
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: 'HUMBLEF0OL // Digital Interface Architect',
    description:
      'Amit Rana (HUMBLEF0OL) crafts futuristic web experiences using React, Tailwind, and Next.js. Dive into his glitch-touched, pixel-perfect world of code and creativity.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'HUMBLEF0OL Portfolio',
      },
    ],
    locale: siteConfig.ogLocaleMap[siteConfig.defaultLocale],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HUMBLEF0OL // Web Interface Engineer',
    description:
      'Enter the digital playground of Amit Rana — where code pulses with emotion and design meets data.',
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // The root layout sits above the [locale] segment, so neither `params` nor
  // `getLocale()` resolves a per-page locale here during static rendering.
  // Render a stable baseline; <LocaleHtml> (in the [locale] layout, which knows
  // the locale) corrects `lang`/`dir` on the client per locale.
  const locale = (await getLocale()) || 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${chakra.variable} ${oxanium.variable} ${anton.variable} ${jetbrains.variable}`}
    >
      <body
        className={`font-body bg-background text-foreground no-scrollbar mx-auto overflow-x-hidden overflow-y-auto antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute={'class'} defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
