import express, { Application } from 'express';
import userRouter from './api/user';

const app: Application = express();

app.use(express.json());

app.use('/api/users', userRouter);

export default app;