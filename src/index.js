import  express, { json } from "express";
import  dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(json());

app.listen(PORT, () => console.log(`Server is running in port ${PORT}...`));