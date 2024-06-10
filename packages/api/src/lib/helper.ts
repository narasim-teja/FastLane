import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { CHAIN_ID } from "../constants/globals";
import abi from "../constants/spargu-abi.json";
import { env } from "./env";

export const sessionToChainIdMap: Record<number, number> = {};
export const obstaclesInSession: number[][][] = [];

function getContract() {
  const signer = sapphire
    .wrap(new ethers.Wallet(env.TEST_TRACK_OWNER_PKEY))
    .connect(
      ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway),
    );

  return new ethers.Contract(env.OASIS_CONTRACT_ADDRESS, abi, signer);
}

export async function revealRow(
  chainId: number,
  sessionId: number,
  rowIndex: number,
) {
  console.log(
    `Reveal row: sessionId=${sessionId}, rowIndex=${rowIndex}, chainId=${chainId}`,
  );

  try {
    if (!sessionToChainIdMap[sessionId]) {
      console.log("rowIndex:", rowIndex);
      await newSession(chainId, sessionId);
    }

    if (!obstaclesInSession[sessionId]?.length) {
      console.log("rowIndex:", rowIndex);
      console.error(`No obstacles found for sessionId: ${sessionId}`);

      return [];
    }

    // directly retrieve obstacles numbers for the requested row
    const obstaclesInRow = obstaclesInSession.at(sessionId)?.at(rowIndex) ?? [];
    console.log(
      `Obstacles for sessionId=${sessionId}, rowIndex=${rowIndex}:`,
      obstaclesInRow,
    );

    return obstaclesInRow;
  } catch (error) {
    console.error("Error in revealRow:", error);
    return [];
  }
}

export async function newSession(chainId: number, sessionId: number) {
  try {
    console.log(
      `NewSession called with chainId: ${chainId}, sessionId: ${sessionId}`,
    );

    sessionToChainIdMap[sessionId] = chainId;
    obstaclesInSession[sessionId] = [];

    await getAllObstacles(chainId, sessionId); // pass sessionId if needed

    console.log("Obstacles in session:", obstaclesInSession[sessionId]);
  } catch (error) {
    console.error("Failed to create new session:", error);
  }
}

export async function getAllObstacles(chainId: number, sessionId: number) {
  try {
    const contract = getContract();

    const rowCountBigint = await contract.getRowCount(chainId);
    const rowCount = Number(rowCountBigint.toString());

    console.log("rowCount:", rowCount);

    for (let i = 0; i < rowCount; i++) {
      const obstacles = await getObstaclesForSession(chainId, i);

      console.log("Obstacles for row:", obstacles);

      obstaclesInSession[sessionId]?.push(obstacles);
    }
  } catch (error) {
    console.log("Error in getAllObstaclesASYNC:", error);
  }
}

export async function getObstaclesForSession(sessionId: number, row: number) {
  try {
    console.log(`Attempt to retrieve chainId for sessionId: ${sessionId}`);
    console.log(
      "Current mapping:",
      JSON.stringify(sessionToChainIdMap, null, 2),
    );

    const contract = getContract();

    // Await the promise resolution and log the result
    const obstaclesBigint = await contract.getObstaclesInRow(CHAIN_ID, row);

    const obstacles = obstaclesBigint.toString().split(",").map(Number);

    return obstacles;
  } catch (error) {
    console.error("Error in getObstaclesForSession:", error);

    return [];
  }
}
