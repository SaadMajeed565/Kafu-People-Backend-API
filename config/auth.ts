export const auth = {
  jwt_secret: process.env.AUTH_JWT_SECRET || '',
  session_secret: process.env.AUTH_SESSION_SECRET || '',
  guard: 'api' as const,
  hash_rounds: 10,
};
