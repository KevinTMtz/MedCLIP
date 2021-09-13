import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('Verify token');
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.token.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    res.locals.jwt = decoded;
    next();
  });
};

export default verifyJWT;
