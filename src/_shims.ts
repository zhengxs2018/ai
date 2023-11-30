import { WebSocket as NodeWebSocket } from 'ws';

export const WebSocket = globalThis.WebSocket || NodeWebSocket;
