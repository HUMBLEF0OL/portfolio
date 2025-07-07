"use client";

import React from "react";
import Barcode from "react-barcode";
import Passport from '@/assets/passport.jpg'
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

const CyberIDCard = () => {
    const t = useTranslations("CyberIDCard");

    return (
        <section className="w-full self-center max-w-lg h-fit mx-auto border border-primary p-6 bg-background/90 backdrop-blur-md text-foreground relative shadow-[0_0_30px_rgba(0,255,255,0.15)]">
            <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                    <h2 className="text-md md:text-xl font-bold tracking-wide text-primary">
                        {t("header.title")}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        {t("header.subtitle")}
                    </p>
                </div>
                <div className="text-right text-xs font-mono text-accent">
                    <p>{t("header.id")}</p>
                    <p>{t("header.ping")}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <Image
                    src={Passport}
                    className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
                    alt="passport-image"
                />
                <div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        {t("identity.nameLabel")}
                    </p>
                    <p className="text-sm md:text-lg font-semibold text-accent">
                        {t("identity.nameValue")}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        {t("identity.roleLabel")}
                    </p>
                    <p className="text-sm md:text-lg font-semibold text-accent">
                        {t("identity.roleValue")}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {t("identity.statusLabel")}
                    </p>
                    <p className="text-lg font-semibold text-green-400">
                        {t("identity.statusValue")}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {t("identity.versionLabel")}
                    </p>
                    <p className="text-lg font-semibold text-accent">
                        {t("identity.versionValue")}
                    </p>
                </div>
            </div>

            {/* Terminal Log */}
            <div className="bg-black/40 border border-border p-3 text-xs font-mono text-green-400 mb-6">
                {t("log.auth")}<br />
                {t("log.github")}<br />
                {t("log.memory")}<br />
                {t("log.renderer")}<br />
                {t("log.creativity")}
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
                <p className="text-xs text-muted-foreground mt-2">
                    {t("barcode.label")}
                </p>
            </div>
        </section>
    );
};
export default CyberIDCard;
