import { Model } from 'bushjs';

export class Registration extends Model {
  static collection = 'registrations';

  static fields = {
    firstName: { type: 'string' as const, required: true },
    lastName: { type: 'string' as const, required: true },
    gender: { type: 'string' as const },
    age: { type: 'int' as const },
    email: { type: 'string' as const, required: true },
    city: { type: 'string' as const },
    course: { type: 'string' as const, required: true },
    education: { type: 'string' as const },
    highestDegree: { type: 'string' as const },
    referenceNo: { type: 'string' as const, unique: true },
  };
}
