import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../config/config';
import IUser from '../db/interfaces/IUser';
import User from '../db/models/User';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

// Create new token
const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
) => {
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
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    console.log(error);
    callback(error, null);
  }
};

router.get('/validate', verifyJWT, async (req: Request, res: Response) => {
  console.log('Token validated!');
  return res.status(200).json({
    message: 'Token validated!',
  });
});

router.post('/login', async (req: Request, res: Response) => {
  let { email, password } = req.body;

  await User.findOne({ where: { email: email } })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({
          message: 'The email does not exist!',
        });
      }
      bcrypt.compare(password, user.password, (err, hash) => {
        if (!hash) {
          return res.status(401).json({
            message: 'The email and the password do not match!',
          });
        } else {
          signJWT(user, (error, token) => {
            if (error) {
              return res.status(500).json({
                message: error.message,
                error: error,
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Authentication successful',
                token: token,
                user: user,
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/register', async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  bcrypt.hash(password, 16, (error, hash) => {
    if (error) {
      return res.status(500).json({ message: error.message, error: error });
    }

    const user = User.build({
      name: name,
      email: email,
      password: hash,
    });

    user
      .save()
      .then((user) => {
        return res.status(201).json({ user });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
});

export default router;
