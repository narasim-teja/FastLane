"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Wallet } from "lucide-react";
import { ConnectButton } from "thirdweb/react";

import { thirdwebProps } from "~/lib/thirdweb/props";
import { cn } from "~/lib/utils";

type ConnectWalletProps = React.ComponentProps<"div"> & {
  from?: "navbar";
};

export function ConnectWallet(props: ConnectWalletProps) {
  const { className, from, ...rest } = props;

  const pathname = usePathname();

  if (pathname === "/signin" && from === "navbar") {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-[54px] max-w-fit items-center justify-center overflow-hidden rounded-4xl border-2 uppercase transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:[box-shadow:_2px_4px_0_#000] active:translate-y-0",
        className
      )}
      {...rest}
    >
      <ConnectButton
        {...thirdwebProps}
        connectButton={{
          label: (
            <span>
              <Wallet className="mr-2 inline-flex" />
              Connect Wallet
            </span>
          ),
          className:
            "!min-w-[260px] !bg-background !px-8 !py-4 !text-lg !font-semibold !text-foreground",
        }}
        signInButton={{
          className:
            "!min-w-[205px] !border-none !bg-background !px-8 !py-4 !text-lg !font-semibold !text-foreground",
        }}
        detailsButton={{
          className:
            "!min-w-[205px] !border-none !bg-background !px-8 !py-4 !text-lg !font-semibold !text-foreground",
        }}
      />
    </div>
  );
}
