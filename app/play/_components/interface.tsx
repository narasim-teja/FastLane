import { LevelEditor } from "~/components/level-editor";

import { GameToaster } from "./game-toaster";
import { Help } from "./help";
import { WASDControls } from "./wasd-controls";

export function Interface() {
  return (
    <>
      <GameToaster />
      <WASDControls />
      <LevelEditor />
      <Help />
    </>
  );
}
