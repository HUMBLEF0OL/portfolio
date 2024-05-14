import { BackgroundColor, TextColor } from "@/interfaces/colorInterfaces";
import { createTheme } from "@mui/material/styles";
import {
    TXT_COL_PRI,
    TXT_COL_SEC,
    TXT_COL_HIGH,
    BACKGROUND_PRI,
    BACKGROUND_SEC
} from '../constants/colorConstants';
import { Fira_Code, Oxanium, Pacifico, Source_Code_Pro, Ubuntu_Mono } from "next/font/google";

declare module '@mui/material/styles' {
    interface TypeBackground extends BackgroundColor { }

    interface TypeText extends TextColor { }
    // interface TypeText {
    //     highlight: string
    // }
};


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

const oxanium = Oxanium({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

const ubuntuSans = Ubuntu_Mono({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

export const theme = createTheme({
    palette: {
        text: {
            primary: TXT_COL_PRI, // beige-sort
            secondary: TXT_COL_SEC, // dusted-blue
            highlight: TXT_COL_HIGH, //kind of gray
        },
        background: {
            primary: BACKGROUND_PRI, // black
            secondary: BACKGROUND_SEC // light-black
        }
    },
    typography: {
        fontSize: 1, // 1rem (16px)
        fontFamily: ubuntuSans.style.fontFamily,
        // fontFamily: firaCode.style.fontFamily,
        // fontFamily: sourceCodePro.style.fontFamily,

        h1: {
            fontSize: '2rem', // 2rem (32px)
        },
        h2: {
            fontSize: '1.5rem', // 1.5rem (24px)
        },
        h3: {
            fontSize: '1.25rem', // 1.25rem (20px)
        },
        h4: {
            fontSize: '1.125rem', // 1.125rem (18px)
        },
        h5: {
            fontSize: '1rem', // 1rem (16px)
        },
        h6: {
            fontSize: '0.875rem', // 0.875rem (14px)
        },
        subtitle1: {
            fontSize: '1rem', // 1rem (16px)
        },
        subtitle2: {
            fontSize: '0.875rem', // 0.875rem (14px)
        },
        body1: {
            fontSize: '0.75rem', // 0.75rem (12px)
        },
        body2: {
            fontSize: '0.625rem', // 0.625rem (10px)
        },
        button: {
            fontSize: '0.875rem', // 0.875rem (14px)
        },
        caption: {
            fontSize: '0.75rem', // 0.75rem (12px)
        },
        overline: {
            fontSize: '0.75rem', // 0.75rem (12px)
        },
    }
});