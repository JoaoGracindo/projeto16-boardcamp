import database from '../database/database.js';

export async function getCustomersController(req, res){

    try{
        const customers = await database.query('SELECT * FROM customers;');
        return res.send(customers.rows);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getCustomersByIdController(req, res){

    const {id} = req.params;

    try{
        const customers = await database.query('SELECT * FROM customers WHERE id=$1;', [id]);
        return res.send(customers.rows);

    }catch(err){
        return res.status(500).send(err.message);
    }
}