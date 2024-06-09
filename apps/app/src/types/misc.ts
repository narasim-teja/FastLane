export type Obstacles = number[];

export type Position = [x: number, y: number, z: number];

export interface GamePlayAction {
  frameNumber: number;
  action: string;
}
