import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { ethers } from "ethers";

import type { Auth } from "~/types/auth";

import { abi } from "~/config/constants";
import { env } from "~/lib/env";
import { getLogger } from "~/lib/logger";

export const sessionObstacles: number[][] = [];
let contract: ethers.Contract | null = null;

const log = getLogger();

function getContractInstance() {
  if (!contract) {
    const provider = new ethers.JsonRpcProvider(
      sapphire.NETWORKS.testnet.defaultGateway
    );
    const wrappedProvider = sapphire.wrap(provider);

    contract = new ethers.Contract(
      env.OASIS_CONTRACT_ADDRESS,
      abi,
      wrappedProvider
    );
  }
  return contract;
}

export async function revealObstaclesInRow(rowIndex: number, auth: Auth) {
  log.info(`Reveal row: rowIndex=${rowIndex}`);

  try {
    if (!sessionObstacles.length) {
      await initializeSession(auth);
    }

    if (!sessionObstacles.length) {
      log.error("No obstacles found after initialization");
      return {
        rowCount: 0,
        obstaclesInRow: [],
      };
    }

    log.info({ rowCount: sessionObstacles.length }, "rowCount:");

    const obstaclesInRow = sessionObstacles[rowIndex] ?? [];
    log.info({ obstaclesInRow }, `Obstacles for rowIndex=${rowIndex}:`);

    if (obstaclesInRow.length === 0) {
      log.warn(
        `No obstacles found for rowIndex=${rowIndex}. This might indicate a problem.`
      );
    }

    return {
      rowCount: sessionObstacles.length,
      obstaclesInRow,
    };
  } catch (error) {
    log.error(error, "Error in revealObstaclesInRow:");
    return {
      rowCount: 0,
      obstaclesInRow: [],
    };
  }
}

export async function initializeSession(auth: Auth) {
  try {
    log.info("Initializing session");

    sessionObstacles.length = 0;

    await fetchAllObstacles(auth);

    log.info({ sessionObstacles }, "Obstacles in session:");
  } catch (error) {
    log.error(error, "Failed to create new session:");
  }
}

export async function fetchAllObstacles(auth: Auth) {
  try {
    const contract = getContractInstance();

    const rowCountBigInt = await contract.getRowCount();
    const rowCount = Number(rowCountBigInt.toString());

    const obstaclePromises = Array.from({ length: rowCount }, (_, rowIndex) =>
      fetchObstaclesInRow(rowIndex, auth)
    );

    const allObstacles = await Promise.all(obstaclePromises);

    log.info({ allObstacles }, "Obstacles for session:");

    sessionObstacles.push(...allObstacles);

    return {
      rowCount,
      obstacles: allObstacles,
    };
  } catch (error) {
    log.info(error, "Error in fetchAllObstacles:");

    return {
      rowCount: 0,
      obstacles: [],
    };
  }
}

export async function fetchObstaclesInRow(rowIndex: number, auth: Auth) {
  try {
    log.info(`Fetching obstacles for rowIndex: ${rowIndex}`);
    if (!auth) {
      log.error("Auth data is null");
      return [];
    }

    const contract = getContractInstance();

    log.info(`Calling contract.getObstaclesInRow`);
    const obstaclesBigInt = await contract.getObstaclesInRow(
      {
        user: auth.user,
        time: auth.time,
        rsv: auth.rsv,
      },
      auth.user,
      rowIndex
    );
    log.info(`Raw obstacles from contract:`, obstaclesBigInt);

    const obstacles = obstaclesBigInt.map(Number);
    log.info(`Parsed obstacles for rowIndex: ${rowIndex}:`, obstacles);

    return obstacles;
  } catch (error) {
    log.error(`Error in fetchObstaclesInRow for rowIndex ${rowIndex}:`, error);
    return [];
  }
}

export async function updateCheckpoint(
  address: string,
  checkpointNumber: number
) {
  log.info(
    `Updating checkpoint for address: ${address}, checkpointNumber: ${checkpointNumber}`
  );

  const contract = getContractInstance();

  await contract.updateCheckpoint(address, checkpointNumber);
}
