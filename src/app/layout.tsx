import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/block/Header";
import Footer from "@/block/Footer";
import ThemeSwitch from "@/block/ThemeSwitch";
import { Black_Ops_One, Chakra_Petch, Orbitron, Oxanium, Syne } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400"],
})

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "HUMBLEF0OL // Digital Interface Architect",
  description:
    "Step into the Grid — the digital frontier of Amit Rana aka HUMBLEF0OL. Explore cybernetic UIs, modular code, and imaginative systems crafted at the edge of identity and interaction. React, Tailwind, Next.js, shaders, state machines, and glitch-crafted experiences await.",
  keywords: [
    "Amit Rana",
    "HUMBLEF0OL",
    "Frontend Developer Portfolio",
    "Cyberpunk Developer",
    "Next.js Portfolio",
    "React Developer",
    "Tailwind CSS",
    "Creative Developer",
    "Web Interface Architect",
    "Glitch Art UI",
    "Modular Frontend Systems",
    "Digital Grid"
  ],
  authors: [{ name: "Amit Rana", url: "https://humblefool.vercel.app/" }],
  creator: "Amit Rana",
  themeColor: "#00ffe0",
  viewport: "width=device-width, initial-scale=1.0",
  metadataBase: new URL("https://humblefool.vercel.app/"),
  openGraph: {
    title: "HUMBLEF0OL // Digital Interface Architect",
    description:
      "Amit Rana (HUMBLEF0OL) crafts futuristic web experiences using React, Tailwind, and Next.js. Dive into his glitch-touched, pixel-perfect world of code and creativity.",
    url: "https://humblefool.vercel.app/",
    siteName: "HUMBLEF0OL",
    images: [
      {
        url: "https://humblefool.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "HUMBLEF0OL Portfolio"
      }
    ],
    locale: "en",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "HUMBLEF0OL // Web Interface Engineer",
    description:
      "Enter the digital playground of Amit Rana — where code pulses with emotion and design meets data.",
    images: ["https://humblefool.vercel.app/og-image.png"],
    creator: "@HUMBLEFOOL"
  }
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;


  return (
    <html lang={locale} suppressHydrationWarning className={`${chakra.variable} ${oxanium.variable}`}>
      <body
        className={`font-body antialiased max-w-[1920px] mx-auto bg-background text-foreground overflow-x-hidden no-scrollbar overflow-y-auto`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="light"
            enableSystem
          >
            {children}
            <ThemeSwitch />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html >
  );
}
