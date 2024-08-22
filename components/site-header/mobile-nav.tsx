import { Gamepad, Menu } from "lucide-react";

import { siteConfig } from "~/config/site";

import { ConnectWallet } from "../connect-wallet";
import { Button } from "../ui/button";
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
          <SheetTitle className="font-cal flex items-center gap-2 lowercase tracking-wider">
            <Gamepad className="inline-flex size-6" />
            <span>{siteConfig.name}</span>
          </SheetTitle>

          <SheetDescription>{siteConfig.description}</SheetDescription>
        </SheetHeader>

        <Separator />

        <nav className="flex flex-col items-center gap-2">
          {navLinks.map(({ label, href, icon: Icon }, i) => (
            <Button
              key={`${i}-${label}`}
              href={href}
              block
              variant="secondary"
              className="justify-start gap-2 font-medium"
            >
              <Icon strokeWidth={1.5} className="size-5" /> {label}
            </Button>
          ))}
        </nav>

        <ConnectWallet className="mt-auto flex w-full max-w-none rounded-none border-0 border-t" />
      </SheetContent>
    </Sheet>
  );
}
