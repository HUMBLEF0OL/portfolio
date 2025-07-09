"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { BottomLeft, BottomRight, TopLeft, TopRight } from './AngularFrame';
import { Button } from '@/components/ui/button';
import ProjectData from '@/data/project.json'
import { useTranslations } from 'next-intl';

const Projects = () => {
    const t = useTranslations("Projects");
    const projectCards = useTranslations("Projects.cards");

    // Custom hook logic for responsive orientation
    const [orientation, setOrientation] = useState<"vertical" | "horizontal">('vertical');

    useEffect(() => {
        const handleResize = () => {
            setOrientation(window.innerWidth >= 1024 ? 'horizontal' : 'vertical');
        };

        // Set initial orientation
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='projects' className='w-full relative px-4 py-8 mb-4 flex flex-col gap-[40px]'>
            <h1 className="text-[30px] lg:text-[42px] uppercase">{t("sectionTitle")}</h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                orientation={orientation}
                className="w-full self-center max-w-4xl"
            >
                <CarouselContent className={orientation === 'vertical' ? "-mt-1 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]" : "-ml-1"}>
                    {ProjectData.map((project, index) => {
                        // Extract key like "skinbattle", "felis", etc.
                        const key = project.titleKey?.split('.')?.[1] ?? '';

                        return (
                            <CarouselItem
                                key={index}
                                className={orientation === 'vertical'
                                    ? 'pt-1 h-full rounded-none'
                                    : 'pl-1 basis-full'
                                }
                            >
                                <div className={`relative angular-tl-br-xl w-full ${orientation === 'vertical' ? 'h-full' : 'h-[450px] lg:h-[500px]'}`}>
                                    <TopLeft width={44} height={44} />
                                    <BottomRight width={44} height={44} />

                                    <Image
                                        src={project.image}
                                        alt={`${key} project screenshot`}
                                        fill
                                        className='brightness-20 object-cover'
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                                        priority={index === 0}
                                    />

                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                                    <Card className='w-full h-full flex flex-col justify-between z-10'>
                                        <CardHeader className='z-10'>
                                            <div className='flex flex-col gap-0'>
                                                <h2 className='text-end text-[18px] lg:text-[24px] font-medium tracking-wide'>{projectCards(`${key}.title`)}</h2>
                                                <h4 className='text-end text-sm md:text-md'>{projectCards(`${key}.subtitle`)}</h4>
                                            </div>
                                        </CardHeader>

                                        <div className='flex flex-col gap-0'>
                                            <CardContent className="flex flex-col gap-4 justify-center px-6 z-10 mb-4">
                                                <span className={`text-sm z-10 ${orientation === 'vertical' ? 'hidden md:inline-flex' : 'inline-flex'}`}>
                                                    {projectCards(`${key}.description`)}
                                                </span>
                                                <div className='flex gap-2 flex-wrap justify-start'>
                                                    {project.techStack.map(skill => (
                                                        <div key={skill} className='relative px-2 py-1 border border-highlight angular-all-sm'>
                                                            <TopLeft width={6} height={6} className='bg-highlight' />
                                                            <TopRight width={6} height={6} className='bg-highlight' />
                                                            <BottomLeft width={6} height={6} className='bg-highlight' />
                                                            <BottomRight width={6} height={6} className='bg-highlight' />
                                                            <p className='text-highlight text-xs md:text-md'>{skill}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>

                                            <CardFooter className="z-10">
                                                {project.isPrivate ? (
                                                    <div className="px-3 py-1 md:px-4 md:py-2 bg-destructive brightness-50 relative angular-br-lg">
                                                        <BottomRight />
                                                        <p className="text-sm md:text-lg">{t("private")}</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        {project.link && (
                                                            <Button
                                                                variant="link"
                                                                className="hover:cursor-pointer text-sm md:text-lg"
                                                                onClick={() => window.open(project.link, "_blank")}
                                                            >
                                                                {t("live")}
                                                            </Button>
                                                        )}
                                                        {project.github && (
                                                            <Button
                                                                variant="outline"
                                                                className="relative hover:cursor-pointer angular-br-lg text-sm md:text-lg"
                                                                onClick={() => window.open(project.github, "_blank")}
                                                            >
                                                                <BottomRight />
                                                                <p>{t("github")}</p>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </CardFooter>
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Projects