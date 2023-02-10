import { Router } from "express";

import { getRentalsController, postRentalsController, endRentalsController } from "../controllers/rentalsControllers.js";
import { postRentalsMiddleware, rentalVerificationMIddleware } from "../middlewares/rentalsMiddlewares.js";


const router = Router();

router.get('/rentals', getRentalsController);
router.post('/rentals', postRentalsMiddleware, postRentalsController);
router.post('/rentals/:id/return', rentalVerificationMIddleware, endRentalsController);
router.delete('/rentals/:id', rentalVerificationMIddleware);


export default router;