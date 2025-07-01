import { ArrowBigDown, ArrowBigDownDash, Download, Github, Linkedin } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <header
            className="hidden md:flex w-[80%] h-[110px] px-10 py-6 bg-popover border-l border-r border-b-[3px] 
    rounded-bl-lg rounded-br-lg shadow-[6px_6px_0px_0px_theme(colors.muted-foreground)] border-border"
        >
            {/* Navigation */}
            <nav className="flex items-center w-full justify-between">
                <ul className="flex items-center gap-6">
                    <li>
                        <a
                            href="#home"
                            className="relative group text-[20px] tracking-wide font-medium text-foreground transition-colors duration-200
             hover:text-primary"
                        >
                            Home
                            <span
                                className="absolute left-0 -bottom-1 h-[3px] w-0 bg-secondary shadow-lg transition-all duration-300 group-hover:w-full"
                            />
                        </a>

                    </li>
                    <li>
                        <a
                            href="#about"
                            className="relative group text-[20px] tracking-wide font-medium text-foreground transition-colors duration-200
             hover:text-primary"
                        >
                            About
                            <span
                                className="absolute left-0 -bottom-1 h-[3px] w-0 bg-secondary shadow-md transition-all duration-300 group-hover:w-full"
                            />
                        </a>

                    </li>
                    <li>
                        <a
                            href="#skills"
                            className="relative group text-[20px] tracking-wide font-medium text-foreground transition-colors duration-200
             hover:text-primary"
                        >
                            Skills
                            <span
                                className="absolute left-0 -bottom-1 h-[3px] w-0 bg-secondary shadow-md transition-all duration-300 group-hover:w-full"
                            />
                        </a>

                    </li>
                    <li>
                        <a
                            href="#projects"
                            className="relative group text-[20px] tracking-wide font-medium text-foreground transition-colors duration-200
             hover:text-primary"
                        >
                            Projects
                            <span
                                className="absolute left-0 -bottom-1 h-[3px] w-0 bg-secondary shadow-md transition-all duration-300 group-hover:w-full"
                            />
                        </a>

                    </li>
                    <li>
                        <a href="#contact" className="text-[20px] tracking-wide font-medium text-primary hover:underline underline-offset-4 decoration-[3px] decoration-secondary drop-shadow-lg">
                            Contact
                        </a>
                        <span
                            className="absolute left-0 -bottom-1 h-[3px] w-0 bg-secondary shadow-md transition-all duration-300 group-hover:w-full"
                        />
                    </li>
                    <li>
                    </li>
                </ul>

                {/* Social Icons */}
                <div className="flex items-center gap-8">
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
            </nav>
        </header>

    )
}

export default Header