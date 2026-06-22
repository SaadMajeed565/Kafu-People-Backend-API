import { Application } from 'bushjs';
import { registerRoutes as registerApiRoutes } from './api';
import { registerRoutes as registerGraphQLRoutes } from './graphql';
import { registerRoutes as registerSocketRoutes } from './websocket';

export function registerRoutes(app: Application) {
  registerApiRoutes(app);
  registerGraphQLRoutes(app);
  registerSocketRoutes(app);
}
