export const {
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
} = process.env;

export const enum AuthMessages {
  USER_EXISTS = 'User already exists',
  NO_USER = `User doesn't exist`,
  INCORRECT_PASSWORD = 'Incorrect password',
  TOKEN_EXPIRED = 'Token expired',
  INVALID_TOKEN = 'Invalid token',
}
