import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { Fira_Code, Pacifico, Source_Code_Pro } from "next/font/google";
import ThemeRegistry from "@/theme/themeRegistry";

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable'
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable'
})

const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box component={'body'} className={`${firaCode.className} ${sourceCodePro.className} ${pacifico.className} container`} >
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <Box sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header />
            <Box component={'main'} sx={{
              mt: '60px',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'hidden',
              scrollbarGutter: 'stable',
              '&:hover': {
                overflowY: 'auto',
              },
              zIndex: 1,
              backgroundColor: 'background.primary'
            }}>
              {children}


            </Box>
            <Box component={'footer'}
              sx={{
                bottom: 0,
                left: 0,
              }}>
              <Footer />
            </Box>



          </Box>
        </ThemeRegistry>
      </Box>
    </html >
  );
}
