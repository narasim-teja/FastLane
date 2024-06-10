import { EventEmitter } from "events";

export interface MyEvents {
  revealRow: (rowIdx: number, obstacles: number[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
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
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class MyEventEmitter extends EventEmitter {}

/** Event emitter for WebSocket events */
export const ee = new MyEventEmitter();
