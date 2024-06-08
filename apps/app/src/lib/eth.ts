import { ethers } from "ethers";

import abi from "~/lib/constants/spragu-abi.json";
import { env } from "./env";

async function ethContractSingleton() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(env.OASIS_CONTRACT_ADDRESS, abi, signer);

  return contract;
}

declare const globalThis: {
  ethContract: ReturnType<typeof ethContractSingleton>;
} & typeof global;

export const eth = globalThis.ethContract ?? (await ethContractSingleton());

if (env.DEV) globalThis.ethContract = eth;
