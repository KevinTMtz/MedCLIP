import dotenv from 'dotenv';

dotenv.config;

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_EXPIRETIME || 'MedClip';
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'ultrasecretcode';

const SERVER = {
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

export default SERVER;
