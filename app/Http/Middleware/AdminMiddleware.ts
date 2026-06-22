import { Request, Response } from 'bushjs';
import jwt from 'jsonwebtoken';

export class AdminMiddleware {
  async handle(request: Request, response: Response, next: () => Promise<void>): Promise<void> {
    const authHeader = request.header('Authorization');
    const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    if (!headerValue || !headerValue.startsWith('Bearer ')) {
      response.status(401).json({ message: 'Unauthenticated' });
      return;
    }

    const token = headerValue.slice(7);
    (request as any).token = token;

    try {
      const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET || '', { algorithms: ['HS256'] });
      (request as any).user = decoded;
      (request as any).userId = (decoded as any).id || (decoded as any)._id;
      await next();
    } catch {
      response.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
