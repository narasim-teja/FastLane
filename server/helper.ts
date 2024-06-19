import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi, CHAIN_ID } from "~/config/constants";
import { env } from "~/lib/env";
import { logger } from "~/lib/utils";

export const sessionToChainIdMap: Record<number, number> = {};
export const obstaclesInSession: number[][][] = [];

function getContract() {
  const signer = sapphire
    .wrap(new ethers.Wallet(env.TEST_TRACK_OWNER_PKEY))
    .connect(
      ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)
    );

  return new ethers.Contract(env.OASIS_CONTRACT_ADDRESS, abi, signer);
}

export async function revealRow(
  chainId: number,
  sessionId: number,
  rowIndex: number
) {
  logger(
    `Reveal row: sessionId=${sessionId}, rowIndex=${rowIndex}, chainId=${chainId}`
  );

  try {
    if (!sessionToChainIdMap[sessionId]) {
      logger("rowIndex:", rowIndex);
      await newSession(chainId, sessionId);
    }

    if (!obstaclesInSession[sessionId]?.length) {
      logger("rowIndex:", rowIndex);
      console.error(`No obstacles found for sessionId: ${sessionId}`);

      return [];
    }

    // directly retrieve obstacles numbers for the requested row
    const obstaclesInRow = obstaclesInSession.at(sessionId)?.at(rowIndex) ?? [];
    logger(
      `Obstacles for sessionId=${sessionId}, rowIndex=${rowIndex}:`,
      obstaclesInRow
    );

    return obstaclesInRow;
  } catch (error) {
    console.error("Error in revealRow:", error);
    return [];
  }
}

export async function newSession(chainId: number, sessionId: number) {
  try {
    logger(
      `NewSession called with chainId: ${chainId}, sessionId: ${sessionId}`
    );

    sessionToChainIdMap[sessionId] = chainId;
    obstaclesInSession[sessionId] = [];

    await getAllObstacles(chainId, sessionId); // pass sessionId if needed

    logger("Obstacles in session:", obstaclesInSession[sessionId]);
  } catch (error) {
    console.error("Failed to create new session:", error);
  }
}

export async function getAllObstacles(chainId: number, sessionId: number) {
  try {
    const contract = getContract();

    const rowCountBigint = await contract.getRowCount(chainId);
    const rowCount = Number(rowCountBigint.toString());

    logger("rowCount:", rowCount);

    for (let i = 0; i < rowCount; i++) {
      const obstacles = await getObstaclesForSession(chainId, i);

      logger("Obstacles for row:", obstacles);

      obstaclesInSession[sessionId]?.push(obstacles);
    }
  } catch (error) {
    logger("Error in getAllObstaclesASYNC:", error);
  }
}

export async function getObstaclesForSession(sessionId: number, row: number) {
  try {
    logger(`Attempt to retrieve chainId for sessionId: ${sessionId}`);
    logger("Current mapping:", JSON.stringify(sessionToChainIdMap, null, 2));

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
