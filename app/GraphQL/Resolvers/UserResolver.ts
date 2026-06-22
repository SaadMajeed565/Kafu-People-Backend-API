import { User } from '@app/Models/User';

export class UserResolver {
  static async users() {
    return await User.all();
  }

  static async userByEmail({ email }: { email: string }) {
    return await User.findByEmail(email);
  }

  static async createUser({ name, email }: { name: string; email: string }) {
    return await User.create({ email, role: 'admin' });
  }
}

export const rootValue = {
  users: UserResolver.users,
  userByEmail: UserResolver.userByEmail,
  createUser: UserResolver.createUser,
};
