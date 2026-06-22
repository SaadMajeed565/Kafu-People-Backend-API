import { Auth } from 'bushjs';
import { User } from '../../app/Models/User';

const userData = [
  { email: 'hello@kafupeople.com', password: 'kafuadmin123', role: 'admin' },
  { email: 'pauline@kafupeople.com', password: 'kafuadmin123', role: 'admin' },
  { email: 'william@kafupeople.com', password: 'kafuadmin123', role: 'admin' },
  { email: 'jared@kafupeople.com', password: 'kafuadmin123', role: 'admin' },
  { email: 'waqas@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'matheus@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'fawad@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'iendrel@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'ahsan@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'saifu@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'noor@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'gerardo@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'kainat@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'saad@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'brian@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'soban@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'nauman@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'rakib@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'himanshi@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'nodari@kafupeople.com', password: 'kafuteam123', role: 'team' },
  { email: 'mahenoor@kafupeople.com', password: 'kafuteam123', role: 'team' },
];

export default class UserSeeder {
  async run(): Promise<void> {
    const existing = await User.all();
    if (existing.length > 0) {
      console.log(`Users collection already has ${existing.length} documents, skipping seed.`);
      return;
    }

    for (const user of userData) {
      const hashedPassword = await Auth.hashPassword(user.password);
      await User.create({
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });
    }
    console.log(`Seeded ${userData.length} users.`);
  }
}
