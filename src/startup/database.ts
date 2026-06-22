import { Application } from 'bushjs';

export function connectDatabase(app: Application): void {
  app.database.connect().catch((error: unknown) => {
    console.warn(
      'Database connection failed, continuing without database:',
      error instanceof Error ? error.message : String(error)
    );
  });
}
