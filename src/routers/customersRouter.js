import { Router } from "express";

import {
     getCustomersController,
     getCustomersByIdController,
     postCustomersController
    } from "../controllers/customersControllers.js";
    
import { postCustomerMiddleware } from "../middlewares/customersMiddlewares.js";


const router = Router();

router.get('/customers', getCustomersController);

router.get('/customers/:id', getCustomersByIdController);

router.post('/customers', postCustomerMiddleware, postCustomersController);

router.put('/customers/:id');


export default router;