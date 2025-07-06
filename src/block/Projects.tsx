"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Image from 'next/image';
import React from 'react'
import { BottomLeft, BottomRight, TopLeft, TopRight } from './AngularFrame';
import { Button } from '@/components/ui/button';
import ProjectData from '@/data/project.json'



const Projects = () => {
    return (
        <div className='w-full relative px-4 py-8 mb-4 flex flex-col gap-[40px]'>
            <h1 className='text-[30px] lg:text-[42px] uppercase'>Project Archive</h1>

            <Carousel
                opts={{
                    align: "start",
                }}
                orientation="vertical"
                className="w-full self-center max-w-4xl"
            >
                <CarouselContent className="-mt-1 h-[300px] sm:[400px] md:[450px] lg:h-[500px]">
                    {
                        ProjectData.map((project, index) => {
                            return (
                                <CarouselItem key={index} className='pt-1 h-full rounded-none'>
                                    <div className='relative angular-tl-br-xl w-full h-full'>
                                        <TopLeft width={44} height={44} />
                                        <BottomRight width={44} height={44} />
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} project screenshot`}
                                            fill
                                            className='brightness-20 object-cover'
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                                            priority={index === 0}
                                        />

                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                                        <Card className='w-full h-full flex flex-col justify-between z-10'>
                                            <CardHeader className='z-10'>
                                                <div className='flex flex-col gap-0'>
                                                    <h2 className='text-end text-[18px] lg:text-[24px] font-medium tracking-wide'>{project.title}</h2>
                                                    <h4 className='text-end text-sm md:text-md'>{project.subtitle}</h4>

                                                </div>
                                            </CardHeader>
                                            <div className='flex flex-col gap-0'>
                                                <CardContent className="flex flex-col gap-4 justify-center px-6 z-10 mb-4">
                                                    <span className="text-sm hidden md:inline-flex z-10">{project.description}</span>
                                                    <div className='flex gap-2 flex-wrap justify-start'>
                                                        {
                                                            project.techStack.map(skill => (
                                                                <div className='relative px-2 py-1 border border-highlight angular-all-sm'>
                                                                    <TopLeft width={6} height={6} className='bg-highlight' />
                                                                    <TopRight width={6} height={6} className='bg-highlight' />
                                                                    <BottomLeft width={6} height={6} className='bg-highlight' />
                                                                    <BottomRight width={6} height={6} className='bg-highlight' />
                                                                    <p className='text-highlight text-xs md:text-md'> {skill}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>

                                                </CardContent>
                                                <CardFooter className='z-10'>{
                                                    project.isPrivate ? <div>
                                                        <div className='px-3 py-1 md:px-4 md:py-2 bg-destructive brightness-50 relative angular-br-lg'>
                                                            <BottomRight />
                                                            <p className='text-sm md:text-lg'>PRIVATE</p>
                                                        </div>
                                                    </div> : <div className='flex gap-2'>
                                                        {project?.link && <Button
                                                            variant={'link'}
                                                            className='hover:cursor-pointer text-sm md:text-lg'
                                                            onClick={() => {
                                                                window.open(project.link, "_blank")
                                                            }}
                                                        >Live</Button>}
                                                        {project?.github && <Button
                                                            variant={'outline'}
                                                            className='relative hover:cursor-pointer angular-br-lg text-sm md:text-lg'
                                                            onClick={() => {
                                                                window.open(project.github, "_blank")
                                                            }}
                                                        >
                                                            <BottomRight />
                                                            <p>Github</p>
                                                        </Button>}
                                                    </div>
                                                }</CardFooter>
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