import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import verifyJWT from '../middlewares/verifyJWT';
import User from '../db/models/User';

const router = Router();

router.get('/get-my-info', verifyJWT, async (_: Request, res: Response) => {
  let id = res.locals.jwt.id;
  await User.findOne({ where: { id: id } }).then(
    (user) => {
      if (!user) {
        return res.status(400).json({ message: 'The user does not exist' });
      }
      return res.status(200).json({ user: user });
    },
    (err) => {
      console.log(err);
      return res.status(400).json({ err });
    },
  );
});

router.post(
  '/update-my-user',
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
  verifyJWT,
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Please fill all the fields correctly' });
    }
    let { name, email, password } = req.body;
    let id = res.locals.jwt.id;
    bcrypt.hash(password, 16, async (error, hash) => {
      if (error) {
        return res.status(500).json({ message: error.message, error: error });
      }
      await User.update(
        { name: name, email: email, password: hash },
        { where: { id: id } },
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
  let id = res.locals.jwt.id;
  await User.findOne({ where: { id: id } }).then(
    (user) => {
      if (!user) {
        return res.status(400).json({ message: 'The id does not exist' });
      }
      user.destroy().then(
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
