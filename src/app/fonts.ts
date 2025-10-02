// app/fonts.ts
import { Outfit, Poppins, Roboto, Open_Sans, Montserrat } from 'next/font/google';

export const outfit     = Outfit({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-outfit' });
export const poppins    = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-poppins' });
export const roboto     = Roboto({ subsets: ['latin'],  weight: ['400','500','700'],       variable: '--font-roboto' });
export const openSans   = Open_Sans({ subsets: ['latin'], weight: ['400','600','700'],     variable: '--font-open-sans' });
export const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','600','700'],    variable: '--font-montserrat' });
