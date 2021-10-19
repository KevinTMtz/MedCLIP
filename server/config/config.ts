import dotenv from 'dotenv';

dotenv.config;

const DB_NAME = process.env.DB_NAME || 'medclip_dev';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '1h';
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_EXPIRETIME || 'MedClip';
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'medclip_secretcode';

const SERVER = {
  port: SERVER_PORT,
  host: SERVER_HOST,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
  db: {
    name: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
};

export default SERVER;
