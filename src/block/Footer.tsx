import { ArrowBigDownDash, Github, Linkedin, Mail } from "lucide-react";
import TextEncoder from "./TextEncoder";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
    const t = await getTranslations("Footer");

    return (
        <footer className="relative w-full border-t border-primary/20 bg-background px-4 py-12 md:px-8">
            <div className="w-full mx-auto flex justify-between items-start text-sm text-muted-foreground">
                <div className="flex flex-col">
                    <p className="font-bold text-lg tracking-wide">
                        <TextEncoder text={`HUMBLEFOOL © ${new Date().getFullYear()}`} type="scambled" />
                    </p>
                    <p className="hidden md:inline-flex text-xs mt-2 italic max-w-lg">
                        {t("tagline")}
                    </p>

                </div>
                <div className="flex mt-2 space-x-4 text-primary">
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
