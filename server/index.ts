import express, { Request, Response } from 'express';
import db from './db/connection';

import authRouter from './routers/auth';

const app = express();
const port = 3001;

// Connection to mysql database
(async () => {
  try {
    await db.authenticate;
    console.log('Database online');
  } catch (error) {
    throw new Error(error as string);
  }
})();

// Authentication router
app.use('/auth', authRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
