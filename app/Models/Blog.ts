import { Model } from 'bushjs';

export class Blog extends Model {
  static collection = 'blogs';

  static fields = {
    title: { type: 'string' as const, required: true },
    slug: { type: 'string' as const, required: true, unique: true },
    content: { type: 'string' as const, required: true },
    category: { type: 'string' as const, required: true },
    author: { type: 'string' as const, required: true },
    image: { type: 'string' as const },
    publishedAt: { type: 'date' as const },
  };
}
