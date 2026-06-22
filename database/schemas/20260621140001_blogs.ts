import { BaseSchema } from 'bushjs';

export default class BlogsSchema extends BaseSchema {
  async up(): Promise<void> {
    await this.createCollection('blogs', (schema) => {
      schema.id();
      schema.string('title', 255, true);
      schema.string('slug', 255, true).unique();
      schema.text('content', true);
      schema.string('category', 255, true);
      schema.string('author', 255, true);
      schema.string('image');
      schema.timestamp('publishedAt');
      schema.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.dropCollection('blogs');
  }
}
