import Link from "next/link";

import { Gamepad, Menu } from "lucide-react";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { ConnectWallet } from "../connect-wallet";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { navLinks } from "./nav-links";

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="shrink-0 md:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent showClose={false} className="flex flex-col">
        <SheetHeader className="space-y-0.5 text-start">
          <SheetTitle className="flex items-center gap-2 font-cal lowercase tracking-wider">
            <Gamepad className="inline-flex size-6" />
            <span>{siteConfig.name}</span>
          </SheetTitle>

          <SheetDescription>{siteConfig.description}</SheetDescription>
        </SheetHeader>

        <Separator />

        <nav className="flex flex-col items-center gap-2">
          {navLinks.map(({ label, href, icon: Icon }, i) => (
            <Link
              key={`${i}-${label}`}
              href={href}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex w-full items-center justify-start gap-2 font-medium"
              )}
            >
              <Icon strokeWidth={1.5} className="size-5" /> {label}
            </Link>
          ))}
        </nav>

        <ConnectWallet className="mt-auto flex w-full max-w-none rounded-none border-0 border-t" />
      </SheetContent>
    </Sheet>
  );
}
