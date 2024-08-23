import "~/app/globals.css";

import React from "react";
import Script from "next/script";

import { ThirdwebProvider } from "thirdweb/react";

import type { Metadata, Viewport } from "next";

import { RealViewport } from "~/components/real-viewport";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { siteConfig } from "~/config/site";
import { env } from "~/lib/env";
import * as fonts from "~/lib/fonts";
import { ReactLenis } from "~/lib/lenis";
import { absoluteUrl, cn } from "~/lib/utils";

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  metadataBase: new URL(absoluteUrl("/")),
};
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          Object.values(fonts).map((font) => font.variable),
          "relative min-h-[dvh] scroll-smooth font-sans antialiased"
        )}
      >
        <ReactLenis root>
          <ThirdwebProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThirdwebProvider>
        </ReactLenis>

        <Toaster />
        <RealViewport />
        <TailwindIndicator />
      </body>

      {/* Umami Analytics */}
      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id={env.UMAMI_WEBSITE_ID}
      />
    </html>
  );
}
