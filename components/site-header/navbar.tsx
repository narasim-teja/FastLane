import React from "react";
import Link from "next/link";

import { Gamepad, Menu, Store, Wallet } from "lucide-react";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Header } from "./header";

const navLinks: { label: string; href: string }[] = [
  // ...
];

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

        <nav className="flex w-full items-center justify-center gap-4">
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
        </nav>

        <div className="hidden w-full items-center justify-end gap-2 md:flex">
          <Button
            variant="outline"
            className="h-[54px] rounded-4xl border-2 px-8 py-4 text-lg font-semibold uppercase shadow transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:[box-shadow:_2px_4px_0_#000] active:translate-y-0 active:shadow-none"
          >
            <Wallet className="mr-2" />
            Connect Wallet
          </Button>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={`${siteConfig.url}/marketplace`}
                className={cn(
                  buttonVariants(),
                  "h-[54px] rounded-4xl p-4 text-lg font-semibold uppercase transition-all duration-200 ease-in-out hover:rounded-2xl"
                )}
              >
                <Store strokeWidth={1.5} />
              </Link>
            </TooltipTrigger>

            <TooltipContent side="right">Marketplace</TooltipContent>
          </Tooltip>
        </div>

        <div className="md:hidden">
          <Button size="icon" variant="ghost">
            <Menu className="size-6" />
          </Button>
        </div>
      </div>
    </Header>
  );
}
