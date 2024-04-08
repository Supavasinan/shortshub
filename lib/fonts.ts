import { GeistSans } from 'geist/font/sans';
import { Monomaniac_One } from "next/font/google";

const fontMonoOne = Monomaniac_One({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-mono",
    adjustFontFallback: false,
    display: 'swap',
})

const fontSans = GeistSans

fontSans.style.fontWeight = 300

export { fontMonoOne, fontSans };

