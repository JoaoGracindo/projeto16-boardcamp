import database from '../database/database.js';

export async function getRentalsController(req, res){

    const {rows} = await database.query('SELECT * FROM rentals;');

    try{
        const rentalsArray = rows.map(async (obj) =>{
            const customer = await database.query('SELECT id, name FROM customers WHERE id=$1;', [obj.customerId]);
            const game = await database.query('SELECT id, name FROM games WHERE id=$1;', [obj.gameId]);

            return {...obj, customer, game};
        });

        return res.status(200).send(rentalsArray);

    }catch(err){
        return res.status(500).send(err.message);
    }
}