import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import config from '../config/config';
import verifyJWT from '../middlewares/verifyJWT';
import User from '../db/models/User';

const router = Router();

router.post(
  '/update-my-user',
  body('name').isString(),
  body('password').isString(),
  verifyJWT,
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    let { name, password } = req.body;
    let email = res.locals.jwt.email;
    bcrypt.hash(password, 16, async (error, hash) => {
      if (error) {
        return res.status(500).json({ message: error.message, error: error });
      }
      await User.update(
        { name: name, password: hash },
        { where: { email: email } },
      ).then(
        (user) => {
          console.log('User updated');
          return res
            .status(200)
            .json({ message: 'Your user has been updated' });
        },
        (err) => {
          console.log(err);
          return res.status(400).json({ err });
        },
      );
    });
  },
);

router.post('/delete-my-user', verifyJWT, async (_: Request, res: Response) => {
  let email = res.locals.jwt.email;
  await User.findOne({ where: { email: email } }).then(
    (user) => {
      if (!user) {
        return res.status(400).json({ message: 'The email does not exist' });
      }
      user?.destroy().then(
        () => {
          console.log('User deleted');
          return res
            .status(200)
            .json({ message: 'Your user has been deleted' });
        },
        (err) => {
          console.log(err);
          return res.status(400).json({ err });
        },
      );
    },
    (err) => {
      console.log(err);
      return res.status(400).json({ err });
    },
  );
});

export default router;
