import { Model } from 'bushjs';

export class Product extends Model {
  static collection = 'products';

  static fields = {
    name: { type: 'string' as const, required: true },
    slug: { type: 'string' as const, required: true, unique: true },
    category: { type: 'string' as const, required: true },
    description: { type: 'string' as const },
    image: { type: 'string' as const },
    portfolio_id: { type: 'string' as const },
    url: { type: 'string' as const },
  };
}
