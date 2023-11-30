import { WebSocket as NodeWebSocket } from 'ws';

if (!globalThis.WebSocket) {
  // @ts-expect-error
  globalThis.WebSocket = NodeWebSocket;
}

export const WebSocket = globalThis.WebSocket;
