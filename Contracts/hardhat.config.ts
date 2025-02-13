import type { HardhatUserConfig } from "hardhat/config";

// import "@oasisprotocol/sapphire-hardhat";
import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox";

import { env } from "./env";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    "sapphire-testnet": {
      url: "https://testnet.sapphire.oasis.io",
      accounts: env.PRIVATE_KEY ? [env.PRIVATE_KEY] : [],
      chainId: 0x5aff,
    },
  },
};

export default config;
