import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

import type { GamePlayAction } from "~/types/misc";

import { siteConfig } from "~/config/site";

import { env } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the absolute url for the given path based on the current environment
 * @param path The path to get the absolute url for
 * @returns The absolute url for the given path
 */
export function absoluteUrl(path: `/${string}`) {
  if (env.NODE_ENV === "production") {
    return `${siteConfig.url}${path}`;
  } else {
    return `http://localhost:${env.PORT}${path}`;
  }
}

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

export function logger(...args: unknown[]) {
  if (env.NODE_ENV === "development") {
    console.log(...args);
  }
}
