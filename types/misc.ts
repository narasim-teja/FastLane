export type Obstacles = number[];

export type Position = [x: number, y: number, z: number];

export type GamePlayAction = {
  frameNumber: number;
  action: string;
};

export type Direction = "forward" | "backward" | "leftward" | "rightward";
