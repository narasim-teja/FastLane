/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { EventEmitter, on } from "node:events";

import type { BroadcastPositionData, RevealRowData } from "~/types/ws";

export interface MyEvents {
  revealRow: (data: RevealRowData) => void;
  broadcastPosition: (data: BroadcastPositionData) => void;
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
class MyEventEmitter extends EventEmitter {
  public toIterable<TEv extends keyof MyEvents>(event: TEv) {
    return on(this, event) as AsyncIterable<Parameters<MyEvents[TEv]>>;
  }
}
/** Event emitter for WebSocket events */
export const ee = new MyEventEmitter();
