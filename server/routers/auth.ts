import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
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
  callback: (error: Error | null, token: string | null) => void,
) => {
  try {
    jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: config.token.expireTime,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      },
    );
  } catch (error: any) {
    console.log(error);
    callback(error, null);
  }
};

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
    let { email, password } = req.body;
    await User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
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
                res.cookie('token', token, {
                  httpOnly: true,
                  maxAge: config.httpCookie.maxage,
                });
                res.cookie('existToken', true, {
                  maxAge: config.httpCookie.maxage,
                });
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
  },
);

router.post(
  '/register',
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({
        message: 'Please fill all the fields correctly',
      });
    }
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
          signJWT(user, (error, token) => {
            if (error) {
              return res.status(500).json({
                message: error.message,
                error: error,
              });
            } else if (token) {
              res.cookie('token', token, {
                httpOnly: true,
                maxAge: config.httpCookie.maxage,
              });
              res.cookie('existToken', true, {
                maxAge: config.httpCookie.maxage,
              });
              return res.status(200).json({
                message: 'Registration successful',
                token: token,
                user: user,
              });
            }
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
    });
  },
);

router.post('/logout', verifyJWT, async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('existToken');
  res.status(200).json({ message: 'Logout succesful' });
});

export default router;
