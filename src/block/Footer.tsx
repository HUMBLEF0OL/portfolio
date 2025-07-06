"use client";

import { ArrowBigDownDash, Github, Linkedin, Mail } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import TextEncoder from "./TextEncoder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {

    return (
        <footer className="relative w-full border-t border-primary/20 bg-background px-4 py-12 md:px-8">
            <div className="w-full mx-auto flex justify-between text-sm text-muted-foreground">

                {/* Left: Identity */}
                <div className="flex flex-col">
                    <p className="font-bold text-lg tracking-wide">
                        <TextEncoder text={`HUMBLEFOOL © ${new Date().getFullYear()}`} type="scambled" />
                    </p>
                    <p className="text-xs mt-2 italic max-w-lg">
                        Architecting interfaces at the edge of imagination. Powered by code, curiosity & a little chaos.
                    </p>

                    {/* Social Icons */}

                </div>
                <div className="flex mt-4 space-x-4 text-primary">
                    <a href="mailto:123amitrana0123@gmail.com" aria-label="Email">
                        <Mail className="w-5 h-5 hover:text-secondary" />
                    </a>
                    <a href="https://github.com/HUMBLEF0OL" target="_blank" aria-label="GitHub">
                        <Github className="w-5 h-5 hover:text-secondary" />
                    </a>
                    <a href="https://linkedin.com/in/amit-rana-711169183" target="_blank" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5 hover:text-secondary" />
                    </a>
                    <a href="/resume.pdf" download aria-label="Download Resume">
                        <ArrowBigDownDash className="w-5 h-5 hover:text-secondary" />
                    </a>
                </div>

            </div>

        </footer>
    );
}
