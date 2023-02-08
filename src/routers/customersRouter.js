import { Router } from "express";

import { getCustomersController } from "../controllers/customersControllers.js";

const router = Router();

router.get('/customers', getCustomersController);

router.get('/customers/:id');

router.post('/customers');

router.put('/customers/:id');


export default router;