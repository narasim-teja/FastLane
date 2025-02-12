"use client";

import React, { useEffect, useState } from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { fromHex, stringToHex } from "thirdweb";

import type { Hex } from "viem";

import type { Notice } from "~/utils/types";

import { GoldBlockEnd, GoldStartingBlock } from "~/components/block";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { SinglePlayer } from "~/components/players/single-player";
import { Track } from "~/components/track";
import { CHAIN_ID, SESSION_ID } from "~/config/constants";
import { useGame } from "~/hooks/use-game";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";
import { useWriteInputBoxAddInput } from "~/server/hooks/generated";
import { fetchGraphQLData } from "~/utils/api";
import { NOTICES_QUERY } from "~/utils/queries";

function convertFlatArrayTo2DArray(
  flatArray: Uint8Array,
  rows: number,
  cols: number
): number[][] {
  let index = 0;
  const twoDArray: number[][] = []; // Make sure this is a 2D array of numbers

  for (let i = 0; i < rows; i++) {
    const row: number[] = []; // Declare the row as a number[] array
    for (let j = 0; j < cols; j++) {
      const value = flatArray[index]!; // Use the non-null assertion operator to assert it's a number
      row.push(value); // Push the value into the row array
      index++;
    }
    twoDArray.push(row); // Push the row into the 2D array
  }
  return twoDArray;
}

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

  console.log(rowCount);

  // const [attempts, setAttempts] = useState(0);
  const { isPending, isSuccess, error, writeContractAsync } =
    useWriteInputBoxAddInput();
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`; // Default address for running locally change upon deployment
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchNotices = async () => {
    try {
      const data = await fetchGraphQLData<{
        notices: { edges: { node: Notice }[] };
      }>(NOTICES_QUERY);
      setNotices(data.notices.edges.map((edge) => edge.node));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(rowCount);

    writeContractAsync({
      args: [
        dAppAddress,
        stringToHex(
          `{"method":"generate_random","rows":${rowCount},"cols":5,"max":4}`
        ),
      ],
    });

    console.log("sent");
    fetchNotices();
  }, []);

  const lastNotice = notices[notices.length - 1];

  const payload = fromHex((lastNotice?.payload as Hex) || "0x0", "bytes");
  const cartesiObstacles = convertFlatArrayTo2DArray(payload, rowCount, 5);
  // console.log(payload);
  console.log(cartesiObstacles);

  const { mutate: revealRow } = api.ws.revealRow.useMutation();

  // Debugging mode check
  const isDebugging = false; // Set to true for debugging, false for normal operation

  if (!isDebugging) {
    api.ws.onRevealRow.useSubscription(void function () {}, {
      onStarted: () => {
        logger.info(">>> Fetching Initial Row");
        revealRow({
          track: "gold",
          chainId: CHAIN_ID,
          sessionId: SESSION_ID,
          rowIdx: 0,
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

      <SinglePlayer from="gold" />
    </Physics>
  );
}
