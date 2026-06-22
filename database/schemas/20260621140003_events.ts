import { BaseSchema } from 'bushjs';

export default class EventsSchema extends BaseSchema {
  async up(): Promise<void> {
    await this.createCollection('events', (schema) => {
      schema.id();
      schema.string('title', 255, true);
      schema.string('slug', 255, true).unique();
      schema.timestamp('date');
      schema.string('location');
      schema.string('type');
      schema.text('description');
      schema.string('images');
      schema.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.dropCollection('events');
  }
}
