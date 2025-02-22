import type { Logger } from "pino";

import { env } from "./env";

/* eslint-disable @typescript-eslint/no-var-requires */

let logger: Logger;

/**
 * @name getLogger
 */
export function getLogger() {
  if (logger) {
    return logger;
  }

  /* eslint-disable @typescript-eslint/no-require-imports */
  const pino = require("pino");

  logger = pino({
    browser: {
      asObject: true,
      disabled: env.NODE_ENV === "development",
    },
    level: "debug",
  });

  return logger;
}
