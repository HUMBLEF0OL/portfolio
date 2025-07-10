// 'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BottomRight, TopLeft } from '@/block/AngularFrame'
import { getTranslations } from 'next-intl/server'

const NotFoundPage = async () => {
    const t = await getTranslations("404");
    return (
        <main className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
            {/* Cyber frame corners */}
            <TopLeft width={48} height={48} className="absolute top-4 left-4" />
            <BottomRight width={48} height={48} className="absolute bottom-4 right-4" />

            {/* Glitchy 404 Title */}
            <h1 className="text-[72px] sm:text-[96px] lg:text-[128px] font-black glitch text-highlight text-center select-none">
                404
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-highlight md:text-2xl text-center mb-6">
                {t("subtitle")}
            </p>

            {/* Return Home Button */}
            <Link
                href="/"
                className="relative inline-flex angular-tl-br-lg items-center px-6 py-3 border border-border text-highlight hover:text-primary hover:border-primary angular-all-md text-md md:text-lg transition-colors"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                {t("backHome")}
                <TopLeft width={12} height={12} className='bg-border' />
                <BottomRight width={12} height={12} className='bg-border' />
            </Link>
        </main>
    )
}

export default NotFoundPage
