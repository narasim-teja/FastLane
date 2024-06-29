import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi, CHAIN_ID } from "~/config/constants";
import { env } from "~/lib/env";
import { logger } from "~/lib/utils";

export const sessionChainMap: Record<number, number> = {};
export const sessionObstacles: number[][][] = [];
let contract: ethers.Contract | null = null;

function getContractInstance() {
  if (!contract) {
    const signer = sapphire
      .wrap(new ethers.Wallet(env.TRACK_OWNER_PKEY))
      .connect(
        ethers.getDefaultProvider(sapphire.NETWORKS.testnet.defaultGateway)
      );

    contract = new ethers.Contract(env.OASIS_CONTRACT_ADDRESS, abi, signer);
  }

  return contract;
}

export async function revealObstaclesInRow(
  chainId: number,
  sessionId: number,
  rowIndex: number
) {
  logger(
    `Reveal row: sessionId=${sessionId}, rowIndex=${rowIndex}, chainId=${chainId}`
  );

  try {
    if (!sessionChainMap[sessionId]) {
      await initializeSession(chainId, sessionId);
    }

    if (!sessionObstacles[sessionId]?.length) {
      console.error(`No obstacles found for sessionId: ${sessionId}`);
      return {
        rowCount: 0,
        obstaclesInRow: [],
      };
    }

    const obstaclesInRow = sessionObstacles[sessionId]?.[rowIndex] ?? [];
    logger(
      `Obstacles for sessionId=${sessionId}, rowIndex=${rowIndex}:`,
      obstaclesInRow
    );

    return {
      rowCount: sessionObstacles[sessionId].length,
      obstaclesInRow,
    };
  } catch (error) {
    console.error("Error in revealObstaclesInRow:", error);
    return {
      rowCount: 0,
      obstaclesInRow: [],
    };
  }
}

export async function initializeSession(chainId: number, sessionId: number) {
  try {
    logger(
      `initializeSession called with chainId: ${chainId}, sessionId: ${sessionId}`
    );

    sessionChainMap[sessionId] = chainId;
    sessionObstacles[sessionId] = [];

    await fetchAllObstacles(chainId, sessionId);

    logger("Obstacles in session:", sessionObstacles[sessionId]);
  } catch (error) {
    console.error("Failed to create new session:", error);
  }
}

async function fetchAllObstacles(chainId: number, sessionId: number) {
  try {
    const contract = getContractInstance();

    const rowCountBigInt = await contract.getRowCount(chainId);
    const rowCount = Number(rowCountBigInt.toString());

    logger("rowCount:", rowCount);

    const obstaclePromises = Array.from({ length: rowCount }, (_, rowIndex) =>
      fetchObstaclesInRow(sessionId, rowIndex)
    );

    const allObstacles = await Promise.all(obstaclePromises);

    logger("Obstacles for session:", allObstacles);

    sessionObstacles[sessionId] = allObstacles;
  } catch (error) {
    logger("Error in fetchAllObstacles:", error);
  }
}

async function fetchObstaclesInRow(sessionId: number, rowIndex: number) {
  try {
    logger(`Attempt to retrieve chainId for sessionId: ${sessionId}`);
    logger("Current mapping:", JSON.stringify(sessionChainMap, null, 2));

    const contract = getContractInstance();

    const obstaclesBigInt = await contract.getObstaclesInRow(
      CHAIN_ID,
      rowIndex
    );
    const obstacles = obstaclesBigInt.toString().split(",").map(Number);

    return obstacles;
  } catch (error) {
    console.error("Error in fetchObstaclesInRow:", error);
    return [];
  }
}
