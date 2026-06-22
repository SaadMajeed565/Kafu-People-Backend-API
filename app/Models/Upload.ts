import { Model } from 'bushjs';

export class Upload extends Model {
  static collection = 'uploads';

  static fields = {
    fileName: { type: 'string' as const },
    records: { type: 'string' as const },
    uploadedAt: { type: 'date' as const },
  };
}
