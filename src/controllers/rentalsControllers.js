import dayjs from 'dayjs';

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

export async function postRentalsController(req, res){

    const {customerId, gameId, daysRented} = req.body;
    const {rows} = await database.query('SELECT pricePerDay FROM games WHERE id=$1;', [gameId]);
    const originalPrice = rows[0] * daysRented;

    const rentalInfo = {
        customerId,
        gameId,
        rentDate: dayjs().format('YYYY-MM-DD'),    
        daysRented,              
        returnDate: null,           
        originalPrice,       
        delayFee: null             
    }

    try{
        await database.query('INSERT INTO rentals VALUES ($1, $2, $3, $4, $5, $6, $7);', [...rentalInfo]);
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);
    }
}