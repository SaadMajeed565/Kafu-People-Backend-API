import type { WebSocket } from 'bushjs';
import { Request } from 'bushjs';

export class ChatSocketHandler {
  async handle(ws: WebSocket, request: Request): Promise<void> {
    ws.on('message', (raw: Buffer) => {
      try {
        const msg = JSON.parse(raw.toString());
        const text = String(msg.text ?? JSON.stringify(msg));
        ws.send(JSON.stringify({ type: 'echo', text }));
      } catch {
        ws.send(JSON.stringify({ type: 'error', text: 'Invalid JSON' }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed:', request.path);
    });
  }
}
