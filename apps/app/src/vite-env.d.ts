/// <reference types="vite/client" />

import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

declare module "ethers" {
  interface Contract {
    addSegment(chainId: number, obstacleIds: number[]): Promise<void>;
  }
}

export {};
