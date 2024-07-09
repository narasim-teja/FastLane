import { LevelEditor } from "~/components/level-editor";

import { GameToaster } from "./game-toaster";
import { Help } from "./help";

export function Interface() {
  return (
    <>
      <GameToaster />
      <LevelEditor />
      <Help />
    </>
  );
}
