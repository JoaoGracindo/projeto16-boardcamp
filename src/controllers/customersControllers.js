import database from '../database/database.js';

export async function getCustomersController(req, res){

    try{
        const customers = await database.query('SELECT * FROM customers;');
        return res.send(customers.rows);

    }catch(err){
        return res.status(500).send(err.message);
    }
}