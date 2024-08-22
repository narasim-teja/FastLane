"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { DiscordIcon, InstagramIcon, LinkedInIcon, XIcon } from "../icons";

const excludePaths = ["/signin", "/tracks"];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "px-10 pb-10 lg:mx-auto lg:w-[70vw] lg:px-0",
        excludePaths.includes(pathname) && "hidden"
      )}
    >
      <Image
        loading="eager"
        src="/footer-gradient.png"
        alt={`Footer gradient for ${siteConfig.name}`}
        height={1200}
        width={1200}
        className="absolute inset-x-0 bottom-0 -z-10"
      />

      <div className="overflow-hidden rounded-3xl border border-white/20 backdrop-blur">
        <div className="h-px bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0)_0%,_#05D7DA_52.61%,_rgba(0,_0,_0,_0)_100%)]" />

        <div className="flex flex-col items-center justify-center gap-8 bg-[url(/noise.png)] bg-cover bg-repeat-x px-12 py-8 md:flex-row">
          <div className="flex w-full flex-col items-center space-y-4 md:items-start">
            <Image
              loading="eager"
              src="/logo-lg.png"
              alt={`Logo for ${siteConfig.name}`}
              height={160}
              width={240}
              className="h-20 max-h-24 w-fit"
            />
            <p className="text-start font-poppins text-sm text-[#a4a4a4]">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>

          {/* <div className="font-kanit flex w-full items-center justify-center gap-8 text-xl font-light *:text-[#a4a4a4]">
            <Link href="/pricing">Pricings</Link>
            <Link href="/about-us">About us</Link>
            <Link href="/our-team">Our team</Link>
          </div> */}

          <div className="z-0 w-full">
            <div className="relative mx-auto aspect-square size-fit overflow-hidden rounded-xl border p-px md:mx-0 md:ml-auto">
              <div className="absolute inset-0 right-px -z-10 bg-gradient-to-r from-[#014D81] to-zinc-900" />

              <div className="z-10 grid grid-cols-2 gap-5 rounded-xl bg-zinc-900 p-5 *:size-8 *:fill-white">
                <a
                  href={siteConfig.links.discord}
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordIcon />
                </a>

                <a
                  href={siteConfig.links.x}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>

                <a
                  href={siteConfig.links.x}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>

                <a
                  href={siteConfig.links.x}
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
