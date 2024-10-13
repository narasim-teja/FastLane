"use client";

import React from "react";

import { WagmiProvider } from "wagmi";

import { config } from "./wagmi";

export default function Wagmi({ children }: React.PropsWithChildren) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
