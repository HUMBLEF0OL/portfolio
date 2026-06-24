// 'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BottomRight, TopLeft } from '@/block/AngularFrame'
import { getMessages } from 'next-intl/server'

const NotFoundPage = async () => {
  const messages = await getMessages()
  const t = messages['404'] as { subtitle: string; backHome: string }
  return (
    <main className="bg-background text-foreground relative flex min-h-screen w-full flex-col items-center justify-center px-4">
      {/* Cyber frame corners */}
      <TopLeft width={48} height={48} className="absolute top-4 left-4" />
      <BottomRight width={48} height={48} className="absolute right-4 bottom-4" />

      {/* Glitchy 404 Title */}
      <h1 className="glitch text-highlight text-center text-[72px] font-black select-none sm:text-[96px] lg:text-[128px]">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-highlight mb-6 text-center text-xl md:text-2xl">{t.subtitle}</p>

      {/* Return Home Button */}
      <Link
        href="/"
        className="angular-tl-br-lg border-border text-highlight hover:text-primary hover:border-primary angular-all-md text-md relative inline-flex items-center border px-6 py-3 transition-colors md:text-lg"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.backHome}
        <TopLeft width={12} height={12} className="bg-border" />
        <BottomRight width={12} height={12} className="bg-border" />
      </Link>
    </main>
  )
}

export default NotFoundPage
