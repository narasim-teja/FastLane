import type { GamePlayAction } from "~/types/misc";

export const quantize = (value: number) => Math.round(value * 1000) / 1000;

export function downloadRecordedActions(actions: GamePlayAction[]) {
  const blob = new Blob([JSON.stringify(actions, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "gameplay-actions.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function logger(message: string, data?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.log(message, data);
  }
}
