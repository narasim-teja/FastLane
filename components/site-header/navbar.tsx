import { TrafficCone } from "lucide-react";

import { ConnectWallet } from "../connect-wallet";
import { Logo, LogoSM } from "../icons";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Navbar() {
  return (
    <header className="absolute top-4 z-40 w-full">
      <nav className="container relative flex w-full items-center justify-between pl-7 pr-2 md:px-8 md:py-4">
        <Button
          href="/"
          size="custom"
          variant="custom"
          className="w-fit md:hidden"
        >
          <LogoSM className="h-7 w-fit" />
        </Button>

        <Button
          href="/"
          size="custom"
          variant="custom"
          className="hidden md:block"
        >
          <Logo className="h-[38px] w-[72px] scale-125" />
        </Button>

        <div className="flex items-center gap-4">
          <ConnectWallet from="navbar" />

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                href="/tracks"
                size="icon"
                className="size-[3.25rem] rounded-full"
              >
                <TrafficCone strokeWidth={1.5} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Tracks</TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </header>
  );
}
