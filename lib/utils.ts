import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

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
export function absoluteUrl(path: `/${string}` = "/") {
  if (env.NODE_ENV === "production") {
    return `${siteConfig.url}${path}`;
  } else {
    return `http://localhost:${env.PORT}${path}`;
  }
}
