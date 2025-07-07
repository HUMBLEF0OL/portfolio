"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Send, Shield, Terminal, Wifi, Zap } from "lucide-react";
import Image from "next/image";
import GridBg from "@/assets/grid-bg.jpg";
import emailjs from "emailjs-com";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [terminalText, setTerminalText] = useState("");
    const [currentTime, setCurrentTime] = useState<string>("");


    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .sendForm(
                "service_cauw0os",        // Replace with your EmailJS service ID
                "template_djba5kb",       // Replace with your EmailJS template ID
                formRef.current!,
                "l_6-Poa8SFfEcxREh"     // Replace with your EmailJS public key
            )
            .then(
                () => {
                    alert("✅ Message sent successfully!");
                    formRef.current?.reset();
                },
                (error) => {
                    console.error("❌ Email error:", error);
                    alert("Something went wrong. Please try again later.");
                }
            )
            .finally(() => setSending(false));
    };

    useEffect(() => {
        const messages = [
            "NEURAL_LINK_ESTABLISHED...",
            "SCANNING_FOR_THREATS...",
            "FIREWALL_ACTIVE...",
            "READY_FOR_TRANSMISSION...",
            "AWAITING_INPUT..."
        ];
        let messageIndex = 0;
        let charIndex = 0;
        let currentMessage = "";

        const typeMessage = () => {
            if (charIndex < messages[messageIndex].length) {
                currentMessage += messages[messageIndex][charIndex];
                setTerminalText(currentMessage);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                setTimeout(() => {
                    messageIndex = (messageIndex + 1) % messages.length;
                    charIndex = 0;
                    currentMessage = "";
                    setTerminalText("");
                    typeMessage();
                }, 2000);
            }
        };

        typeMessage();
    }, []);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(timeStr);
        };

        updateClock(); // Initial call
        const interval = setInterval(updateClock, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full relative px-4 py-8 flex flex-col gap-[40px]">
            {/* Background Image */}
            <Image
                className="-z-1 brightness-30 object-cover"
                src={GridBg}
                fill
                alt="grid-bg"
                priority
            />

            {/* Section Title */}
            <h1 className="text-[30px] lg:text-[42px] uppercase z-10 text-foreground">Contact</h1>

            {/* Main Grid */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:px-16 gap-8 z-0">
                {/* Left Description */}
                <div className="flex flex-col gap-4 max-w-xl">
                    <h3 className="text-[18px] lg:text-[20px]">
                        You've reached HUMBLEFOOL'S transmission terminal — the neural gateway where code meets conversation. Whether you're a developer exploring synergies, a recruiter scanning frequencies, or a creator looking to collaborate, you're in the right sector.                    </h3>
                    <h4 className="text-[16px] lg:text-[18px] text-muted-foreground">
                        Whether you're a fellow dev, an idea-crafter, or a recruiter from the future — this is your uplink. Fire a message, and I’ll route it through my neural grid.
                    </h4>

                    <div className="bg-background lg:mr-5 border border-border p-3 font-mono text-xs text-green-400">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-3 h-3" />
                            <span>NEURAL_TERMINAL_v2.1</span>
                        </div>
                        <div className="text-primary">
                            {terminalText}<span className="animate-pulse">|</span>
                        </div>
                    </div>

                    <div className="flex gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1">
                            <Wifi className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">ONLINE</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-blue-400" />
                            <span className="text-blue-400">SECURE</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-purple-400" />
                            <span className="text-purple-400">MONITORED</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div
                    id="contact"
                    className="relative w-full max-w-xl p-8 md:p-12 border border-border bg-background/90 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-cyan-400 font-mono text-sm">SECURE_TRANSMISSION</h3>
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="font-medium">
                                NAME_INPUT
                            </label>
                            <Input
                                type="text"
                                name="user_name"
                                id="name"
                                placeholder="Enter your signature..."
                                className="text-highlight"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="font-medium">
                                EMAIL_PROTOCOL
                            </label>
                            <Input
                                type="email"
                                name="user_email"
                                id="email"
                                placeholder="your@email.com"
                                className="text-highlight"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="font-medium">
                                MESSAGE_PAYLOAD
                            </label>
                            <Textarea
                                name="message"
                                id="message"
                                placeholder="Transmit your data packet..."
                                rows={5}
                                className="text-highlight"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={sending}
                            className="font-bold px-6 py-2 angular-tl-br-lg flex items-center gap-2 self-end"
                        >
                            <Send className="w-4 h-4" />
                            {sending ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-highlight z-10">
                <span className="hidden sm:inline-flex">SYSTEM_STATUS: OPERATIONAL</span>
                <span>LOCALE_TIME: {currentTime}</span>
            </div>
        </section>
    );
};

export default Contact;
