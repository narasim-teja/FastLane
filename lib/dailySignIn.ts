import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi, CHAIN_ID } from "~/config/constants";
import { env } from "~/lib/env";

const DOMAIN_NAME = "SignInExample.SignIn";
const DOMAIN_VERSION = "1";
const SIGNIN_TYPE = "SignIn(address user,uint32 time)";

export async function dailySignIn(signer: ethers.Signer) {
  const provider = sapphire.wrap(new ethers.BrowserProvider(window.ethereum));
  const contract = new ethers.Contract(
    env.OASIS_CONTRACT_ADDRESS,
    abi,
    provider
  );

  const time = Math.floor(Date.now() / 1000);
  const user = await signer.getAddress();

  const domain = {
    name: DOMAIN_NAME,
    version: DOMAIN_VERSION,
    chainId: CHAIN_ID,
    verifyingContract: env.OASIS_CONTRACT_ADDRESS,
  };

  const types = {
    SignIn: [
      { name: "user", type: "address" },
      { name: "time", type: "uint32" },
    ],
  };

  const value = {
    user,
    time,
  };

  try {
    const signature = await signer.signTypedData(domain, types, value);
    const rsv = ethers.Signature.from(signature);
    const auth = { user, time, rsv };

    return auth;
  } catch (error) {
    console.error("Error during daily sign-in:", error);
    throw error;
  }
}
