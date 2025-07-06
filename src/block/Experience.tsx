import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { BottomLeft, TopRight } from './AngularFrame';
import experienceLog from '@/data/xp.json'



const Experience = () => {
    return (
        <div className='w-full relative px-4 py-8 flex flex-col gap-[40px]'>
            <h1 className='text-[30px] lg:text-[42px] uppercase'>Experience Log</h1>

            <div className='flex flex-col gap-0 text-xs'>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-green-400'>[&nbsp;&nbsp;USER.ID&nbsp;&nbsp;]</span> _HUMBLEF00L_
                </p>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-green-400'>[&nbsp;&nbsp;ACCESS LEVEL&nbsp;&nbsp;]</span> AUTHORIZED // CLEARANCE: TIER-03
                </p>
                <p><span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-green-400'>[&nbsp;&nbsp;TIMEFRAME&nbsp;&nbsp;]</span> {'<'}ACTIVITY LOG -- 2022 ▶ 2025{'>'}</p>

            </div>
            <div className="px-2 lg:px-4 flex justify-center">
                <Tabs defaultValue="xp-sde2" className="w-full max-w-5xl flex flex-col lg:flex-row-reverse gap-16">
                    {/* Tabs List */}
                    <TabsList className="flex flex-row lg:flex-col w-full lg:w-[450px] justify-center lg:justify-end gap-2">
                        <TabsTrigger
                            value="xp-sde2"
                            className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border"
                        >
                            <p className='hidden lg:inline-flex'>SOFTWARE DEVELOPMENT ENGINEER 2</p>
                            <p className='inline-flex lg:hidden'>SDE 2</p>
                        </TabsTrigger>
                        <TabsTrigger
                            value="xp-sde1"
                            className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border"
                        >
                            <p className='hidden lg:inline-flex'>SOFTWARE DEVELOPMENT ENGINEER 1</p>
                            <p className='inline-flex lg:hidden'>SDE 1</p>
                        </TabsTrigger>
                        <TabsTrigger
                            value="xp-intern"
                            className="text-[14px] md:text-[16px] lg:text-[18px] font-medium tracking-wide border-b-2 angular-bl-lg border-border"
                        >
                            <p className='hidden lg:inline-flex'>SOFTWARE DEVELOPMENT INTERN</p>
                            <p className='inline-flex lg:hidden'>SDE INTERN</p>
                        </TabsTrigger>
                    </TabsList>

                    {/* Tabs Content */}
                    <div className="w-full">
                        {experienceLog.map((experience, index) => (
                            <TabsContent key={index} value={experience.xpValue}>
                                <div className="relative h-fit angular-tr-bl-xl border-4 p-4">
                                    <TopRight width={44} height={44} />
                                    <BottomLeft width={44} height={44} />

                                    <div className="flex flex-col justify-end h-full py-4 md:py-8 px-2 md:px-4 gap-2">
                                        <h2 className="text-[20px] md:text-[24px] font-medium tracking-wide">
                                            {experience.title}
                                        </h2>
                                        <h4 className="relative group cursor-pointer" data-unmasked="organization">
                                            <span className="group-hover:opacity-0 transition-opacity text-highlight">
                                                {experience.maskedOrg}
                                            </span>
                                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity text-highlight">
                                                {experience.unmaskedOrg}
                                            </span>
                                        </h4>
                                        <p className="text-sm md:text-base">{experience.period}</p>

                                        <p className="mt-4 uppercase text-highlight">Operations</p>
                                        <div className="flex flex-col gap-1">
                                            {experience.operations.map((xp, i) => (
                                                <p key={i} className="text-sm md:text-base">
                                                    <span className="text-highlight">▸</span> {xp}
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



            <div className='flex flex-col gap-0 text-xs'>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> END OF LOG
                </p>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-green-400'>[&nbsp;&nbsp;STATUS&nbsp;&nbsp;]</span> EXPERIENCE TREE STABLE
                </p>
                <p><span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-green-400'>[&nbsp;&nbsp;NEXT SYNC&nbsp;&nbsp;]</span> T+30d</p>


            </div>


        </div>
    )
}

export default Experience