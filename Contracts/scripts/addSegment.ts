import { ethers } from "hardhat";

import { env } from "../env";
import type { Fastlane } from "../typechain-types"; // Adjust the path if necessary

async function main() {
  const contractAddress = env.CONTRACT_ADDRESS;

  const FastlaneFactory = await ethers.getContractFactory("Fastlane");
  const fastlane = FastlaneFactory.attach(contractAddress) as Fastlane;

  const [player] = await ethers.getSigners();

  const chainId = 23295;
  const obstacleIds = Array.from({ length: 50 }, (_, i) => BigInt(i + 1)); // Use BigInt for uint256[]

  const tx = await fastlane.connect(player).addSegment(chainId, obstacleIds);
  await tx.wait();

  console.log("Segment added by player:", player.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
