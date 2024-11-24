import { ethers } from "hardhat";

import type { Fastlane } from "../typechain-types"; // Adjust the path if necessary

import { env } from "../env";

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  const Fastlane = await ethers.getContractFactory("Fastlane");
  const fastlane = Fastlane.attach(contractAddress) as Fastlane;

  const [player] = await ethers.getSigners();

  const chainId = 23295;
  const rowIndex = 0;

  const obstacles = await fastlane
    .connect(player)
    .getObstaclesInRow(chainId, rowIndex);

  const obstacleNumbers = obstacles.map((o: bigint) => Number(o));

  console.log("Obstacles in row", rowIndex, ":", obstacleNumbers);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
