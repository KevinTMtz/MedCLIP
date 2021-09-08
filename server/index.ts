import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello UwU!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
