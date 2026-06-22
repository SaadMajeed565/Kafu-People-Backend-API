import { Application, Request, Response } from 'bushjs';

export function registerGlobalMiddleware(app: Application): void {
  app.middleware(async (request: Request, _response: Response, next: () => Promise<void>) => {
    console.log(`${request.method} ${request.path}`);
    await next();
  });
}
