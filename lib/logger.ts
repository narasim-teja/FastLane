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

  const pino = require("pino");

  logger = pino({
    browser: {
      asObject: true,
      disabled: env.NODE_ENV === "production",
    },
    level: "debug",
  });

  return logger;
}

export default getLogger;
