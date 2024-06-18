import React from "react";

import { Environment } from "@react-three/drei";

import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { useGame } from "~/hooks/use-game";
import { api } from "~/lib/trpc/react";
import { logger } from "~/lib/utils";

import { BlockEnd, BlockStart } from "./block";
import { Bounds } from "./bounds";
import { ObstaclesSpawner } from "./obstacles/spawner";
import { Player } from "./player";

export function Experience() {
  const { segments, addObstaclesRow, openEditor } = useGame();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  api.ws.onRevealRow.useSubscription(undefined, {
    onStarted: () => {
      logger(">>> Fetching Initial Row");
      revealRow({ chainId: CHAIN_ID, sessionId: SESSION_ID, rowIdx: 0 });
    },
    onData: ({ rowIdx, obstacles }) => {
      logger(`Raw event data for row ${rowIdx}:`, obstacles);
      addObstaclesRow(obstacles);
    },
  });

  return (
    <React.Fragment>
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
            position={[2, 0, 7]}
          />
          <BlockEnd
            // position={[0, 0, -((8 + 1) * 4.99)]}
            position={[0, 0, -((8 + 1) * 5)]}
          />
          <Bounds
            length={8 + 1}
            onClick={() => {
              if (i === segments.length - 1) {
                openEditor();
              }
            }}
          />
          <Environment preset="dawn" background />
        </group>
      ))}

      <Player />
    </React.Fragment>
  );
}
