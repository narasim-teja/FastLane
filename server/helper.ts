import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import { abi, CHAIN_ID } from "~/config/constants";
import { env } from "~/lib/env";
import { getLogger } from "~/lib/logger";

export const sessionChainMap: Record<number, number> = {};
export const sessionObstacles: number[][][] = [];
let contract: ethers.Contract | null = null;

// const log = getLogger();

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
  // log.info(
  //   `Reveal row: sessionId=${sessionId}, rowIndex=${rowIndex}, chainId=${chainId}`
  // );

  try {
    if (!sessionChainMap[sessionId]) {
      await initializeSession(chainId, sessionId);
    }

    if (!sessionObstacles[sessionId]?.length) {
      // log.error(`No obstacles found for sessionId: ${sessionId}`);
      return {
        rowCount: 0,
        obstaclesInRow: [],
      };
    }

    // log.info({ rowCount: sessionObstacles[sessionId].length }, "rowCount:");

    const obstaclesInRow = sessionObstacles[sessionId]?.[rowIndex] ?? [];
    // log.info(
    //   { obstaclesInRow },
    //   `Obstacles for sessionId=${sessionId}, rowIndex=${rowIndex}:`
    // );

    return {
      rowCount: sessionObstacles[sessionId].length,
      obstaclesInRow,
    };
  } catch (error) {
    // log.error(error, "Error in revealObstaclesInRow:");
    return {
      rowCount: 0,
      obstaclesInRow: [],
    };
  }
}

export async function initializeSession(chainId: number, sessionId: number) {
  try {
    // log.info(
    //   `initializeSession called with chainId: ${chainId}, sessionId: ${sessionId}`
    // );

    sessionChainMap[sessionId] = chainId;
    sessionObstacles[sessionId] = [];

    await fetchAllObstacles(chainId, sessionId);

    // log.info(
    //   { sessionObstacles: sessionObstacles[sessionId] },
    //   "Obstacles in session:"
    // );
  } catch (error) {
    // log.error(error, "Failed to create new session:");
  }
}

export async function fetchAllObstacles(chainId: number, sessionId: number) {
  try {
    const contract = getContractInstance();

    const rowCountBigInt = await contract.getRowCount(chainId);
    const rowCount = Number(rowCountBigInt.toString());

    const obstaclePromises = Array.from({ length: rowCount }, (_, rowIndex) =>
      fetchObstaclesInRow(sessionId, rowIndex)
    );

    const allObstacles = await Promise.all(obstaclePromises);

    // log.info({ allObstacles }, "Obstacles for session:");

    sessionObstacles[sessionId] = allObstacles;

    return {
      rowCount,
      obstacles: allObstacles,
    };
  } catch (error) {
    // log.info(error, "Error in fetchAllObstacles:");

    return {
      rowCount: 0,
      obstacles: [],
    };
  }
}

export async function fetchObstaclesInRow(sessionId: number, rowIndex: number) {
  try {
    // log.info(`Attempt to retrieve chainId for sessionId: ${sessionId}`);
    // log.info({ sessionChainMap }, "Current mapping:");

    const contract = getContractInstance();

    const obstaclesBigInt = await contract.getObstaclesInRow(
      CHAIN_ID,
      rowIndex
    );
    const obstacles = obstaclesBigInt.toString().split(",").map(Number);

    return obstacles;
  } catch (error) {
    // log.error(error, "Error in fetchObstaclesInRow:");
    return [];
  }
}
