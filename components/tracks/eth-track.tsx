"use client";

import React from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import type { Auth } from "~/types/auth";

import { EthBlockEnd, EthStartingBlock } from "~/components/block";
import { Bounds } from "~/components/bounds";
import { Loader } from "~/components/loader";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { SinglePlayer } from "~/components/players/single-player";
import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";

export const EthTrack: React.FC<{ auth: Auth }> = ({ auth }) => {
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
    toggleEditor,
    spawnCheckpoint,
    setSpawnCheckpoint,
    // ...
  } = useGame();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
      onStarted: () => {
        console.log("Fetching Initial Row with auth:", auth);
        revealRow({
          track: "eth",
          rowIdx: spawnCheckpoint * 9,
          auth,
        });
      },
      onData: ({ data: { rowCount, rowIdx, obstacles } }) => {
        console.log("Received row data:", { rowCount, rowIdx, obstacles });
        addObstaclesRow(obstacles);
        setRowCount(rowCount);
        isGameReady.current = true;
      },
    });

    api.ws.onUpdateCheckpoint.useSubscription(void function () {}, {
      onData: ({ data: { checkpointNumber } }) => {
        console.log("Received checkpoint data:", checkpointNumber);
        setSpawnCheckpoint(checkpointNumber);
      },
    });
  } else {
    isGameReady.current = true;
  }

  if (!isGameReady.current) {
    return (
      <Html fullscreen>
        <Loader />
      </Html>
    );
  }

  return (
    <Physics debug={debugPhysics}>
      {segments.map(({ obstacles }, i) => {
        const combinedArray = [
          ...Array(Math.max(0, 50 * spawnCheckpoint - 10)).fill(0),
          ...obstacles,
        ];
        logger.info(`Combined array for segment ${i}:`, combinedArray);
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
                  col={col - 1}
                />
              );
            })}

            <EthStartingBlock position={[0, 0, 0]} />

            {(() => {
              const blockEnds = [];
              for (let i = 50; i <= rowCount * 5; i += 50) {
                blockEnds.push(
                  <EthBlockEnd
                    key={i}
                    position={[0, 0, -i]}
                    checkpoint={i / 50 + 1}
                  />
                );
              }
              return blockEnds;
            })()}

            {Array.from({ length: rowCount / 10 }, (_, i) => (
              <Bounds
                key={i}
                length={rowCount}
                row={i}
                onCollision={() => {
                  if (i === segments.length - 1) {
                    logger.info(">>> Opening editor...");
                    toggleEditor(true);
                  }
                }}
              />
            ))}

            <Environment preset="dawn" background />
          </group>
        );
      })}

      {auth && <SinglePlayer from="eth" auth={auth} />}
    </Physics>
  );
};
