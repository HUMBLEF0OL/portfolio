"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TopLeft } from "./AngularFrame";
import { NavIcons } from "./NavIcons";
import languages from "@/data/languages.json";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
    const locale = useLocale();
    const [selectedLanguage, setSelectedLanguage] = useState(locale);
    const t = useTranslations("Header");
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { name: t("navLinks.home"), href: "#home" },
        { name: t("navLinks.about"), href: "#about" },
        { name: t("navLinks.skills"), href: "#skills" },
        { name: t("navLinks.projects"), href: "#projects" },
        { name: t("navLinks.xp"), href: "#xp" },
    ];

    const handleLanguageChange = (newLocale: string) => {
        // Remove current locale from pathname
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

        // Navigate to new locale
        // router.replace(`/${newLocale}${pathWithoutLocale}`);

        setSelectedLanguage(newLocale)
        window.location.replace(`/${newLocale}${pathWithoutLocale}`)
    };

    return (
        <header className="top-0 left-0 h-[60px] w-full z-50 bg-transparent px-[40px]">
            <ul className="hidden fixed top-[20px] right-[40px] lg:flex items-center bg-black/40 backdrop-blur-sm h-[40px] border-primary border-[1px] angular-tl-br-lg">
                <TopLeft />
                <div className="w-[16px] h-full" />
                {navLinks.map((link) => (
                    <li key={link.name} className="relative">
                        <a
                            href={link.href}
                            className="block text-highlight font-semibold uppercase tracking-wide text-sm py-[10px] px-[20px] hover:bg-foreground hover:text-background"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
                <Select
                    onValueChange={handleLanguageChange}
                    value={selectedLanguage}
                >
                    <SelectTrigger className="w-fit text-highlight! h-[40px]! font-semibold! uppercase! tracking-wide! text-sm!">
                        <SelectValue>{selectedLanguage}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="h-[200px] w-[300px] flex flex-col wrap bg-black/40 backdrop-blur-sm py-4 border-t-[4px] -mt-[5px] px-0">
                        <div className="grid grid-cols-2 gap-2">
                            {languages.map((item) => (
                                <SelectItem
                                    key={item.code}
                                    value={item.code}
                                    className="relative w-full text-highlight focus:bg-transparent p-0!"
                                >
                                    <span className="absolute top-1/2 -left-1 w-[12px] h-[2px] bg-primary rounded-full transition-all duration-200 -translate-y-1/2" />
                                    <span className="text-sm text-highlight uppercase ml-[16px] hover:text-primary">
                                        {item.name}
                                    </span>
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
                <Button className="relative bg-border h-full px-[30px] py-2 angular-br-md">
                    {t("buttons.contact")}
                </Button>
            </ul>

            <nav className="flex items-end h-full w-full justify-between">
                <NavIcons classStyle="hidden lg:inline-flex items-center gap-8" />
                <Drawer direction="left">
                    <DrawerTrigger className="lg:hidden">
                        <Menu className="inline-flex w-8 h-8 text-muted-foreground hover:text-primary transition-all duration-200 active:scale-90 active:opacity-70 cursor-pointer" />
                    </DrawerTrigger>
                    <DrawerContent>
                        {navLinks.map((link) => (
                            <a
                                href={link.href}
                                key={link.href}
                                className="block text-highlight font-semibold uppercase tracking-wide text-sm py-[10px] px-[20px] hover:bg-foreground hover:text-background"
                            >
                                {link.name}
                            </a>
                        ))}
                        <DrawerFooter className="px-[40px]">
                            <NavIcons classStyle="flex items-center justify-between px-4 mb-6" />
                            <div className="relative flex flex-row gap-4 angular-tl-br-lg">
                                <TopLeft />
                                <Button className="flex-1 text-xs">{t("buttons.contactMe")}</Button>
                                <DrawerClose>
                                    <Button className="flex-1 text-xs" variant="secondary">
                                        {t("buttons.close")}
                                    </Button>
                                </DrawerClose>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

                {/* Mobile Language Switcher */}
                <div className="inline-flex lg:hidden">
                    <Select
                        onValueChange={handleLanguageChange}
                        value={selectedLanguage}
                    >
                        <SelectTrigger className="w-fit border-0 text-highlight! h-[40px]! font-semibold! uppercase! tracking-wide! text-sm!">
                            <SelectValue>{selectedLanguage}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="h-[200px] w-[300px] flex flex-col wrap bg-black/40 backdrop-blur-sm py-4 border-t-[4px] -mt-[5px] px-0">
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((item) => (
                                    <SelectItem
                                        key={item.code}
                                        value={item.code}
                                        className="relative w-full text-highlight focus:bg-transparent p-0!"
                                    >
                                        <span className="absolute top-1/2 -left-1 w-[12px] h-[2px] bg-primary rounded-full transition-all duration-200 -translate-y-1/2" />
                                        <span className="text-sm text-highlight uppercase ml-[16px] hover:text-primary">
                                            {item.name}
                                        </span>
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>
            </nav>
        </header>
    );
};

export default Header;
