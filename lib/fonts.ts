import localFont from "next/font/local";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

/* -----------------------------------------------------------------------------------------------
 * Geist Fonts (https://vercel.com/font / https://www.npmjs.com/package/geist)
 * -----------------------------------------------------------------------------------------------*/

export const fontSans = GeistSans;

export const fontMono = GeistMono;

/* -----------------------------------------------------------------------------------------------
 * Google Fonts
 * -----------------------------------------------------------------------------------------------*/

// ...

/* -----------------------------------------------------------------------------------------------
 * Local Fonts
 * -----------------------------------------------------------------------------------------------*/

export const fontCal = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "block",
  weight: "600",
});

export const fontMatter = localFont({
  src: [
    { path: "../public/fonts/Matter-Regular.woff", weight: "400" },
    { path: "../public/fonts/Matter-Medium.woff", weight: "500" },
    { path: "../public/fonts/Matter-SemiBold.woff", weight: "600" },
  ],
  variable: "--font-matter",
  preload: true,
  display: "block",
});

export const fontVirgil = localFont({
  src: "../public/fonts/Virgil.woff2",
  variable: "--font-virgil",
  preload: true,
  display: "block",
});

// ...
