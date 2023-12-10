import { WebSocket } from 'ws';

if (!globalThis.WebSocket) {
  // @ts-expect-error
  globalThis.WebSocket = WebSocket
}
