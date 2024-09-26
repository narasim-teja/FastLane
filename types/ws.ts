import type { Position } from "./misc";

export type RevealRowData = {
  rowIdx: number;
  rowCount: number;
  obstacles: number[];
};

export type BroadcastPositionData = {
  address: string;
  impulse: Position;
  torque: Position;
};
