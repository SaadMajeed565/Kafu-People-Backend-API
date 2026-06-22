import { Request, Response } from 'bushjs';
import { Controller } from 'bushjs';
import { Product } from '@app/Models/Product';

export class ProductController extends Controller {
  async index(request: Request, response: Response) {
    try {
      const products = await Product.all();
      this.json(response, products);
    } catch {
      response.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const product = await Product.find(request.params.id);
      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }
      this.json(response, product);
    } catch {
      response.status(500).json({ message: 'Failed to fetch product' });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const { name, slug, category, description } = body;
      const productSlug = slug || name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const product = await Product.create({
        name, slug: productSlug, category, description,
        image: (request as any).file?.filename || '',
      });
      response.status(201).json(product);
    } catch {
      response.status(500).json({ message: 'Failed to create product' });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const updated = await Product.update(request.params.id, request.body as any);
      if (!updated) {
        return response.status(404).json({ message: 'Product not found' });
      }
      this.json(response, updated);
    } catch {
      response.status(500).json({ message: 'Failed to update product' });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const deleted = await Product.delete(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Product not found' });
      }
      this.json(response, { message: 'Product deleted' });
    } catch {
      response.status(500).json({ message: 'Failed to delete product' });
    }
  }
}
