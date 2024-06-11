import React from "react";

import { ethers } from "ethers";

import abi from "~/lib/constants/spragu-abi.json";
import { env } from "~/lib/env";

export const useContract = () => {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);

  React.useEffect(() => {
    if (contract) {
      return;
    }

    void (async () => {
      {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          env.VITE_OASIS_CONTRACT_ADDRESS,
          abi,
          signer,
        );

        setContract(contract);
      }
    })();
  }, [contract]);

  return contract;
};
