import { Application } from 'bushjs';
import { ChatSocketHandler } from '@app/WebSockets/ChatSocketHandler';

export function registerRoutes(app: Application) {
  app.socket('/chat', ChatSocketHandler);
}
