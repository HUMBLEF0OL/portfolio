"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Send, Shield, Terminal, Wifi, Zap, X } from "lucide-react";
import Image from "next/image";
import GridBg from "@/assets/grid-bg.jpg";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [terminalText, setTerminalText] = useState("");
    const [currentTime, setCurrentTime] = useState<string>();

    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

    const t = useTranslations("Contact");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setStatusMessage(t("form.successMessage"));
                setStatusType("success");
                formRef.current?.reset();
            })
            .catch((error) => {
                console.error("Email error:", error);
                setStatusMessage(t("form.errorMessage"));
                setStatusType("error");
            })
            .finally(() => {
                setSending(false);
                setTimeout(() => {
                    setStatusMessage(null);
                    setStatusType(null);
                }, 5000);
            });
    };

    useEffect(() => {
        const messages = [
            t("terminalMessages.linkEstablished"),
            t("terminalMessages.scanningThreats"),
            t("terminalMessages.firewallActive"),
            t("terminalMessages.readyTransmission"),
            t("terminalMessages.awaitingInput")
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
            const timeStr = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            setCurrentTime(timeStr);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="contact" className="w-full relative px-4 py-8 flex flex-col gap-[40px]">
            <Image className="-z-1 brightness-30 object-cover" src={GridBg} fill alt="grid-bg" priority />
            <h1 className="text-[30px] lg:text-[42px] uppercase z-10 text-foreground">{t("sectionTitle")}</h1>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:px-16 gap-8 z-0">
                <div className="flex flex-col gap-4 max-w-xl">
                    <h3 className="text-[18px] lg:text-[20px]">{t("introTitle")}</h3>
                    <h4 className="text-[16px] lg:text-[18px] text-muted-foreground">{t("uplinkMessage")}</h4>

                    <div className="bg-background lg:mr-5 border border-border p-3 font-mono text-xs text-green-400">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-3 h-3" />
                            <span>{t("terminalLabel")}</span>
                        </div>
                        <div className="text-primary">
                            {terminalText}<span className="animate-pulse">|</span>
                        </div>
                    </div>

                    <div className="flex gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1">
                            <Wifi className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">{t("statusOnline")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-blue-400" />
                            <span className="text-blue-400">{t("statusSecure")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-purple-400" />
                            <span className="text-purple-400">{t("statusMonitored")}</span>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-xl p-8 md:p-12 border border-border bg-background/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-cyan-400 font-mono text-sm">{t("form.title")}</h3>
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                    </div>

                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="font-medium">{t("form.nameLabel")}</label>
                            <Input type="text" name="user_name" id="name" placeholder={t("form.namePlaceholder")} className="text-highlight" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="font-medium">{t("form.emailLabel")}</label>
                            <Input type="email" name="user_email" id="email" placeholder={t("form.emailPlaceholder")} className="text-highlight" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="font-medium">{t("form.messageLabel")}</label>
                            <Textarea name="message" id="message" placeholder={t("form.messagePlaceholder")} rows={5} className="text-highlight" required />
                        </div>

                        <Button type="submit" variant="secondary" disabled={sending} className="font-bold px-6 py-2 angular-tl-br-lg flex items-center gap-2 self-end">
                            <Send className="w-4 h-4" />
                            {sending ? t("form.sendingButton") : t("form.sendButton")}
                        </Button>
                    </form>

                    {/* ✅ Feedback Banner */}
                    {statusMessage && (
                        <div className={`mt-6 text-sm p-3 rounded-md border flex items-center justify-between gap-4
              ${statusType === "success" ? "bg-green-900 text-green-300 border-green-600" : "bg-red-900 text-red-300 border-red-600"}
            `}>
                            <span>{statusMessage}</span>
                            <button onClick={() => setStatusMessage(null)}>
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center sm:justify-between items-center text-xs font-mono text-highlight z-10">
                <span className="hidden sm:inline-flex">{t("footerStatus")}</span>
                <span>{t("footerTime")}: {currentTime}</span>
            </div>
        </section>
    );
};

export default Contact;
