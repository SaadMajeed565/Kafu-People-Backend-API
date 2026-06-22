export const app = {
  name: process.env.APP_NAME || 'kafu-people-backend',
  env: process.env.NODE_ENV || 'development',
  debug: (process.env.APP_DEBUG || 'false') === 'true',
  url: process.env.APP_URL || 'http://localhost:3000',
  port: parseInt(process.env.PORT || '3000', 10),
  timezone: process.env.APP_TIMEZONE || 'UTC',
};
