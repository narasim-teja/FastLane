import { ethers } from "hardhat";

import type { Fastlane } from "../typechain-types";

import { env } from "../env";

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  // Attach to the deployed Fastlane contract
  const FastlaneFactory = await ethers.getContractFactory("Fastlane");
  const fastlane = FastlaneFactory.attach(contractAddress) as Fastlane;

  // Get the signer (owner)
  const [owner] = await ethers.getSigners();

  // New session duration in seconds (e.g., 1 hour)
  const newSessionDuration = 600; // 1 hour in seconds

  // Update the session duration
  const tx = await fastlane
    .connect(owner)
    .setSessionDuration(newSessionDuration);

  // Wait for the transaction to be mined
  await tx.wait();

  console.log(`Session duration updated to ${newSessionDuration} seconds`);

  // Verify the new session duration
  const updatedSessionDuration = await fastlane.SESSION_DURATION();
  console.log(
    `Verified new session duration: ${updatedSessionDuration} seconds`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
