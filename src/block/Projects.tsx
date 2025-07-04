"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Image from 'next/image';
import React from 'react'
import { BottomRight, TopLeft } from './AngularFrame';

const projects = [
    {
        heading: "Felis - AI Research Chatbot",
        subtitle: "Personalized AI assistant built for academic and emotional companionship",
        body: `Felis is an AI-powered research assistant designed specifically for a research scholar. It blends personal and professional utility, offering advanced RAG-based capabilities through LangChain. It supports contextual document retrieval, interactive conversations, and memory-based responses—all wrapped in a highly personalized UI experience.`,
        image: "https://cdnb.artstation.com/p/assets/images/images/026/533/843/large/artemis-linz-vrproject-08-05-2020-13-01-06.jpg?1589029662", // placeholder path
        skills: [
            "Next.js App Router",
            "ShadCN UI",
            "Tailwind CSS",
            "LangChain",
            "Supabase",
            "React Spring"
        ],
        link: {
            live: null, // private project
            github: null // private repo
        },
        private: true,
        theme: "love/dark/academic"
    },
    {
        heading: "Disposable Email Inbox",
        subtitle: "A privacy-first, no-signup email tool like MinuteInbox",
        body: `Built to help users receive disposable emails without login. This project involves a full-stack architecture with custom SMTP handling, dynamic inbox generation, and message retrieval in real-time. Ideal for testing or anonymous registrations.`,
        image: "https://cdnb.artstation.com/p/assets/images/images/026/533/843/large/artemis-linz-vrproject-08-05-2020-13-01-06.jpg?1589029662",
        skills: [
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "SMTP",
            "Socket.io"
        ],
        link: {
            live: null,
            github: "https://github.com/your-username/disposable-inbox" // adjust as needed
        },
        private: false
    },
    {
        heading: "Smart Email Generator",
        subtitle: "Context-aware AI tool for email drafting",
        body: `A lightweight AI-powered tool that helps users auto-generate professional and context-specific emails using JavaScript and generative AI models. Designed for productivity and minimal user input.`,
        image: "https://cdnb.artstation.com/p/assets/images/images/026/533/843/large/artemis-linz-vrproject-08-05-2020-13-01-06.jpg?1589029662",
        skills: [
            "JavaScript",
            "OpenAI API",
            "Prompt Engineering",
            "HTML/CSS"
        ],
        link: {
            live: "https://youremailgen.live", // if available
            github: "https://github.com/your-username/smart-email-generator"
        },
        private: false
    },
    {
        heading: "Modular ERP System",
        subtitle: "An end-to-end ERP solution for growing businesses",
        body: `A freelancing project built to streamline operations for small businesses. The system includes modules for inventory, billing, user roles, reporting, and more. Designed with performance, modularity, and customization in mind.`,
        image: "https://cdnb.artstation.com/p/assets/images/images/026/533/843/large/artemis-linz-vrproject-08-05-2020-13-01-06.jpg?1589029662",
        skills: [
            "Next.js",
            "Redux Toolkit",
            "Tailwind CSS",
            "Node.js",
            "AWS",
            "REST API",
            "Responsive Design"
        ],
        link: {
            live: null,
            github: null
        },
        private: true
    }
];



const Projects = () => {
    return (
        <div className='w-full relative p-[80px] flex flex-col gap-[40px]'>
            <h1 className='text-[42px] uppercase'>Project Archive</h1>

            {/* <div className='w-full'>

            </div> */}
            <Carousel
                opts={{
                    align: "start",
                }}
                orientation="vertical"
                className="w-full self-center max-w-4xl"
            >
                <CarouselContent className="-mt-1 h-[500px]">
                    {
                        projects.map((project, index) => {
                            return (
                                <CarouselItem key={index} className='pt-1 h-full rounded-none'>
                                    <div className='relative angular-tl-br-xl w-full h-full'>
                                        <TopLeft width={44} height={44} />
                                        <BottomRight width={44} height={44} />
                                        <Image
                                            src={project.image}
                                            fill
                                            alt='project-image'
                                            className='brightness-50'
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                                        <Card className='w-full h-full flex flex-col justify-between'>
                                            <CardHeader className='z-10'>{project.heading}</CardHeader>
                                            <div className='flex flex-col gap-0'>
                                                <CardContent className="flex self-end items-center justify-center px-6 z-10">
                                                    <span className="text-sm  z-10">{project.body}</span>

                                                </CardContent>
                                                <CardFooter className='z-10'>Test</CardFooter>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default Projects