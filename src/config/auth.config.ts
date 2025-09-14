export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1d', // 1 day
  },
  password: {
    saltRounds: 10,
    minLength: 8,
  },
  refreshToken: {
    expiresIn: '7d', // 7 days
  },
};
