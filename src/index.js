import  express, { json } from "express";
import  dotenv from "dotenv";
dotenv.config();

import gamesRouter from './routers/gamesRouter.js'

const PORT = process.env.PORT;

const app = express();
app.use(json());

app.use(gamesRouter);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}...`));