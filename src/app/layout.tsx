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
      <head>
        <link type="image/png" sizes="32x32" rel="icon" href="https://img.icons8.com/stencil/32/briefcase.png" />
      </head>
      <Box component={'body'} className={`${firaCode.className} ${sourceCodePro.className} ${pacifico.className} container`} >
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <Box sx={{
            width: '100%',
            backgroundColor: '#000000'
          }}>
            <Header />
            <Box component={'main'} sx={{
              mt: '60px',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'hidden',
              scrollbarGutter: 'stable',
              '&:hover': {
                overflowY: 'auto',
              },
              zIndex: 1,
              p: '20px 80px 20px 80px',
              mb: 2,
              background: 'radial-gradient(circle, #1a0324 0%, #000000 100%)',
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
