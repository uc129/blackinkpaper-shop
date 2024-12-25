import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./navabr";
import { AuthProvider } from "./auth/auth-context";
import { StoreProvider } from "./lib/data-store/store";
import localFont from 'next/font/local'
import { ScrollProvider } from "./lib/utils/scrollObserver";

import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import { WindowProvider } from "./lib/utils/windowContext";



export const metadata: Metadata = {
  title: "Blackinkpaper Shop",
  description: "Shop line art prints and more",
};



export const tofino = localFont({
  variable: '--tofino',
  src: [
    {
      path: '/fonts/Tolino/Tofino-BlackPersonal.otf',
      style: 'normal',
      weight: '900'
    },
    {
      path: '/fonts/Tolino/Tofino-BoldPersonal.otf',
      style: 'normal',
      weight: '700'
    },

    {
      path: '/fonts/Tolino/Tofino-MediumPersonal.otf',
      style: 'normal',
      weight: '500'
    },
    {
      path: '/fonts/Tolino/Tofino-RegularPersonal.otf',
      style: 'normal',
      weight: '400'
    },
    {
      path: '/fonts/Tolino/Tofino-LightPersonal.otf',
      style: 'normal',
      weight: '300'
    },
    {
      path: '/fonts/Tolino/Tofino-ThinPersonal.otf',
      style: 'normal',
      weight: '100'
    },


  ],
})

const ibm = IBM_Plex_Sans({
  weight: '400',
  display: 'swap',
  preload: true,
  subsets: ['latin', 'cyrillic-ext'],
  style: 'normal',
  variable: '--ibm-plex-sans',
})

const ibmCondensed = IBM_Plex_Sans_Condensed({
  weight: '700',
  display: 'swap',
  preload: true,
  subsets: ['latin', 'cyrillic-ext'],
  style: 'normal',
  variable: '--ibm-plex-sans-condensed',
})





export default function RootLayout(props: { children: React.ReactNode, }) {
  return (
    <html lang="en">
      <body className={`${ibm.className} ${ibmCondensed.variable} ${tofino.variable}  
      font-normal antialiased overflow-visible *:overflow-visible grid grid-cols-1 gap-2 `} >
        {/* <StrictMode> */}
        <AuthProvider>
          <WindowProvider>
            <ScrollProvider >
              <StoreProvider>
                <Navbar />
                <Toaster />
                <main className=" overflow-hidden">
                  {props.children}
                </main>
              </StoreProvider>
            </ScrollProvider>
          </WindowProvider>
        </AuthProvider>
        {/* </StrictMode> */}
      </body>
    </html>
  );
}
