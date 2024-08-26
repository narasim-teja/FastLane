"use client";

import { usePathname } from "next/navigation";

import { ConnectButton } from "thirdweb/react";

import { thirdwebProps } from "~/lib/thirdweb/props";
import { cn } from "~/lib/utils";

type ConnectWalletProps = {
  from?: "navbar";
};

export function ConnectWallet({ from }: ConnectWalletProps) {
  const pathname = usePathname();

  if (pathname === "/signin" && from === "navbar") {
    return null;
  }

  return (
    <ConnectButton
      {...thirdwebProps}
      connectButton={{
        label: <span>Connect Wallet</span>,
        className: cn(
          "!rounded-full !bg-foreground !px-3 !py-0 !text-lg !font-normal !text-background !shadow-md !transition-colors hover:!bg-foreground/90"
        ),
      }}
      signInButton={{
        className: cn(
          "!rounded-full !bg-foreground !px-3 !py-0 !text-lg !font-normal !text-background !shadow-md !transition-colors hover:!bg-foreground/90"
        ),
      }}
      detailsButton={{
        className: cn(
          "!rounded-full !border-none !bg-foreground !px-3 !py-0 !text-lg !font-normal !text-background *:!border-none"
        ),
      }}
    />
  );
}
