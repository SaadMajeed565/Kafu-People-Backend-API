export const database = {
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/kafu-people',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    min: parseInt(process.env.DB_POOL_MIN || '2', 10),
  },
};
