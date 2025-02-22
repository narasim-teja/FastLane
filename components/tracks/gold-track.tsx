"use client";

import * as React from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { stringToHex } from "viem";

import { GoldBlockEnd, GoldStartingBlock } from "~/components/block";
import { Loader } from "~/components/loader";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { SinglePlayer } from "~/components/players/single-player";
import { Track } from "~/components/track";
import { DAPP_ADDRESS } from "~/config/constants";
import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";
import { useWriteInputBoxAddInput } from "~/server/hooks/generated";

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

  const { writeContractAsync } = useWriteInputBoxAddInput();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  React.useEffect(() => {
    (async () => {
      await writeContractAsync({
        args: [
          DAPP_ADDRESS,
          stringToHex(
            `{"method":"generate_random","rows":${10},"cols":5,"max":4}`
          ),
        ],
      });

      logger.info(">>> Fetching Initial Row");
      revealRow({
        track: "gold",
        rowIdx: 0,
        refetch: true,
      });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
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
      <Html fullscreen>
        <Loader />
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

      <SinglePlayer from="gold" />
    </Physics>
  );
}
