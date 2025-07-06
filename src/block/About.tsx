"use client"
import React from 'react'
import Barcode from 'react-barcode'
import { useTheme } from 'next-themes'
import CyberIDCard from './CyberId'

const About = () => {

    const { theme } = useTheme();

    return (
        <section className='bg-primary w-full flex flex-col gap-8 lg:flex-row item-center justify-center px-4 py-8 -mt-[1px]'>
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


                    <h1 className="text-secondary font-black text-[30px] lg:text-[42px] tracking-wider uppercase">Identity Log</h1>
                    <p className="text-background font-semibold text-justify">
                        I build at the intersection of identity, code, and imagination, where every component is a signal in the constant exchange between human and machine. My work is modular, reactive, and wired with intent like circuits pulsing through a living interface.                    </p>
                    <p className="text-background font-semibold text-justify">
                        I design systems that feel alive. Every pixel has a reason to exist. Every animation is a conversation. Whether it’s React, Tailwind, shaders, or state machines, my tools shape responsive, immersive experiences that feel as much as they function.                    </p>
                    <p className="text-background font-semibold text-justify mb-[20px]">
                        This isn’t just a portfolio. It’s a grid. A reflection of how I think, create, and connect. A space where creativity flows like data and interfaces hum with energy.
                    </p>
                    <p className='text-background font-bold text-[20px] text-right self-start'>I’m HUMBLEF0OL—welcome to my circuit.</p>

                    <div className="w-full flex flex-col items-end mt-6 text-xs text-muted-foreground font-mono tracking-wide gap-1">
                        <span className="text-background/70">LAT: 28.5143629° N | LONG: 77.0730087° E</span>
                        <span className="text-background/70">GRID: SECTOR-21E / SYS-ID: HUMBLEF0OL</span>
                    </div>

                </div>

            </div>
        </section >
    )
}

export default About
