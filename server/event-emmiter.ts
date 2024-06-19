/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { EventEmitter } from "events";

import type { RevealRowData } from "~/types/ws";

export interface MyEvents {
  revealRow: (data: RevealRowData) => void;
}

declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

/**
 * Custom Typed EventEmitter for WebSocket events
 */
class MyEventEmitter extends EventEmitter {}

/** Event emitter for WebSocket events */
export const ee = new MyEventEmitter();
