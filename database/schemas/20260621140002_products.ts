import { BaseSchema } from 'bushjs';

export default class ProductsSchema extends BaseSchema {
  async up(): Promise<void> {
    await this.createCollection('products', (schema) => {
      schema.id();
      schema.string('name', 255, true);
      schema.string('slug', 255, true).unique();
      schema.string('category', 255, true);
      schema.text('description');
      schema.string('image');
      schema.string('portfolio_id');
      schema.string('url');
      schema.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.dropCollection('products');
  }
}
