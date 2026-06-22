import { Application } from 'bushjs';
import BlogSeeder from '../database/seeds/BlogSeeder';
import ProductSeeder from '../database/seeds/ProductSeeder';
import EventSeeder from '../database/seeds/EventSeeder';
import UserSeeder from '../database/seeds/UserSeeder';

const app = new Application({
  basePath: process.cwd(),
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/bushjs',
});

async function seed() {
  await app.database.connect();

  await new BlogSeeder().run();
  await new ProductSeeder().run();
  await new EventSeeder().run();
  await new UserSeeder().run();

  await app.database.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
