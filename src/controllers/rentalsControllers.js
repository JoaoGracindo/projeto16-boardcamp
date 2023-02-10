import dayjs from 'dayjs';

import database from '../database/database.js';


export async function getRentalsController(req, res){

    const {rows} = await database.query('SELECT * FROM rentals;');
    const rentalsArray = [];

    
    try{
        for(var i = 0; i < rows.length; i++){
            const customer = await database.query('SELECT id, name FROM customers WHERE id=$1;', [rows[i].customerId]);
            const game = await database.query('SELECT id, name FROM games WHERE id=$1;', [rows[i].gameId]);
        
            rows[i].customer = customer.rows[0];
            rows[i].game = game.rows[0];
        
            rentalsArray.push(rows[i]);
        }

        return res.status(200).send(rentalsArray);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function postRentalsController(req, res){

    const {customerId, gameId, daysRented} = req.body;
    const {rows} = await database.query('SELECT "pricePerDay" FROM games WHERE id=$1;', [gameId]);
    const originalPrice = rows[0].pricePerDay * daysRented;

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
        await database.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', Object.values(rentalInfo));
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function endRentalsController(req, res){

    const {id} = req.params;
    const {rent} = res.locals;
    const today = dayjs().format('YYYY-MM-DD');

    const {rentDate, daysRented, originalPrice} = rent;
    const estimatedReturn = dayjs(rentDate).add(Number(daysRented), 'day');

    const delayedDays = dayjs(today).diff(estimatedReturn, 'day');

    let fee = 0;
    if(delayedDays > 0) fee = delayedDays * (originalPrice/daysRented);

    try{
        await database.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;', [today, fee, id]);
        return res.sendStatus(200);

    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function deleteRentalController(req, res){

    const {id} = req.params;

    try{
        await database.query('DELETE FROM rentals WHERE id=$1;', [id]);
        return res.sendStatus(200);

    }catch(err){
        return res.status(500).send(err.message);
    }
}