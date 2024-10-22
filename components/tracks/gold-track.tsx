"use client";

import React from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import type { DailySignInAuth } from "~/types/auth";

import { GoldBlockEnd, GoldStartingBlock } from "~/components/block";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { SinglePlayer } from "~/components/players/single-player";
import { Track } from "~/components/track";
import { useGame } from "~/hooks/use-game";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";

export function GoldTrack() {
  const logger = getLogger();

  const isGameReady = React.useRef(false);

  const { debugPhysics } = useControls("Debug Tools", {
    debugPhysics: false,
  });

  const {
    rowCount,
    setRowCount,
    segments,
    addObstaclesRow,
    // ...
  } = useGame();

  const [auth] = useLocalStorage<DailySignInAuth | null>("auth", null);

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
      onStarted: () => {
        logger.info(">>> Fetching Initial Row");
        if (!auth) return;

        revealRow({
          track: "gold",
          rowIdx: 0,
          auth,
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

  return (
    <Physics debug={debugPhysics}>
      {segments.map(({ obstacles }, i) => (
        <group key={i}>
          {obstacles.map((obstacle, j) => {
            const row = Math.floor(j / 5);
            const col = j % 5;

            return (
              <ObstaclesSpawner
                key={`${i}-${j}`}
                id={obstacle.toString()}
                row={row}
                col={col - 3}
              />
            );
          })}

          <GoldStartingBlock position={[0, 0, 2]} />
          {(() => {
            const blockEnds = [];
            for (let i = 50; i <= rowCount * 5; i += 50) {
              blockEnds.push(
                <GoldBlockEnd
                  key={i}
                  position={[0, 0, -i]}
                  checkpoint={i / 50 + 1}
                />
              );
            }
            return blockEnds;
          })()}

          {Array.from({ length: rowCount / 9 }, (_, i) => (
            <Track key={i} length={rowCount} row={i} />
          ))}
          <Environment preset="dawn" background />
        </group>
      ))}

      {auth && <SinglePlayer from="gold" auth={auth} />}
    </Physics>
  );
}
