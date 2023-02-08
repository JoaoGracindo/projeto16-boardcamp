import customerSchema from '../model/customerSchema.js';
import database from '../database/database.js';

export async function postCustomerMiddleware(req, res, next){

    const newCustomer = req.body;
    const {error} = customerSchema.validate(newCustomer, {abortEarly: false});

    if(error){
        const errorArray = error.details.map((obj) => obj.message);
        return res.status(400).send(errorArray);
    }

    const {rows} = await database.query('SELECT * FROM customers WHERE cpf = $1;', [newCustomer.cpf]);

    if(rows[0]) return res.status(409).send('CPF already in use.');

    next();
}