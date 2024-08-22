import Image from "next/image";

import { siteConfig } from "~/config/site";

import { ConnectWallet } from "../connect-wallet";

export function Navbar() {
  return (
    <header className="absolute top-4 z-40 w-full">
      <nav className="container relative flex w-full items-center justify-between pl-7 pr-2 md:px-2 md:py-4">
        <Image
          src="/logo-sm.png"
          alt={`${siteConfig.name} logo`}
          height={15}
          width={26}
          className="h-7 w-fit md:hidden"
        />

        <Image
          src="/logo.png"
          alt={`${siteConfig.name} logo`}
          height={200}
          width={360}
          className="hidden h-[38px] w-fit scale-110 md:block"
        />

        <ConnectWallet from="navbar" />
      </nav>
    </header>
  );
}
