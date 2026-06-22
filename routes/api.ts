import { Application } from 'bushjs';
import { AuthController } from '@app/Http/Controllers/AuthController';
import { BlogController } from '@app/Http/Controllers/BlogController';
import { ProductController } from '@app/Http/Controllers/ProductController';
import { EventController } from '@app/Http/Controllers/EventController';
import { RegistrationController } from '@app/Http/Controllers/RegistrationController';
import { UploadController } from '@app/Http/Controllers/UploadController';
import { AdminMiddleware } from '@app/Http/Middleware/AdminMiddleware';

export function registerRoutes(app: Application) {
  const Router = app.router;
  Router.middlewareGroup('admin', [new AdminMiddleware() as any]);

  // Auth — public
  Router.post('/api/auth/login', [AuthController, 'login']);
  Router.post('/api/auth/signup', [AuthController, 'signup'], ['admin']);
  Router.post('/api/logout', [AuthController, 'logout']);

  // Blogs — public GET, admin POST/PUT/DELETE
  Router.get('/api/blogs', [BlogController, 'index']);
  Router.get('/api/blogs/:slug', [BlogController, 'show']);
  Router.post('/api/blogs', [BlogController, 'store'], ['admin']);
  Router.put('/api/blogs/:id', [BlogController, 'update'], ['admin']);
  Router.delete('/api/blogs/:id', [BlogController, 'destroy'], ['admin']);

  // Products — public GET, admin POST/PUT/DELETE
  Router.get('/api/products', [ProductController, 'index']);
  Router.get('/api/products/:id', [ProductController, 'show']);
  Router.post('/api/products', [ProductController, 'store'], ['admin']);
  Router.put('/api/products/:id', [ProductController, 'update'], ['admin']);
  Router.delete('/api/products/:id', [ProductController, 'destroy'], ['admin']);

  // Events — public GET, admin POST/PUT/DELETE
  Router.get('/api/events', [EventController, 'index']);
  Router.get('/api/events/:slug', [EventController, 'show']);
  Router.post('/api/events', [EventController, 'store'], ['admin']);
  Router.put('/api/events/:id', [EventController, 'update'], ['admin']);
  Router.delete('/api/events/:id', [EventController, 'destroy'], ['admin']);

  // Registrations — public POST, admin GET/DELETE
  Router.post('/api/registrations', [RegistrationController, 'store']);
  Router.get('/api/registrations', [RegistrationController, 'index'], ['admin']);
  Router.delete('/api/registrations/:id', [RegistrationController, 'destroy'], ['admin']);

  // Upload — public verify, admin CRUD
  Router.get('/api/upload/verify', [UploadController, 'verify']);
  Router.post('/api/upload', [UploadController, 'store'], ['admin']);
  Router.get('/api/upload', [UploadController, 'index'], ['admin']);
  Router.delete('/api/upload/:id', [UploadController, 'destroy'], ['admin']);
}
