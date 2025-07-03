"use client"
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowBigDown, ArrowBigDownDash, Download, Github, Linkedin, Volume2 } from 'lucide-react'
import React, { useState } from 'react'


const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
]

const languages = [
    {
        name: "English",
        code: "en",
        locale: "en"
    },
    {
        name: "Español",
        code: "es",
        locale: "es"
    },
    {
        name: "Français",
        code: "fr",
        locale: "fr"
    },
    {
        name: "Deutsch",
        code: "de",
        locale: "de"
    },
    {
        name: "Italiano",
        code: "it",
        locale: "it"
    },
    {
        name: "Português",
        code: "pt",
        locale: "pt"
    },
    {
        name: "Русский",
        code: "ru",
        locale: "ru"
    },
    {
        name: "日本語",
        code: "ja",
        locale: "ja"
    },
    {
        name: "한국어",
        code: "ko",
        locale: "ko"
    },
    {
        name: "中文",
        code: "zh",
        locale: "zh"
    },
    {
        name: "العربية",
        code: "ar",
        locale: "ar"
    },
    {
        name: "हिन्दी",
        code: "hi",
        locale: "hi"
    }
];

const Header = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en')
    return (
        <header
            className='fixed top-0 left-0 h-[60px] w-full z-50 bg-transparent px-[40px]'
        >
            <nav className="flex items-end h-full w-full justify-between">
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
                    <a download aria-label="Download Resume">
                        <Volume2 className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                    </a>
                </div>

                <ul className="flex items-center bg-black/40 backdrop-blur-sm h-[40px] border-[1px] border-[1px] border-primary angular-tl-br-lg">
                    <>
                        <span
                            className="absolute top-0 left-0 w-[12px] h-[12px] z-10 bg-primary"
                            style={{
                                clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                            }}
                        />
                        <div className='w-[16px] h-full' />


                        {navLinks.map((link, index) => (
                            <li key={link.name} className="relative">
                                <a
                                    href={link.href}
                                    className={`
                    block text-highlight font-semibold uppercase tracking-wide text-sm
                    py-[10px] px-[20px] 
                    hover:bg-foreground hover:text-background
                `}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <Select onValueChange={(value) => {
                            setSelectedLanguage(value);
                        }} value={selectedLanguage}>
                            <SelectTrigger className="w-fit text-highlight! h-[40px]! font-semibold! uppercase! tracking-wide! text-sm!">
                                <SelectValue >{selectedLanguage}</SelectValue>
                            </SelectTrigger>
                            <SelectContent
                                className='h-[200px] w-[300px] flex flex-col wrap bg-black/40 backdrop-blur-sm flex py-4 border-t-[4px] -mt-[5px] px-0'
                            >
                                <div className="grid grid-cols-2 gap-2">
                                    {languages.map((item) => (
                                        <SelectItem
                                            key={item.code}
                                            value={item.code}
                                            className="relative w-full text-highlight focus:bg-transparent p-0!"
                                        >
                                            <span className="absolute top-1/2 -left-1 w-[12px] h-[2px] bg-primary group-hover:bg-primary rounded-full transition-all duration-200 -translate-y-1/2" />
                                            <span className="text-sm text-highlight uppercase ml-[16px] hover:text-primary">{item.name}</span>
                                        </SelectItem>
                                    ))}
                                </div>
                            </SelectContent>
                        </Select>
                        <Button className="relative h-full px-[30px] py-2 angular-bottom-lg">
                            Contact
                        </Button>


                    </>
                </ul>



            </nav>
        </header>

    )
}

export default Header