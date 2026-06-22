import { Application, SchemaRunner } from 'bushjs';
import BlogsSchema from '../database/schemas/20260621140001_blogs';
import ProductsSchema from '../database/schemas/20260621140002_products';
import EventsSchema from '../database/schemas/20260621140003_events';
import UsersSchema from '../database/schemas/20260621140004_users';

const app = new Application({
  basePath: process.cwd(),
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/kafu-people',
});

async function migrate() {
  await app.database.connect();

  const runner = new SchemaRunner();
  const isRollback = process.argv.includes('--rollback');

  if (isRollback) {
    console.log('Rolling back schemas...');
    runner
      .add(new UsersSchema())
      .add(new EventsSchema())
      .add(new ProductsSchema())
      .add(new BlogsSchema());
    await runner.rollback();
  } else {
    console.log('Running schemas...');
    runner
      .add(new BlogsSchema())
      .add(new ProductsSchema())
      .add(new EventsSchema())
      .add(new UsersSchema());
    await runner.run();
  }

  await app.database.disconnect();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
