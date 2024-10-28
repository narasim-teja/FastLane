import type { Coordinates } from "./misc";

export type RevealRowData = {
  rowIdx: number;
  rowCount: number;
  obstacles: number[];
};

export type BroadcastPositionData = {
  address: string;
  position: Coordinates;
  rotation: Coordinates;
};

export type UpdateCheckpointData = {
  checkpointNumber: number;
};
