"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import CyberIDCard from './CyberId'
import { useTranslations } from 'next-intl'

const About = () => {
    const t = useTranslations("About");
    return (
        <section className='bg-border w-full flex flex-col gap-8 lg:flex-row item-center justify-center px-4 py-8 -mt-[1px]'>
            <CyberIDCard />
            <div className='flex items-center max-w-2lg'>
                <div className="relative w-fit flex flex-col gap-[20px] p-[20px] md:p-[40px] items-center">

                    <span className="absolute top-0 left-0 w-[40px] h-[2px] bg-background z-10" />
                    <span className="absolute top-0 left-0 h-[40px] w-[2px] bg-background z-10" />

                    <span className="absolute top-0 right-0 w-[40px] h-[2px] bg-background z-10 -ml-[40px]" />
                    <span className="absolute top-0 right-0 h-[40px] w-[2px] bg-background z-10" />

                    <span className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-background z-10" />
                    <span className="absolute bottom-0 left-0 h-[40px] w-[2px] bg-background z-10 -mt-[40px]" />

                    <span className="absolute bottom-0 right-0 w-[40px] h-[2px] bg-background z-10 -ml-[40px]" />
                    <span className="absolute bottom-0 right-0 h-[40px] w-[2px] bg-background z-10 -mt-[40px]" />


                    <h1 className="text-secondary font-black text-[24px] sm:text-[30px] lg:text-[42px] tracking-wider uppercase">{t("title")}</h1>
                    <p className="text-background font-semibold text-justify">
                        {t("paragraph1")}
                    </p>
                    <p className="text-background font-semibold text-justify">
                        {t("paragraph1")}
                    </p>
                    <p className="text-background font-semibold text-justify mb-[20px]">
                        {t("paragraph3")}
                    </p>
                    <p className='text-background font-bold text-[16px] md:text-[20px]  self-start'>{t("closing")}</p>

                    <div className="w-full flex flex-col items-end mt-6 text-xs text-muted-foreground font-mono tracking-wide gap-1">
                        <span className="text-background/70">{t("location_latlong")}</span>
                        <span className="text-background/70">{t("location_sysid")}</span>
                    </div>

                </div>

            </div>
        </section >
    )
}

export default About
