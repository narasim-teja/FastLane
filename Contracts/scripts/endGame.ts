import { ethers } from "hardhat";

import { env } from "../env";
import type { Fastlane } from "../typechain-types"; // Adjust the path if necessary

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  const Fastlane = await ethers.getContractFactory("Fastlane");
  const fastlane = Fastlane.attach(contractAddress) as Fastlane;

  const [player] = await ethers.getSigners();

  const tx = await fastlane.connect(player).endGame();
  await tx.wait();

  console.log("Game ended for player:", player.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
