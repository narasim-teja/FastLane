import React from "react";
import Link from "next/link";

import { Gamepad } from "lucide-react";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { ConnectWallet } from "../connect-wallet";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Header } from "./header";
import { MobileNavbar } from "./mobile-nav";
import { navLinks } from "./nav-links";

export function Navbar() {
  return (
    <Header>
      <div className="relative flex w-full items-center justify-between rounded-full py-2">
        <div className="flex w-full items-center gap-2">
          <Gamepad className="size-6" />

          <Link href="/" className="font-cal text-xl sm:text-2xl md:text-3xl">
            <span>{siteConfig.url.replace(/https:\/\/(www).?/, "")}</span>
          </Link>
          <Badge className="hidden text-xs md:block">WIP</Badge>
        </div>

        {/* <nav className="hidden w-full items-center justify-center gap-4 md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="group font-cal lowercase tracking-wider"
            >
              <span>{label}</span>
              <div className="h-px w-0 bg-foreground transition-[width] duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav> */}

        <nav className="hidden w-full items-center justify-end gap-2 md:flex">
          <ConnectWallet from="navbar" />

          {navLinks.slice(0, 1).map(({ label, href, icon: Icon }, i) => (
            <Tooltip key={`${i}-${label}`} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  aria-label={label}
                  className={cn(
                    buttonVariants(),
                    "h-[54px] rounded-4xl p-4 text-lg font-semibold uppercase transition-all duration-200 ease-in-out hover:rounded-2xl"
                  )}
                >
                  <Icon strokeWidth={1.5} />
                </Link>
              </TooltipTrigger>

              <TooltipContent side="right" className="text-base">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <MobileNavbar />
      </div>
    </Header>
  );
}
