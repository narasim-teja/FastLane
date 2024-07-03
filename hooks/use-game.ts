import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type { Obstacles } from "~/types/misc";

type State = {
  track: "defualt" | "gold" | "eth" | "community" | null;

  setTrack: (track: State["track"]) => void;

  rowCount: number;
  setRowCount: (rowCount: number) => void;

  segments: { obstacles: Obstacles }[];
  addSegment: (obstacles: Obstacles) => void;
  addObstaclesRow: (obstacles: Obstacles) => void;

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
  subscribeWithSelector((set) => ({
    track: null,

    setTrack: (track) =>
      set(() => {
        if (track) {
          localStorage.setItem("fastlane__track", track);
          return { track };
        }

        return { track: null };
      }),

    rowCount: 0,
    setRowCount: (rowCount) => set(() => ({ rowCount })),

    segments: [{ obstacles: [] }],
    addSegment: (obstacles) => {
      set((state) => ({
        segments: [...state.segments, { obstacles }],
      }));
    },
    addObstaclesRow: (obstacles) =>
      set((state) => {
        // assuming we're always updating the first (and currently only) segment
        const firstSegment = state.segments[0];

        if (firstSegment) {
          return {
            segments: [
              { obstacles: [...firstSegment.obstacles, ...obstacles] },
            ],
          };
        }

        return state;
      }),

    isEditorOpen: false,
    openEditor: () => set(() => ({ isEditorOpen: true })),

    isSpeedBoostActive: false,
    activateSpeedBoost: () => {
      set(() => ({ isSpeedBoostActive: true, isSpeedReduced: false }));

      setTimeout(() => {
        set(() => ({ isSpeedBoostActive: false }));
      }, 3000);
    },

    isSpeedReduced: false,
    activateSpeedReduced: () => {
      set(() => ({ isSpeedReduced: true, isSpeedBoostActive: false }));

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
            isSpeedReduced: false,
            isSpeedBoostActive: false,
            segments: [{ obstacles: [] }],
          };
        }

        return state;
      }),
  }))
);
