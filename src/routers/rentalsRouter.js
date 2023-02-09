import { Router } from "express";

import { getRentalsController } from "../controllers/rentalsControllers.js";


const router = Router();

router.get('/rentals', getRentalsController);


export default router;