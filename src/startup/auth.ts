import { auth } from 'bushjs';
import type { UserProvider } from 'bushjs';
import { User } from '@app/Models/User';

export function configureAuth(): void {
  const userProvider: UserProvider = {
    async findById(id: string) {
      const doc = await User.find(id);
      return doc ? (doc as any).toObject() : null;
    },
    async validate(credentials: Record<string, any>) {
      const user = await User.findByEmail(credentials.email);
      return user ? (user as any).toObject() : null;
    },
  };

  auth.setUserProvider(userProvider);
}
