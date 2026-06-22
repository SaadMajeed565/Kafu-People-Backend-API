import { BaseSchema } from 'bushjs';

export default class UsersSchema extends BaseSchema {
  async up(): Promise<void> {
    await this.createCollection('users', (schema) => {
      schema.id();
      schema.string('name', 255);
      schema.string('email', 255, true).unique();
      schema.string('password', 255, true);
      schema.string('role', 50);
      schema.string('image');
      schema.text('bio');
      schema.string('position', 255);
      schema.string('location', 255);
      schema.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.dropCollection('users');
  }
}
