import { Model } from 'bushjs';

export class Event extends Model {
  static collection = 'events';

  static fields = {
    title: { type: 'string' as const, required: true },
    slug: { type: 'string' as const, required: true, unique: true },
    date: { type: 'date' as const, required: true },
    location: { type: 'string' as const },
    type: { type: 'string' as const },
    description: { type: 'string' as const },
    images: { type: 'string' as const },
  };

  static async findBySlug(slug: string): Promise<any> {
    return await this.where('slug', slug).first();
  }
}
