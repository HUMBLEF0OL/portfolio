"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Image from "next/image";
import GridBg from "@/assets/grid-bg.jpg";
import emailjs from "emailjs-com";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);

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

    return (
        <section className="w-full relative p-[80px] flex flex-col gap-[40px]">
            {/* Background Image */}
            <Image
                className="-z-1 brightness-30 object-cover"
                src={GridBg}
                fill
                alt="grid-bg"
                priority
            />

            {/* Section Title */}
            <h1 className="text-[42px] uppercase z-10 text-foreground">Contact</h1>

            {/* Main Grid */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 z-10">
                {/* Left Description */}
                <div className="flex flex-col gap-4 max-w-xl">
                    <h3 className="text-[20px] font-medium">
                        You've reached the transmission terminal of Amit Rana, full-stack fabricator of interfaces, seeker of fast frontends, and guardian of clean code.
                    </h3>
                    <h4 className="text-[18px] text-muted-foreground">
                        Whether you're a fellow dev, an idea-crafter, or a recruiter from the future — this is your uplink. Fire a message, and I’ll route it through my neural grid.
                    </h4>
                    <div className="flex angular-tl-br-lg">
                        <div className="w-[25%] h-[5px] bg-primary" />
                    </div>
                </div>

                {/* Contact Form */}
                <div
                    id="contact"
                    className="relative w-full max-w-xl p-8 md:p-12 border border-border bg-background/90 backdrop-blur-sm"
                >
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="font-medium">
                                Name
                            </label>
                            <Input
                                type="text"
                                name="user_name"
                                id="name"
                                placeholder="Enter your name"
                                className="text-highlight"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="font-medium">
                                Email
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
                                Message
                            </label>
                            <Textarea
                                name="message"
                                id="message"
                                placeholder="Type your message here..."
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
        </section>
    );
};

export default Contact;
