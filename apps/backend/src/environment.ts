export const CLIENT_URI: string =
  process.env.CLIENT_URI ?? 'http://localhost:4200';

export const SERVER_PORT_NUMBER: number =
  +process.env.SERVER_PORT_NUMBER ?? 3000;

export const DB_URI: string =
  process.env.DB_URI ?? 'mongodb://0.0.0.0:27017/The5ers-homework';

export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'yourSecretKey';

export const JWT_EXPIRY_TIME: string = process.env.JWT_EXPIRY_TIME ?? '1h';
