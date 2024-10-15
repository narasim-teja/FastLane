import React from "react";

import { useContract } from "~/hooks/use-contract";

export const useEvents = () => {
  const [readContract] = useContract();

  React.useEffect(() => {
    if (readContract) {
      // Event handler functions
      const handleCheckpointCreated = (
        creator: string,
        checkpointNumber: number
      ) => {
        console.log(
          `Checkpoint created by: ${creator}, Checkpoint Number: ${checkpointNumber}`
        );
      };

      const handlePlayerCheckpointUpdated = (
        player: string,
        checkpointNumber: number
      ) => {
        console.log(
          `Player ${player} updated to checkpoint ${checkpointNumber}`
        );
      };

      const handleGameStarted = (player: string, startTime: number) => {
        console.log(`Game started for player: ${player} at ${startTime}`);
      };

      const handleEntryFeePaid = (player: string, amount: number) => {
        console.log(`Entry fee of ${amount} paid by player: ${player}`);
      };

      const handleGameEnded = (player: string, endTime: number) => {
        console.log(`Game ended for player: ${player} at ${endTime}`);
      };

      // Attach event listeners
      readContract.on("CheckpointCreated", handleCheckpointCreated);
      readContract.on("PlayerCheckpointUpdated", handlePlayerCheckpointUpdated);
      readContract.on("GameStarted", handleGameStarted);
      readContract.on("EntryFeePaid", handleEntryFeePaid);
      readContract.on("GameEnded", handleGameEnded);

      // Cleanup function to remove listeners
      return () => {
        readContract.off("CheckpointCreated", handleCheckpointCreated);
        readContract.off(
          "PlayerCheckpointUpdated",
          handlePlayerCheckpointUpdated
        );
        readContract.off("GameStarted", handleGameStarted);
        readContract.off("EntryFeePaid", handleEntryFeePaid);
        readContract.off("GameEnded", handleGameEnded);
      };
    }
  }, [readContract]);
};
