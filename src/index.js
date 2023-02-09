import  express, { json } from "express";
import cors from 'cors';
import  dotenv from "dotenv";
dotenv.config();

import gamesRouter from './routers/gamesRouter.js';
import customersRouter from './routers/customersRouter.js';
import rentalsRouter from './routers/rentalsRouter.js';

const PORT = process.env.PORT;

const app = express();
app.use(json());
app.use(cors());

app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}...`));