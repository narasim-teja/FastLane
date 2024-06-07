import React from "react";

import { Environment } from "@react-three/drei";

import { useGame } from "~/hooks/use-game";
import { BlockEnd } from "./block/block-end";
import { BlockStart } from "./block/block-start";
import { Bounds } from "./bounds";
import { ObstaclesSpawner } from "./obstacles/spawner";
import { Player } from "./player";

export function Experience() {
  const { segments, openEditor } = useGame();

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

          <BlockStart position={[2, 0.1, 7]} />
          <BlockEnd position={[0, 0, -((8 + 1) * 4.99)]} />
          <Bounds
            length={8 + 1}
            onClick={() => {
              i === segments.length - 1 && openEditor();
            }}
          />
          <Environment preset="dawn" background />
        </group>
      ))}

      <Player />
    </React.Fragment>
  );
}
