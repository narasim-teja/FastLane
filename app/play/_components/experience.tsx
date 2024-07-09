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
import { api } from "~/lib/trpc/react";
import { logger } from "~/lib/utils";

import Common from "./common";

export function Experience() {
  const isGameReady = React.useRef(false);

  const {
    rowCount,
    setRowCount,
    segments,
    addObstaclesRow,
    openEditor,
    // ...
  } = useGame();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
      onStarted: () => {
        logger(">>> Fetching Initial Row");
        revealRow({ chainId: CHAIN_ID, sessionId: SESSION_ID, rowIdx: 0 });
      },
      onData: ({ data: { rowCount, rowIdx, obstacles } }) => {
        console.log(`>>> Raw event data for row ${rowIdx}:`, obstacles);
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

  return (
    <Physics>
      <Common />

      {segments.map(({ obstacles }, i) => (
        <group key={i}>
          {obstacles.map((obstacle, j) => {
            const row = Math.floor(j / 5);
            const col = j % 5;

            return (
              <ObstaclesSpawner
                key={j}
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
          <BlockEnd
            // position={[0, 0, -((8 + 1) * 4.99)]}
            position={[0, 0.05, -(rowCount * 5)]}
          />
          <Bounds
            length={rowCount}
            rowCount={rowCount}
            onCollison={() => {
              if (i === segments.length - 1) {
                openEditor();
              }
            }}
          />
          <Environment preset="dawn" background />
        </group>
      ))}

      <Player />
    </Physics>
  );
}
