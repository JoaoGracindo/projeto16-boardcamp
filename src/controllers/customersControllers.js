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
        const {rows} = await database.query('SELECT * FROM customers WHERE id=$1;', [id]);
        if(!rows[0]) return res.sendStatus(404);
        return res.send(rows[0]);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function postCustomersController(req, res){

    const {name, phone, cpf, birthday} = req.body;

    try{
        await database.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);

    }
}


export async function putCustomersController(req, res){
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;

    try{
        await database.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;', [name, phone, cpf, birthday, id]);
        return res.sendStatus(200);

    }catch(err){
        return res.status(500).send(err.message);

    }
}