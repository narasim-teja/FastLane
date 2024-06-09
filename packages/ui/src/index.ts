import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

/**
 * Merges the given class names with the tailwind classes
 * @param inputs The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: Parameters<typeof cx>) {
  return twMerge(cx(inputs));
}
