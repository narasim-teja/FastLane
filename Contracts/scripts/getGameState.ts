import { ethers } from "hardhat";

import { env } from "../env";
import type { Fastlane } from "../typechain-types"; // Adjust the path if necessary

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  const Fastlane = await ethers.getContractFactory("Fastlane");
  const fastlane = Fastlane.attach(contractAddress) as Fastlane;

  const [player] = await ethers.getSigners();

  const gameState = await fastlane.getGameState(player.address);

  const isActive = gameState[0];
  const timeRemaining = Number(gameState[1]);
  const winnings = ethers.formatEther(gameState[2]);

  console.log("Game State for player:", player.address);
  console.log("Is Active:", isActive);
  console.log("Time Remaining:", timeRemaining, "seconds");
  console.log("Winnings:", winnings, "$ROSE");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
