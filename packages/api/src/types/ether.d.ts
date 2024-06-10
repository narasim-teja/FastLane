declare module "ethers" {
  interface Contract {
    getRowCount(chainId: number): Promise<bigint>;
    getObstaclesInRow(chainId: number, rowIdx: number): Promise<bigint>;
  }
}

export {};
