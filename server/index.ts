import express, { Request, Response } from 'express';
import db from './db/connection';

const app = express();
const port = 3001;

(async () => {
  try {
    await db.authenticate;
    console.log('Database online');
  } catch (error) {
    throw new Error(error as string);
  }
})();

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
