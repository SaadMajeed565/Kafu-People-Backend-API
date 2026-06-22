import { Application } from 'bushjs';
import { AuthController } from '@app/Http/Controllers/AuthController';
import { BlogController } from '@app/Http/Controllers/BlogController';
import { ProductController } from '@app/Http/Controllers/ProductController';
import { EventController } from '@app/Http/Controllers/EventController';
import { RegistrationController } from '@app/Http/Controllers/RegistrationController';
import { UploadController } from '@app/Http/Controllers/UploadController';
import { AdminMiddleware } from '@app/Http/Middleware/AdminMiddleware';

export function registerRoutes(app: Application) {
  app.router.middlewareGroup('admin', [new AdminMiddleware() as any]);

  // Auth — public
  app.post('/api/auth/login', [AuthController, 'login']);
  app.post('/api/auth/signup', [AuthController, 'signup'], ['admin']);
  app.post('/api/logout', [AuthController, 'logout']);

  // Blogs — public GET, admin POST/PUT/DELETE
  app.get('/api/blogs', [BlogController, 'index']);
  app.get('/api/blogs/:slug', [BlogController, 'show']);
  app.post('/api/blogs', [BlogController, 'store'], ['admin']);
  app.router.put('/api/blogs/:id', [BlogController, 'update'], ['admin']);
  app.router.delete('/api/blogs/:id', [BlogController, 'destroy'], ['admin']);

  // Products — public GET, admin POST/PUT/DELETE
  app.get('/api/products', [ProductController, 'index']);
  app.get('/api/products/:id', [ProductController, 'show']);
  app.post('/api/products', [ProductController, 'store'], ['admin']);
  app.router.put('/api/products/:id', [ProductController, 'update'], ['admin']);
  app.router.delete('/api/products/:id', [ProductController, 'destroy'], ['admin']);

  // Events — public GET, admin POST/PUT/DELETE
  app.get('/api/events', [EventController, 'index']);
  app.get('/api/events/:slug', [EventController, 'show']);
  app.post('/api/events', [EventController, 'store'], ['admin']);
  app.router.put('/api/events/:id', [EventController, 'update'], ['admin']);
  app.router.delete('/api/events/:id', [EventController, 'destroy'], ['admin']);

  // Registrations — public POST, admin GET/DELETE
  app.post('/api/registrations', [RegistrationController, 'store']);
  app.get('/api/registrations', [RegistrationController, 'index'], ['admin']);
  app.router.delete('/api/registrations/:id', [RegistrationController, 'destroy'], ['admin']);

  // Upload — public verify, admin CRUD
  app.get('/api/upload/verify', [UploadController, 'verify']);
  app.post('/api/upload', [UploadController, 'store'], ['admin']);
  app.get('/api/upload', [UploadController, 'index'], ['admin']);
  app.router.delete('/api/upload/:id', [UploadController, 'destroy'], ['admin']);
}
