"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import AvatarPunk from "@/assets/avatar-punk.jpg";
import AvatarTron from "@/assets/avatar-tron.png";

import { Button } from "@/components/ui/button";
import { BottomRight } from "./AngularFrame";

const HomeComponent = () => {
    const { theme } = useTheme();
    const t = useTranslations("Home");

    return (
        <div id="home" className="flex flex-col mt-0 mb-5 sm:mb-0  lg:-mt-[60px] lg:flex-row justify-center lg:justify-between w-full lg:w-[75%] items-center h-screen gap-[40px]">
            <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
                <Image
                    src={theme === "dark" ? AvatarTron : AvatarPunk}
                    alt="Avatar"
                    width={400}
                    height={400}
                    className="brightness-60 w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            </div>

            <div className="flex flex-col gap-[60px] px-[20px]">
                <div className="flex flex-col gap-[20px] max-w-xl">
                    <p
                        className="text-center lg:text-left text-[30px] md:text-[42px] font-black glitch text-highlight"
                        data-text={t("headline")}
                    >
                        {t("headline")}
                    </p>
                    <p className="text-justify">{t("description")}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-[20px]">
                    <Button onClick={() => {
                        const skills = document.getElementById("skills");
                        if (skills) {
                            skills.scrollIntoView({ behavior: "smooth" });
                        }
                    }} className="relative angular-br-lg" variant={"outline"} size={"xl"}>
                        <BottomRight />
                        {t("buttons.skills")}
                    </Button>
                    <Button onClick={() => {
                        const projects = document.getElementById("projects");
                        if (projects) {
                            projects.scrollIntoView({ behavior: "smooth" });
                        }
                    }} className="angular-br-lg" size={"xl"}>
                        {t("buttons.projects")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
