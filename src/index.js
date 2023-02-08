import  express, { json } from "express";
import  dotenv from "dotenv";
dotenv.config();

import gamesRouter from './routers/gamesRouter.js';
import customersRouter from './routers/customersRouter.js';

const PORT = process.env.PORT;

const app = express();
app.use(json());

app.use(gamesRouter);
app.use(customersRouter);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}...`));