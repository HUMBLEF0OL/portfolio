import Image from 'next/image'
import React from 'react'
import Avatar from '@/assets/profile.jpg'
import { SquareUser } from 'lucide-react'

const About = () => {
    return (
        <div className='w-[100%] relative h-fit flex items-center justify-between border-y-[8px] bg-card text-foreground p-[56px] rounded-xs'>
            <div className='absolute -top-[72px] px-4 py-2 left-10 w-fit border-[8px] border-b-card rounded-tl-lg rounded-tr-lg bg-card  flex items-center justify-center gap-4'>
                <SquareUser strokeWidth={3} size={30} />
                <h1 className='text-4xl font-bold'>About Me</h1>
            </div>
            <div className='flex items-center justify-center p-4 rounded-xl'>
                <div className='w-[550px] flex flex-col items-center justify-center p-4 border-[4px] shadow-[10px_10px_0px_0px_theme(colors.muted-foreground)] rounded-lg'>
                    <p className='text-sm font-bold leading-relaxed text-justify p-4'>
                        Hey there, I'm a Frontend Engineer wired for the web and tuned into the future. I code with flair, blending crisp logic and pixel-perfect style like it's the golden age of tech. React, Next.js, and sleek JavaScript are my synths of choice, and I jam out clean, responsive, and blazing-fast interfaces.                    </p>
                    <p className='text-sm font-bold leading-relaxed text-justify p-4'>
                        Fueled by neon gradients, gridlines, and a love for seamless UX, I bring a bold visual rhythm to everything I build. I believe good code is like a vintage arcade—simple, sharp, and unforgettable.                    </p>

                    <p className='text-sm font-bold leading-relaxed text-justify p-4'>Always curious, always creating—riding the wave where design meets tech. Whether I’m crafting a sleek interface or fine-tuning a UI animation, I treat every detail like it’s part of a bigger visual symphony. Accessibility, performance, and aesthetics go hand-in-hand in my workflow, and I constantly explore new tools and patterns that push the edge of frontend innovation.</p>
                    <p className='text-sm font-black leading-relaxed text-primary text-justify p-4'>
                        Always curious, always creating—riding the wave where design meets tech.
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-8 p-4 -ml-[10px]'>
                    <p className='text-lg font-semibold p-4 w-[285px] border-2 border-border bg-secondary text-primary-foreground rounded-md text-center shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] hover:shadow-[8px_8px_0px_0px_theme(colors.muted-foreground)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]'>
                        Philosophy Seeker
                    </p>
                    <p className='text-lg font-semibold p-4 w-[285px] border-2 border-border bg-secondary text-primary-foreground rounded-md text-center shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] hover:shadow-[8px_8px_0px_0px_theme(colors.muted-foreground)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]'>
                        Interface Artist
                    </p>
                    <p className='text-lg font-semibold p-4 w-[285px] border-2 border-border bg-secondary text-primary-foreground rounded-md text-center shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] hover:shadow-[8px_8px_0px_0px_theme(colors.muted-foreground)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]'>
                        Hardcore Gamer
                    </p>
                    <p className='text-lg font-semibold p-4 w-[285px] border-2 border-border bg-secondary text-primary-foreground rounded-md text-center shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] hover:shadow-[8px_8px_0px_0px_theme(colors.muted-foreground)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]'>
                        Music Addict
                    </p>
                    <p className='text-lg font-semibold p-4 w-[285px] border-2 border-border bg-secondary text-primary-foreground rounded-md text-center shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] hover:shadow-[8px_8px_0px_0px_theme(colors.muted-foreground)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]'>
                        Deep Thinker
                    </p>
                </div>
            </div>
            <Image style={{
                alignSelf: 'center', marginRight: '20px'
            }} src={Avatar} alt="About Me" width={350} height={350} className="rounded-lg border-border border-6" />
        </div>
    )
}

export default About