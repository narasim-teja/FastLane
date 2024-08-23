import { Inter, JetBrains_Mono, Kanit, Poppins } from "next/font/google";

/* -----------------------------------------------------------------------------------------------
 * Google Fonts
 * -----------------------------------------------------------------------------------------------*/

export const fontSans = Kanit({
  variable: "--font-sans",
  subsets: ["latin"],
  preload: true,
  weight: ["300", "400", "500", "600"],
});

export const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: true,
});

export const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: true,
});

export const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  preload: true,
  weight: ["600"],
});

/* -----------------------------------------------------------------------------------------------
 * Local Fonts
 * -----------------------------------------------------------------------------------------------*/

// export const fontCal = localFont({
//   src: "../public/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-cal",
//   preload: true,
//   display: "block",
//   weight: "600",
// });

// export const fontMatter = localFont({
//   src: [
//     { path: "../public/fonts/Matter-Regular.woff", weight: "400" },
//     { path: "../public/fonts/Matter-Medium.woff", weight: "500" },
//     { path: "../public/fonts/Matter-SemiBold.woff", weight: "600" },
//   ],
//   variable: "--font-matter",
//   preload: true,
//   display: "block",
// });

// export const fontVirgil = localFont({
//   src: "../public/fonts/Virgil.woff2",
//   variable: "--font-virgil",
//   preload: true,
//   display: "block",
// });

// ...
