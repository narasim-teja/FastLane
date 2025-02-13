"use client";

import * as React from "react";

import { Environment, Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { fromHex, stringToHex } from "viem";

import type { Hex } from "viem";

import type { Auth } from "~/types/auth";
import type { Notice } from "~/utils/types";

import { GoldBlockEnd, GoldStartingBlock } from "~/components/block";
import { Loader } from "~/components/loader";
import { ObstaclesSpawner } from "~/components/obstacles/spawner";
import { SinglePlayer } from "~/components/players/single-player";
import { Track } from "~/components/track";
import { useGame } from "~/hooks/use-game";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { getLogger } from "~/lib/logger";
import { api } from "~/lib/trpc/react";
import { useWriteInputBoxAddInput } from "~/server/hooks/generated";
import { fetchGraphQLData } from "~/utils/api";
import { NOTICES_QUERY } from "~/utils/queries";

export function GoldTrack() {
  const logger = getLogger();

  const isGameReady = React.useRef(false);
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);

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
  // const [attempts, setAttempts] = useState(0);
  const { isPending, isSuccess, error, writeContractAsync } =
    useWriteInputBoxAddInput();

  const { mutate: revealRow } = api.ws.revealRow.useMutation();
  const [auth] = useLocalStorage<Auth | null>("auth", null);

  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`; // Default address for running locally change upon deployment
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

  React.useEffect(() => {
    writeContractAsync({
      args: [
        dAppAddress,
        stringToHex(
          `{"method":"generate_random","rows":${rowCount},"cols":5,"max":4}`
        ),
      ],
    });

    fetchNotices();
  }, []);

  const lastNotice = notices[notices.length - 1];
  const payload = fromHex((lastNotice?.payload as Hex) || "0x0", "bytes");
  const cartesiObstacles = convertFlatArrayTo2DArray(payload, rowCount, 5);

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

      {auth && <SinglePlayer from="gold" auth={auth} />}
    </Physics>
  );
}

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
