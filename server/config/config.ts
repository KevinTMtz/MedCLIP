import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'medclip_dev';
const DB_USERNAME = process.env.DB_ROOT_USERNAME || 'username';
const DB_PASSWORD = process.env.DB_ROOT_PASSWORD || '';

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '6h';
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'MedClip';
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'medclip_secretcode';

const HTTP_COOKIE_MAXAGE =
  parseInt(process.env.HTTP_COOKIE_MAXAGE!) || 10800000;

const API_URL = process.env.API_URL || 'localhost:5000/';

const SERVER = {
  port: SERVER_PORT,
  host: SERVER_HOST,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
  db: {
    host: DB_HOST,
    name: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
  httpCookie: {
    maxage: HTTP_COOKIE_MAXAGE,
  },
  api: {
    url: API_URL,
  },
};

export default SERVER;
