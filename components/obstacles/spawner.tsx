import { EthText } from "./eth-text";
import { GreenCandle } from "./green-candle";
import { OasisText } from "./oasis-text";
import { PoopObstacle } from "./poop";
import { Ramp } from "./ramp";
import { SlowPad } from "./slow-pad";
import { SpeedPad } from "./speed-pad";
import { TextObstacle } from "./text";
import { WhaleObstacle } from "./whale";

type ObstaclesSpawnerProps = {
  id: string;
  row: number;
  col: number;
};

const ObstaclesMap = new Map([
  ["1", WhaleObstacle],
  ["2", TextObstacle],
  ["3", PoopObstacle],
  ["4", GreenCandle],
  ["5", SpeedPad],
  ["6", SlowPad],
  ["7", EthText],
  ["8", OasisText],
  ["9", Ramp],
]);

export function ObstaclesSpawner({ id, row, col }: ObstaclesSpawnerProps) {
  const Obstacle = ObstaclesMap.get(id);

  if (!Obstacle) {
    return null;
  }

  // adjust based on your coordinate system
  const position = [col, 0, -(row + 1) * 5];

  return <Obstacle position={position} />;
}
