import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { BottomLeft, TopRight } from './AngularFrame';
import experienceLog from '@/data/xp.json'



const Experience = () => {
    return (
        <div className='w-full relative p-[80px] flex flex-col gap-[40px]'>
            <h1 className='text-[42px] uppercase'>Experience Log</h1>

            <div className='flex flex-col gap-0'>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-chart-2 font-bold'>USER.ID:</span> _HUMBLEF00L_
                </p>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-chart-2 font-bold'>ACCESS LEVEL:</span> AUTHORIZED // CLEARANCE: TIER-03
                </p>
                <p><span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-chart-2 font-bold'>TIMEFRAME:</span> [ACTIVITY LOG -- 2022 ▶ 2025]</p>

            </div>
            <div className='p-4'>
                <Tabs defaultValue="xp-intern" className="w-[full]" orientation='horizontal'>
                    <TabsList className='relative'>
                        <TabsTrigger value="xp-sde2" className='text-[20px] font-medium tracking-wide border-b-2 border-t-0 border-l-0 border-r-0 angular-bl-lg border-border'>SOFTWARE DEVELOPMENT ENGINEER 2</TabsTrigger>
                        <TabsTrigger value="xp-sde1" className='text-[20px] font-medium tracking-wide border-b-2 border-t-0 border-l-0 border-r-0 angular-bl-lg border-border'>SOFTWARE DEVELOPMENT ENGINEER 1</TabsTrigger>
                        <TabsTrigger value="xp-intern" className='text-[20px] font-medium tracking-wide border-b-2 border-t-0 border-l-0 border-r-0 angular-bl-lg border-border'>SOFTWARE DEV INTERN</TabsTrigger>
                    </TabsList>
                    {
                        experienceLog.map((experience, index) => {
                            return (
                                <TabsContent value={experience.xpValue}>
                                    <div className='relative h-fit angular-tr-bl-xl border-4'>
                                        <TopRight width={44} height={44} />
                                        <BottomLeft width={44} height={44} />

                                        <div className='flex flex-col justify-end h-full py-8 px-4'>
                                            <h2 className='text-[24px] font-medium tracking-wide'>{experience.title}</h2>
                                            <h4
                                                className='relative group cursor-pointer'
                                                data-unmasked={"organization"}
                                            >
                                                <span className="group-hover:opacity-0 transition-opacity text-highlight">
                                                    {experience.maskedOrg}
                                                </span>
                                                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity text-highlight">
                                                    {experience.unmaskedOrg}
                                                </span>
                                            </h4>
                                            <p>{experience.period}</p>
                                            <p className='mt-4'>OPERATIONS</p>
                                            <div className='flex flex-col'>
                                                {
                                                    experience.operations.map((xp, index) => (
                                                        <p className='' key={index}><span className='text-highlight'>▸</span> {xp}</p>
                                                    ))
                                                }
                                            </div>

                                        </div>

                                    </div>
                                </TabsContent>
                            )
                        })
                    }
                </Tabs>
            </div>


            <div className='flex flex-col gap-0'>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> END OF LOG
                </p>
                <p>
                    <span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-chart-2 font-bold'>STATUS:</span> EXPERIENCE TREE STABLE
                </p>
                <p><span className='animate-pulse [animation-duration:1s] text-highlight font-black'>{'>'}</span> <span className='text-chart-2 font-bold'>NEXT SYNC:</span> T+30d</p>


            </div>


        </div>
    )
}

export default Experience