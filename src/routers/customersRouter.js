import { Router } from "express";

import {
     getCustomersController,
     getCustomersByIdController,
     postCustomersController,
     putCustomersController
} from "../controllers/customersControllers.js";
    
import { 
    postCustomerMiddleware,
    putCustomerMiddleware
} from "../middlewares/customersMiddlewares.js";


const router = Router();

router.get('/customers', getCustomersController);

router.get('/customers/:id', getCustomersByIdController);

router.post('/customers', postCustomerMiddleware, postCustomersController);

router.put('/customers/:id', putCustomerMiddleware, putCustomersController);


export default router;