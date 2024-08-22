"use client";

import { usePathname } from "next/navigation";

import { ConnectButton } from "thirdweb/react";

import { thirdwebProps } from "~/lib/thirdweb/props";

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
        className:
          "!px-3 !py-0 !text-lg !font-normal !bg-foreground !text-background !rounded-full",
      }}
      signInButton={{
        className:
          "!px-3 !py-0 !text-lg !font-normal !bg-foreground !text-background !rounded-full",
      }}
      detailsButton={{
        className:
          "!px-3 !py-0 !text-lg !font-normal !bg-foreground !text-background !rounded-full !border-none",
      }}
    />
  );
}
