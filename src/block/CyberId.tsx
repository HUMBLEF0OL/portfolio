"use client";

import React from "react";
import Barcode from "react-barcode";
import Passport from '@/assets/passport.jpg'
import { cn } from "@/lib/utils";
import Image from "next/image";

const CyberIDCard = () => {
    return (
        <section className="w-full self-center max-w-lg h-fit mx-auto border border-primary p-6 bg-background/90 backdrop-blur-md text-foreground relative shadow-[0_0_30px_rgba(0,255,255,0.15)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                    <h2 className="text-xl font-bold tracking-wide text-primary">
                        Identity Broadcast
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Uplink Verified — Secure Session
                    </p>
                </div>
                <div className="text-right text-xs font-mono text-accent">
                    <p>ID: HUMBLEFOOL-G7KX</p>
                    <p>Ping Code: 9XK-JU42-FELIS</p>
                </div>
            </div>

            {/* Identity Block */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <Image src={Passport} className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]" alt="passport-image" />
                <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-lg font-semibold text-accent">Amit Rana</p>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="text-lg font-semibold text-accent">
                        UI Engineer / Interface Architect
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold text-green-400">Online</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="text-lg font-semibold text-accent">v3.2.7</p>
                </div>
            </div>

            {/* Terminal Log */}
            <div className="bg-black/40 border border-border p-3 text-xs font-mono text-green-400 mb-6">
                [ OK ] Auth: Success<br />
                [ SYS ] GitHub Linked<br />
                [ CORE ] Memory Booted: 92%<br />
                [ NODE ] Visual Renderer: Stable<br />
                [ INFO ] Creativity Engine: Active
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center">
                <Barcode
                    value="HUMBLEFOOL"
                    background="transparent"
                    height={60}
                    width={1.6}
                    displayValue={false}
                    lineColor="#fff"
                />
                <p className="text-xs text-muted-foreground mt-2">// SERIALIZED ID CODE //</p>
            </div>

        </section>
    );
};

export default CyberIDCard;
