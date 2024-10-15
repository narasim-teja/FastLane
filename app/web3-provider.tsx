import React from "react";

import { getSigner, getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi } from "~/config/constants";
import { env } from "~/lib/env";

const Web3Context = React.createContext<{
  isLoaded: boolean;
  provider: ethers.Provider | null;
  signer: ethers.Signer | null;
  readContract: ethers.Contract | null;
  writeContract: ethers.Contract | null;
}>({
  isLoaded: false,
  provider: null,
  signer: null,
  readContract: null,
  writeContract: null,
});

export const useWeb3 = () => React.useContext(Web3Context);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { primaryWallet } = useDynamicContext();

  const [provider, setProvider] = React.useState<ethers.Provider | null>(null);
  const [signer, setSigner] = React.useState<ethers.Signer | null>(null);
  const [readContract, setReadContract] =
    React.useState<ethers.Contract | null>(null);
  const [writeContract, setWriteContract] =
    React.useState<ethers.Contract | null>(null);
  const [isLoaded, setLoaded] = React.useState(false);
  const isInitiating = React.useRef(false);

  async function init() {
    if (isInitiating.current || !primaryWallet) return;
    isInitiating.current = true;
    try {
      const dynamicProvider = await getWeb3Provider(primaryWallet);
      const dynamicSigner = await getSigner(primaryWallet);

      const wrappedProvider = sapphire.wrap(dynamicProvider);
      const wrappedSigner = sapphire.wrap(dynamicSigner);

      const readContractInstance = new ethers.Contract(
        env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
        abi,
        wrappedProvider
      );

      const writeContractInstance = new ethers.Contract(
        env.NEXT_PUBLIC_OASIS_CONTRACT_ADDRESS,
        abi,
        wrappedSigner
      );

      setProvider(wrappedProvider);
      setSigner(wrappedSigner);
      setReadContract(readContractInstance);
      setWriteContract(writeContractInstance);
      setLoaded(true);
    } catch (e) {
      console.error("Error initializing web3 provider", e);
      setLoaded(false);
    } finally {
      isInitiating.current = false;
    }
  }

  React.useEffect(() => {
    if (primaryWallet) {
      init();
    }
  }, [primaryWallet]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        readContract,
        writeContract,
        isLoaded,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
