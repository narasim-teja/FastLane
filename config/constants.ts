import type { SwipeDirections } from "~/hooks/use-swipeable";
import type { Direction } from "~/types/misc";

export { default as abi } from "./spargu-abi.json";

export const SESSION_ID = 11;
export const CHAIN_ID = 23295;

export const CHECKPOINT_TIME_LIMIT = 15; // in seconds

export const keyMap: Record<SwipeDirections, Direction> = {
  Up: "forward",
  Down: "backward",
  Left: "leftward",
  Right: "rightward",
};
