import "~/app/globals.css";

import Script from "next/script";

import type { Metadata, Viewport } from "next";

import { ReactLenis } from "~/components/lenis";
import { DynamicProvider } from "~/components/providers/dynamic-provider";
import { Web3Provider } from "~/components/providers/web3-provider";
import { RealViewport } from "~/components/real-viewport";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { siteConfig } from "~/config/site";
import { env } from "~/lib/env";
import * as fonts from "~/lib/fonts";
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

export const RootLayout: React.FCC = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          Object.values(fonts).map((font) => font.variable),
          "relative min-h-[dvh] scroll-smooth font-sans antialiased"
        )}
      >
        <ReactLenis>
          <DynamicProvider>
            <Web3Provider>
              <TooltipProvider>{children}</TooltipProvider>
            </Web3Provider>
          </DynamicProvider>
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
};

export default RootLayout;
