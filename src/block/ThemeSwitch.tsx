"use client"
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming you use cn() from shadcn setup

const ThemeSwitch = () => {
    const { setTheme, theme } = useTheme();

    return (
        <div className="inline-flex gap-1 items-center justify-center rounded-xl bg-muted/20 p-1 shadow-inner backdrop-blur-sm">
            {/* Light Button */}
            <button
                className={cn(
                    "p-3 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 ring-offset-2",
                    theme === "light"
                        ? "bg-primary text-primary-foreground shadow-[0_0_0.5rem_theme(colors.primary)] ring-primary"
                        : "text-muted-foreground hover:bg-muted"
                )}
                aria-label="Switch to light theme"
                onClick={() => setTheme("light")}
            >
                <Sun className="w-5 h-5" />
            </button>

            {/* Dark Button */}
            <button
                className={cn(
                    "p-3 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 ring-offset-2",
                    theme === "dark"
                        ? "bg-secondary text-secondary-foreground shadow-[0_0_0.5rem_theme(colors.secondary)] ring-secondary"
                        : "text-muted-foreground hover:bg-muted"
                )}
                aria-label="Switch to dark theme"
                onClick={() => setTheme("dark")}
            >
                <Moon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ThemeSwitch;
