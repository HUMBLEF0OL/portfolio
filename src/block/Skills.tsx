
import React from 'react'
import TextEncoder from './TextEncoder';
import Background from '@/assets/grid-bg.jpg'
import Image from 'next/image';
const skillSet = {
    Languages: [
        "JavaScript",
        "TypeScript",
        "Java",
        "SQL"
    ],
    Frameworks_Libraries: [
        "React.js",
        "Next.js",
        "Node.js",
        "Redux Toolkit",
        "Zustand",
        "Material UI",
        "Tailwind CSS",
        "Jest"
    ],
    Web_Technologies: [
        "HTML5",
        "CSS3 / SCSS",
        "REST APIs",
        "Webpack",
        "PWA",
        "i18n",
        "WebSockets"
    ],
    Tools: [
        "Git",
        "Postman",
        "Lighthouse",
        "Jira",
        "Google Analytics"
    ],
    Practices: [
        "Web Performance Optimization",
        "Accessibility (WCAG)",
        "SEO",
        "Responsive Design",
        "Agile / Scrum"
    ]
};




const Skills = () => {
    return (
        <div className='w-full relative p-[80px] flex flex-col gap-[40px]'>
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
            <h1 className='text-[42px] uppercase'>Skill Matrix</h1>

            <div className='flex flex-wrap gap-[24px] justify-center'>
                {
                    Object.entries(skillSet).map(([category, skills]) => (
                        <div key={category} className="w-full max-w-5xl">
                            <div className="flex gap-1 text-highlight text-xl uppercase tracking-widest mb-2">
                                <p className='animate-pulse [animation-duration:1s]'>▌</p> <h2>{category}</h2>
                            </div>
                            <div className="flex flex-wrap gap-[24px] pl-[40px]">
                                {skills.map(skill => (
                                    <div className="relative angular-tl-br-lg w-fit px-[36px] py-[10px] border-1" key={skill}>
                                        <span
                                            className="absolute top-0 left-0 w-[12px] h-[12px] z-10 bg-primary"
                                            style={{
                                                clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                                            }}
                                        />
                                        <p className="text-[20px]"><TextEncoder text={skill} /></p>
                                        <span
                                            className="absolute bottom-0 right-0 w-[12px] h-[12px] z-10 bg-primary"
                                            style={{
                                                clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
            <p className='self-center mt-[20px] uppercase text-highlight text-[20px]'>Circuit calibration complete. All capabilities fully operational</p>

        </div >
    )
}

export default Skills