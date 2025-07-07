"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { BottomLeft, TopRight } from './AngularFrame';
import { useTranslations } from 'next-intl';
import experienceLog from '@/data/xp.json'
import { cn } from '@/lib/utils';

const Experience = () => {
    const t = useTranslations("Experience");
    const exp = useTranslations('Experience.content');
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="w-full relative px-4 py-8 flex flex-col gap-[40px]">
            <h1 className="text-[30px] lg:text-[42px] uppercase">{t('sectionTitle')}</h1>

            <div className="flex flex-col gap-0 text-xs">
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> <span className="text-green-400">{t("terminalLogStart.userId")}</span></p>
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> <span className="text-green-400">{t("terminalLogStart.accessLevel")}</span></p>
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> <span className="text-green-400">{t("terminalLogStart.timeframe")}</span></p>
            </div>

            <div className="px-2 lg:px-4 flex justify-center">
                <Tabs defaultValue="xp-sde2" className="w-full max-w-5xl flex flex-col lg:flex-row-reverse gap-16">
                    <TabsList className="flex flex-row lg:flex-col w-full lg:w-[450px] justify-center lg:justify-end gap-2">
                        <TabsTrigger value="xp-sde2" className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border">
                            <p className="hidden lg:inline-flex">{t("tabs.sde2.labelFull")}</p>
                            <p className="inline-flex lg:hidden">{t("tabs.sde2.labelShort")}</p>
                        </TabsTrigger>
                        <TabsTrigger value="xp-sde1" className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border">
                            <p className="hidden lg:inline-flex">{t("tabs.sde1.labelFull")}</p>
                            <p className="inline-flex lg:hidden">{t("tabs.sde1.labelShort")}</p>
                        </TabsTrigger>
                        <TabsTrigger value="xp-intern" className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border">
                            <p className="hidden lg:inline-flex">{t("tabs.intern.labelFull")}</p>
                            <p className="inline-flex lg:hidden">{t("tabs.intern.labelShort")}</p>
                        </TabsTrigger>
                    </TabsList>

                    <div className="w-full">
                        {experienceLog.map((experience, index) => (
                            <TabsContent key={index} value={experience.xpValue}>
                                <div className="relative h-fit angular-tr-bl-xl border-4 p-4">
                                    <TopRight width={44} height={44} />
                                    <BottomLeft width={44} height={44} />

                                    <div className="flex flex-col justify-end h-full py-4 md:py-8 px-2 md:px-4 gap-2">
                                        <h2 className="text-[20px] md:text-[24px] font-medium tracking-wide">
                                            {exp(experience.titleKey)}
                                        </h2>
                                        <h4
                                            className="relative group cursor-pointer select-none"
                                            onClick={() => setIsRevealed(!isRevealed)}
                                        >
                                            <span
                                                className={cn(
                                                    "transition-opacity text-highlight",
                                                    "group-hover:opacity-0",
                                                    isRevealed && "opacity-0"
                                                )}
                                            >
                                                {experience.maskedOrg}
                                            </span>

                                            <span
                                                className={cn(
                                                    "absolute inset-0 transition-opacity text-highlight",
                                                    "opacity-0 group-hover:opacity-100",
                                                    isRevealed && "opacity-100"
                                                )}
                                            >
                                                {experience.unmaskedOrg}
                                            </span>
                                        </h4>

                                        <p className="text-sm md:text-base">{exp(experience.periodKey)}</p>

                                        <p className="mt-4 uppercase text-highlight">{t("content.operationsLabel")}</p>
                                        <div className="flex flex-col gap-1">
                                            {experience.operationsKeys.map((opKey: string, i: number) => (
                                                <p key={i} className="text-sm md:text-base">
                                                    <span className="text-highlight">▸</span> {exp(opKey)}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>

            <div className="flex flex-col gap-0 text-xs">
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> {t("terminalLogEnd.end")}</p>
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> <span className="text-green-400">{t("terminalLogEnd.status")}</span></p>
                <p><span className="animate-pulse text-highlight font-black">{'>'}</span> <span className="text-green-400">{t("terminalLogEnd.nextSync")}</span></p>
            </div>
        </div>
    );
}

export default Experience