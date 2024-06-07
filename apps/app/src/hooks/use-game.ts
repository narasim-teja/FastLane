import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type { Obstacle } from "~/types/misc";
import { socket } from "~/lib/socket";

type State = {
  segments: { obstacles: Obstacle[] }[];
  addSegment: (obstacles: Obstacle[]) => void;
  addObstaclesRow: (obstacles: Obstacle[]) => void;

  isEditorOpen: boolean;
  openEditor: () => void;

  isSpeedBoostActive: boolean;
  activateSpeedBoost: () => void;

  isSpeedReduced: boolean;
  activateSpeedReduced: () => void;

  isPaused: boolean;
  activatePause: () => void;

  startTime: number;
  endTime: number;
  phase: "ready" | "playing" | "paused" | "gameOver";
  startGame: () => void;
  endGame: () => void;
  restartGame: () => void;
};

export const useGame = create<State>()(
  subscribeWithSelector((set, get) => ({
    segments: [{ obstacles: [] }],
    addSegment: (obstacles) => {
      set((state) => ({
        segments: [...state.segments, { obstacles }],
      }));

      const { segments } = get();

      const latestSegment = segments[segments.length - 1];
      socket.emit("server.addSegment", 59140, latestSegment.obstacles);
    },
    addObstaclesRow: (obstacles) =>
      set((state) => ({
        // assuming we're always updating the first (and currently only) segment
        segments: [
          { obstacles: [...state.segments[0].obstacles, ...obstacles] },
        ],
      })),

    isEditorOpen: false,
    openEditor: () => set(() => ({ isEditorOpen: true })),

    isSpeedBoostActive: false,
    activateSpeedBoost: () => {
      set(() => ({ isSpeedBoostActive: true }));

      setTimeout(() => {
        set(() => ({ isSpeedBoostActive: false }));
      }, 3000);
    },

    isSpeedReduced: false,
    activateSpeedReduced: () => {
      set(() => ({ isSpeedReduced: true }));

      setTimeout(() => {
        set(() => ({ isSpeedReduced: false }));
      }, 4000);
    },

    isPaused: false,
    activatePause: () => set((state) => ({ isPaused: !state.isPaused })),

    startTime: 0,
    endTime: 0,
    phase: "ready",

    startGame: () =>
      set((state) => {
        if (state.phase === "ready") {
          return {
            startTime: Date.now(),
            phase: "playing",
          };
        }

        return state;
      }),

    endGame: () =>
      set((state) => {
        if (state.phase === "playing") {
          return {
            endTime: Date.now(),
            phase: "gameOver",
          };
        }

        return state;
      }),

    restartGame: () =>
      set((state) => {
        if (state.phase === "playing" || state.phase === "gameOver") {
          return {
            startTime: 0,
            endTime: 0,
            phase: "ready",
          };
        }

        return state;
      }),
  })),
);
