"use client";

import React from "react";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

import { env } from "~/lib/env";

export const DynamicProvider: React.FCC = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
        events: {
          // onAuthSuccess: ({ isAuthenticated }) => {
          //   if (isAuthenticated) {
          //     const token = localStorage.getItem(
          //       "dynamic_authentication_token"
          //     );
          //     if (token) {
          //       document.cookie = `dynamic_authentication_token=${token.replace(/"/g, "")}; path=/`;
          //     }
          //   }
          // },
          onLogout: (args) => {
            // localStorage.removeItem("dynamic_authentication_token");
            // document.cookie =
            //   "dynamic_authentication_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("auth");
            window.location.reload();
            console.log("onLogout was called", args);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

const evmNetworks = [
  {
    blockExplorerUrls: ["http://localhost:8545"],
    chainId: 31337,
    chainName: "Anvil Local",
    iconUrls: ["../images/eth-coin.png"],
    name: "Anvil Local",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    networkId: 31337,
    rpcUrls: ["http://localhost:8545"],
  },
  {
    blockExplorerUrls: ["https://testnet.explorer.sapphire.oasis.dev"],
    chainId: 23295, // 23295 in decimal, 0x5B4F in hex
    chainName: "Oasis Sapphire Testnet",
    iconUrls: ["../images/oasis_logo.png"],
    name: "Oasis Sapphire Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "ROSE",
      symbol: "TEST",
    },
    networkId: 23295,
    rpcUrls: ["https://testnet.sapphire.oasis.dev"],
    vanityName: "Oasis Sapphire Testnet",
  },
];
