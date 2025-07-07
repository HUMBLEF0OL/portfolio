"use client"
import { CpuIcon, Monitor, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <div className="fixed bottom-4 right-1/2 z-50 translate-x-1/2">
            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={cn(
                    "group relative overflow-hidden rounded-full p-2 opacity-40",
                    "bg-background/80 backdrop-blur-sm border border-border/50",
                    "shadow-lg shadow-black/5 dark:shadow-black/20",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-background hover:border-border",
                    "hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30",
                    "hover:scale-105 active:scale-95 hover:opacity-100",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                {/* Background glow effect */}
                <div className={cn(
                    "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100",
                    isDark
                        ? "bg-gradient-to-br from-primary/20 to-blue-500/20"
                        : "bg-gradient-to-br from-primary/20 to-yellow-500/20"
                )} />

                {/* Cyberpunk border glow */}
                <div className={cn(
                    "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100",

                )} />

                {/* Icon container */}
                <div className="relative flex items-center justify-center w-5 h-5">
                    {/* Monitor icon (Light theme) */}
                    <CpuIcon className={cn(
                        "absolute w-5 h-5 text-primary transition-all duration-500",
                        "transform-gpu drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]",
                        isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                    )} />

                    {/* Zap icon (Dark theme) */}
                    <Zap className={cn(
                        "absolute w-5 h-5 text-primary transition-all duration-500",
                        "transform-gpu drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]",
                        isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                    )} />
                </div>
            </button>
        </div>
    );
};

export default ThemeSwitch;