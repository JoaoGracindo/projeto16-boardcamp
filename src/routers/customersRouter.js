import { Router } from "express";

import {
     getCustomersController,
     getCustomersByIdController 
    } from "../controllers/customersControllers.js";


const router = Router();

router.get('/customers', getCustomersController);

router.get('/customers/:id', getCustomersByIdController);

router.post('/customers');

router.put('/customers/:id');


export default router;