import express, { Request, Response } from 'express';
import db from './db/connection';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth';
import userRouter from './routers/users';
import casesRouter from './routers/cases';
import diagnosticsRouter from './routers/diagnostics';

const app = express();
const port = 3001;

// Connection to mysql database
(async () => {
  try {
    await db.authenticate;
    console.log('Database online');
    await db.sync().then(() => console.log('Tables created'));
  } catch (error) {
    //throw new Error(error as string);
    console.log(error);
  }
})();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Authentication router
app.use('/auth', authRouter);

// Users router
app.use('/manage-users', userRouter);

// Cases router
app.use('/cases', casesRouter);

// Diagnostics route
app.use('/diagnostics', diagnosticsRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
