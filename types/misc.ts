export type Obstacles = number[];

export type Position = [x: number, y: number, z: number];

export type Coordinates = { x: number; y: number; z: number };

export type GamePlayAction = {
  frameNumber: number;
  action: string;
};

export type Track = "gold" | "eth" | "oasis-track";

export type Clients = {
  [address: string]: { position: Coordinates; rotation: Coordinates };
};
