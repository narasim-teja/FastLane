import { ethers } from "hardhat";

async function main() {
  const FastlaneGame = await ethers.getContractFactory("Fastlane");
  const game = await FastlaneGame.deploy();

  await game.waitForDeployment();

  console.log("FastlaneGame deployed to:", game.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
