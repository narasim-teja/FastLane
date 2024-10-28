/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

declare module "ethers" {
  interface Contract {
    addSegment(obstacleIds: number[]): Promise<void>;
  }
}

export {};
