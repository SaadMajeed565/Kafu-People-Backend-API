import { Request, Response } from 'bushjs';
import { Controller } from 'bushjs';
import { Blog } from '@app/Models/Blog';

export class BlogController extends Controller {
  async index(request: Request, response: Response) {
    try {
      const blogs = await Blog.all();
      this.json(response, blogs);
    } catch {
      response.status(500).json({ message: 'Failed to fetch blogs' });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const blog = await Blog.where('slug', request.params.slug).first();
      if (!blog) {
        return response.status(404).json({ message: 'Blog not found' });
      }
      this.json(response, blog);
    } catch {
      response.status(500).json({ message: 'Failed to fetch blog' });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const { title, slug, content, category, author } = body;
      const blogSlug = slug || title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const blog = await Blog.create({
        title, slug: blogSlug, content, category, author,
        publishedAt: new Date(),
        image: (request as any).file?.filename || '',
      });
      response.status(201).json(blog);
    } catch {
      response.status(500).json({ message: 'Failed to create blog' });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const updated = await Blog.update(request.params.id, request.body as any);
      if (!updated) {
        return response.status(404).json({ message: 'Blog not found' });
      }
      this.json(response, updated);
    } catch {
      response.status(500).json({ message: 'Failed to update blog' });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const deleted = await Blog.delete(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Blog not found' });
      }
      this.json(response, { message: 'Blog deleted' });
    } catch {
      response.status(500).json({ message: 'Failed to delete blog' });
    }
  }
}
