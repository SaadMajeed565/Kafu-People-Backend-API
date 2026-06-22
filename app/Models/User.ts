import { Model } from 'bushjs';

export class User extends Model {
  static collection = 'users';

  static fields = {
    email: { type: 'string' as const, required: true, unique: true },
    password: { type: 'string' as const, required: true },
    role: { type: 'string' as const, default: 'admin' },
  };

  static async findByEmail(email: string): Promise<any> {
    return await this.where('email', email).first();
  }
}
