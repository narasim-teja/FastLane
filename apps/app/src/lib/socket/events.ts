import type { Obstacle } from "~/types/misc";
import { useGame } from "~/hooks/use-game";
import { socket } from ".";

/* -----------------------------------------------------------------------------------------------
 * socket events
 * -----------------------------------------------------------------------------------------------*/

socket.on("connect", () => {
  console.log(`>>> WebSocket connected`);
});

socket.on("client.revealRow", (rowId: number, obstaclesInRow: Obstacle[]) => {
  console.log(`Raw event data for row ${rowId}:`, obstaclesInRow);

  if (obstaclesInRow) {
    console.log(
      `>>> Reveal data for row: ${rowId}, Data: ${JSON.stringify(obstaclesInRow)}`,
    );
    useGame.getState().addObstaclesRow(obstaclesInRow);
  } else {
    console.error(
      `No obstacles data received for row ${rowId}, Data: ${JSON.stringify(obstaclesInRow)}.`,
    );

    // handle the case where no data is received (e.g., request data again or use fallback data)
  }
});

export function revealRow(sessionId: number, rowId: number) {
  socket.emit("server.revealRow", 23295, sessionId, rowId);
}
