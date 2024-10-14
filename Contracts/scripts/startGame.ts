import { ethers } from "hardhat";

import { env } from "../env";
import type { Fastlane } from "../typechain-types"; // Adjust the path if necessary

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  // Attach to the deployed Fastlane contract
  const FastlaneFactory = await ethers.getContractFactory("Fastlane");
  const fastlane = FastlaneFactory.attach(contractAddress) as Fastlane;

  // Get the signer (player)
  const [player] = await ethers.getSigners();

  // Parse the entry fee as Ether
  const entryFee = ethers.parseEther("1"); // entryFee is a BigInt
  // Call startGame with the value parameter in the overrides object
  const tx = await fastlane.connect(player).startGame({ value: entryFee });

  // Wait for the transaction to be mined
  await tx.wait();

  console.log("Game started for player:", player.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
