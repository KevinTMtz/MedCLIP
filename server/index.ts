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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello UwU!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
