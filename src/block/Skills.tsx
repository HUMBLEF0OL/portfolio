"use client"
import React from 'react'
import TextEncoder from './TextEncoder';
import Background from '@/assets/grid-bg.jpg'
import Image from 'next/image';
import { BottomLeft, BottomRight, TopLeft, TopRight } from './AngularFrame';
import skillSet from '@/data/skills.json'
import { useTranslations } from 'next-intl';


const Skills = () => {
    const t = useTranslations("Skills")
    return (
        <section className='w-full relative px-4 py-8 flex flex-col gap-[40px]'>
            <Image
                src={Background}
                fill
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    filter: "brightness(20%)",
                    zIndex: -1
                }}
                alt='background-image'
            />

            <h1 className='text-[30px] lg:text-[42px] uppercase'>{t('title')}</h1>

            <div className='flex flex-wrap gap-[24px] justify-center'>
                {Object.entries(skillSet).map(([categoryKey, skills]) => (
                    <div key={categoryKey} className="w-full max-w-5xl">
                        <div className="flex gap-1 text-highlight text-lg lg:text-xl uppercase tracking-widest mb-2">
                            <p className='animate-pulse [animation-duration:1s]'>▌</p>
                            <h2>
                                <TextEncoder className='lowercase' text={categoryKey} />
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-[24px] pl-[40px]">
                            {skills.map(skill => (
                                <div className="relative angular-tl-br-lg w-fit px-[10px] py-[4px] border-1" key={skill}>
                                    <TopLeft />
                                    <BottomRight />
                                    <p className="text-lg">{skill}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <p className='self-center mt-[20px] uppercase text-highlight text-[20px]'>
                <TextEncoder text={t('footer')} type='scambled' className='text-sm text-center' />
            </p>
        </section>
    )
}

export default Skills