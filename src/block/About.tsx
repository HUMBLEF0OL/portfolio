"use client"
import Image from 'next/image'
import React from 'react'
import Avatar from '@/assets/profile.jpg'
import { SquareUser } from 'lucide-react'
import Barcode from 'react-barcode'
import { useTheme } from 'next-themes'

const About = () => {
    const totalCols = 20;
    const totalRows = 6;
    const centerCol = Math.floor(totalCols / 2);

    const { theme } = useTheme();

    return (
        <div className='bg-primary w-full flex item-center justify-center'>
            {/* <div className="relative before:content-[''] before:absolute before:top-0 before:left-[10px] before:w-[100%] before:h-px before:bg-background">
                Your content
            </div> */}



            <div className="relative w-2xl flex flex-col gap-[20px] p-[40px] items-center my-[40px]">

                <span className="absolute top-0 left-0 w-[40px] h-[2px] bg-background z-10" />
                <span className="absolute top-0 left-0 h-[40px] w-[2px] bg-background z-10" />

                {/* Top-right corner - FIXED */}
                <span className="absolute top-0 right-0 w-[40px] h-[2px] bg-background z-10 -ml-[40px]" />
                <span className="absolute top-0 right-0 h-[40px] w-[2px] bg-background z-10" />

                {/* Bottom-left corner - FIXED */}
                <span className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-background z-10" />
                <span className="absolute bottom-0 left-0 h-[40px] w-[2px] bg-background z-10 -mt-[40px]" />

                {/* Bottom-right corner - FIXED */}
                <span className="absolute bottom-0 right-0 w-[40px] h-[2px] bg-background z-10 -ml-[40px]" />
                <span className="absolute bottom-0 right-0 h-[40px] w-[2px] bg-background z-10 -mt-[40px]" />

                <h1 className="text-secondary font-black text-[42px] tracking-wider">ABOUT ME</h1>
                <p className="text-background font-semibold text-justify">
                    I navigate the intersection of identity, code, and digital imagination—where every interface is a conversation between human and machine. My world is built in layers: React components, glowing UI patterns, and async flows that pulse like neon circuits. I design with intent, making systems that are both expressive and efficient, drawing inspiration from cyberpunk worlds where design is immersive and alive.
                </p>
                <p className="text-background font-semibold text-justify">
                    Fueled by curiosity and coffee, I thrive where innovation meets aesthetic. Whether I’m engineering dynamic systems or refining pixel-perfect layouts, I focus on the harmony between logic and design. My tools are code, my canvas the browser, and my mission is simple—build experiences that feel electric.                </p>
                <p className="text-background font-semibold text-justify mb-[20px]">
                    This isn’t just a portfolio—it’s my grid. A space where creativity, technology, and identity converge. It’s a digital frontier I’ve crafted to explore, experiment, and express. Welcome to my circuit. This is where ideas glow, and interfaces come to life.
                </p>
                <Barcode value="HUMBLEFOOL" background={"transparent"} fontOptions='-10' />
            </div>
        </div >
    )
}

export default About
