import { ArrowBigDownDash, Code2, Github, Linkedin, Sparkles } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className='hidden md:flex w-[80%] h-[110px] px-10 py-6 bg-popover border-[2px] 
    rounded-tl-lg rounded-tr-lg shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] border-border'>
            <div className='flex items-center justify-between w-full'>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg text-muted-foreground">
                        <Code2 className="w-5 h-5 text-primary " />
                        <span className="font-medium ">Solving problems, one line at a time.</span>
                        <Code2 className="w-5 h-5 text-primary " />

                    </div>
                </div>
                <div className='flex items-center gap-8'>
                    <a href="https://github.com/HUMBLEF0OL" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                    </a>
                    <a href="https://www.linkedin.com/in/amit-rana-711169183/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                    </a>
                    <a href="/resume.pdf" download aria-label="Download Resume">
                        <ArrowBigDownDash className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                    </a>
                </div>
                {/* <div className='flex items-center gap-2 rounded-full px-3 py-2 border-1'>
                    <span className='w-2 h-2 rounded-full bg-secondary animate-pulse' />
                    <span className="text-xs text-muted-foreground font-medium">Available</span>

                </div> */}
            </div>
        </footer>
    )
}

export default Footer