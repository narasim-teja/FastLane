import { ethers } from "hardhat";

import type { TempleRunObstacle } from "../typechain-types"; // Adjusted the import

import { env } from "../env";

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  // Attach to the deployed TempleRunObstacle contract
  const TempleRunObstacleFactory = await ethers.getContractFactory("Fastlane");
  const templeRunObstacle = TempleRunObstacleFactory.attach(
    contractAddress
  ) as TempleRunObstacle;

  // Get the signer (owner)
  const [owner] = await ethers.getSigners();

  // New entry fee in wei (e.g., 0.5 ETH)
  const newEntryFee = ethers.parseEther("0.1");

  // Update the entry fee
  const tx = await templeRunObstacle.connect(owner).setEntryFee(newEntryFee);

  // Wait for the transaction to be mined
  await tx.wait();

  console.log(`Entry fee updated to ${ethers.formatEther(newEntryFee)} ETH`);

  // Verify the new entry fee
  const updatedEntryFee = await templeRunObstacle.ENTRY_FEE();
  console.log(
    `Verified new entry fee: ${ethers.formatEther(updatedEntryFee)} ETH`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
