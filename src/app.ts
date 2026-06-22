import { Application } from 'bushjs';
import { registerRoutes } from '@routes/index';
import { configureAuth } from './startup/auth';
import { connectDatabase } from './startup/database';
import { registerGlobalMiddleware } from './startup/middleware';

const app = new Application({
  basePath: process.cwd(),
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/bushjs',
});

configureAuth();
connectDatabase(app);
registerRoutes(app);
registerGlobalMiddleware(app);

app.listen(process.env.PORT ? parseInt(process.env.PORT, 10) : 3000).catch((error: unknown) => {
  console.error(error instanceof Error ? error : new Error(String(error)));
  process.exit(1);
});
