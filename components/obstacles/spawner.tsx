import { GreenCandle } from "./green-candle";
import { PoopObstacle } from "./poop";
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
