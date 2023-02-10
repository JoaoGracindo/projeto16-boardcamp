import { Router } from "express";

import { getRentalsController, postRentalsController, endRentalsController, deleteRentalController } from "../controllers/rentalsControllers.js";
import { postRentalsMiddleware, rentalVerificationMiddleware, deleteRentalsMiddleware } from "../middlewares/rentalsMiddlewares.js";


const router = Router();

router.get('/rentals', getRentalsController);
router.post('/rentals', postRentalsMiddleware, postRentalsController);
router.post('/rentals/:id/return', rentalVerificationMiddleware, endRentalsController);
router.delete('/rentals/:id', deleteRentalsMiddleware,deleteRentalController );


export default router;