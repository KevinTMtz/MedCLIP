import { Router, Request, Response } from 'express';
import config from '../config/config';
import IUser from '../db/interfaces/IUser';
import User from '../db/models/User';
import jwt from 'jsonwebtoken';

const router = Router();

const signJWT = (user: IUser) => {
  let startTime = new Date().getTime();
  let expirationTime = startTime + Number(config.token.expireTime) * 100000;
  expirationTime = Math.floor(expirationTime / 1000);
  try {
    jwt.sign(
      {
        username: user.name,
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTime,
      },
      (error, token) => {
        if (error) {
          console.log(console.error);
          return null;
        } else if (token) {
          return token;
        }
      }
    );
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

router.post('/login', async (req: Request, res: Response) => {
  const { body } = req;
  const user = await User.build(body);
  await user.save();
  res.send('saved');
});

export default router;
