import React from "react";

import { getSigner, getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi } from "~/config/constants";
import { env } from "~/lib/env";

export const useContract = () => {
  const [readContract, setReadContract] =
    React.useState<ethers.Contract | null>(null);
  const [writeContract, setWriteContract] =
    React.useState<ethers.Contract | null>(null);

  const { primaryWallet } = useDynamicContext();

  React.useEffect(() => {
    const init = async () => {
      if (primaryWallet) {
        try {
          const dynamicProvider = await getWeb3Provider(primaryWallet);
          const dynamicSigner = await getSigner(primaryWallet);

          // Wrap the provider and signer with the Sapphire wrappers
          const wrappedProvider = sapphire.wrap(dynamicProvider);
          const wrappedSigner = sapphire.wrap(dynamicSigner);

          // Initialize the read-only contract instance
          const readContractInstance = new ethers.Contract(
            env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
            abi,
            wrappedProvider
          );

          // Initialize the write contract instance with the wrapped signer
          const writeContractInstance = new ethers.Contract(
            env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
            abi,
            wrappedSigner
          );

          // Set the contract instances in state
          setReadContract(readContractInstance);
          setWriteContract(writeContractInstance);
        } catch (error) {
          console.error("Error initializing contracts:", error);
        }
      }
    };

    init();
  }, [primaryWallet]);

  return { writeContract, readContract } as const;
};
