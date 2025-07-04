"use client"
import React from 'react';
// import Avatar from '@/assets/avatar.png'
import AvatarPunk from '@/assets/avatar-punk.jpg';
import AvatarTron from '@/assets/avatar-tron.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Divider } from './Divider';
import { useTheme } from 'next-themes';

const HomeComponent = () => {
    const { theme } = useTheme();
    return (
        <div className='flex justify-between w-[75%] items-center h-screen gap-[40px]'>
            <div className="relative w-[400px] h-[400px]">
                {/* The avatar image */}
                <Image
                    src={theme === "dark" ? AvatarTron : AvatarPunk}
                    alt="Avatar"
                    width={400}
                    height={400}
                    className="brightness-60 w-full h-full object-cover"
                />

                {/* Left gradient */}
                <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />

                {/* Right gradient */}
                <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                {/* Top gradient */}
                <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            </div>


            <div className='flex flex-col gap-[60px]'>
                <div className='flex flex-col gap-[20px] max-w-xl'>
                    <p
                        className='text-[42px] font-black glitch-hover text-highlight'
                        data-text="Welcome to the Grid"
                    >
                        Welcome to the Grid
                    </p>
                    <p >
                        The Grid. A digital frontier. Neon circuits power systems built from logic, but shaped by creativity. It’s a space where identity is written in code and ideas evolve with every keystroke. Glitches don’t break things — they reveal them. This isn’t just a network; it’s a reflection of human imagination.
                    </p>
                </div>

                <div className='flex gap-[20px]'>
                    <Button className='relative angular-b-bg' variant={'outline'} size={'xl'}>
                        <span
                            className="absolute bottom-0 right-0 w-[12px] h-[12px] z-10 bg-primary"
                            style={{
                                clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
                            }}
                        />
                        Skill Matrix

                    </Button>
                    <Button className='angular-b-bg' size={'xl'}> Project Archives</Button>
                </div>
            </div>
        </div >
    );
};

export default HomeComponent;



/*

Welcome to the Grid of Me
Exploring identity, code, and creativity through neon circuits and glowing logic.


I Am the User.
Code. Circuit. Consciousness.
Digital by Design, Human at Core.
"Interfaces wired with intent, glowing with imagination."
*/