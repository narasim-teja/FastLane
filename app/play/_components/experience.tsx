"use client";

import React from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import { BlockEnd, BlockStart } from "~/components/block";
import { Bounds } from "~/components/bounds";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { Player } from "~/components/player";
import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";

import Common from "./common";

export function Experience() {
  const logger = getLogger();

  const isGameReady = React.useRef(false);

  const {
    rowCount,
    setRowCount,
    segments,
    addObstaclesRow,
    toggleEditor,
    spawnCheckpoint,
    // ...
  } = useGame();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
      onStarted: () => {
        logger.info(">>> Fetching Initial Row");
        revealRow({
          chainId: CHAIN_ID,
          sessionId: SESSION_ID,
          rowIdx: spawnCheckpoint * 9,
        });
      },
      onData: ({ data: { rowCount, rowIdx, obstacles } }) => {
        logger.info({ obstacles }, `>>> Raw event data for row ${rowIdx}:`);
        addObstaclesRow(obstacles);
        setRowCount(rowCount);
        isGameReady.current = true;
      },
    });
  } else {
    isGameReady.current = true;
  }

  if (!isGameReady.current) {
    return (
      <Html fullscreen className="grid h-full place-items-center">
        <div className="aspect-square h-16 animate-spin rounded-full border-y-2 border-primary lg:h-32" />
        <span className="sr-only">Loading initial obstacle...</span>
      </Html>
    );
  }

  // Function to generate BlockEnd components at intervals
  const generateBlockEnds = () => {
    const blockEnds = [];
    for (let i = 50; i <= rowCount * 5; i += 50) {
      blockEnds.push(
        <BlockEnd key={i} position={[0, 0.05, -i]} checkpoint={i / 50 + 1} />
      );
    }
    return blockEnds;
  };

  return (
    <Physics>
      <Common />

      {segments.map(({ obstacles }, i) => {
        const combinedArray = [
          ...Array(Math.max(0, 50 * spawnCheckpoint - 10)).fill(0),
          ...obstacles,
        ];
        console.log(`Combined array for segment ${i}:`, combinedArray);
        return (
          <group key={i}>
            {combinedArray.map((obstacle, j) => {
              const row = Math.floor(j / 5);
              const col = j % 5;

              return (
                <ObstaclesSpawner
                  key={`${i}-${j}`}
                  id={obstacle.toString()}
                  row={row}
                  col={col}
                />
              );
            })}

            <BlockStart
              //  position={[2, 0.1, 7]}
              position={[2, 0, 2]}
            />
            {generateBlockEnds()}
            <Bounds
              length={rowCount}
              rowCount={rowCount}
              onCollison={() => {
                if (i === segments.length - 1) {
                  logger.info(">>> Opening editor...");
                  toggleEditor(true);
                }
              }}
            />
            <Environment preset="dawn" background />
          </group>
        );
      })}

      <Player />
    </Physics>
  );
}
