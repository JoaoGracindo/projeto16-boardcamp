import database from '../database/database.js';

export async function postRentalsMiddleware(req, res, next){

    const {customerId, gameId, daysRented} = req.body;

    if(!(customerId > 0) || !(gameId > 0) || !(daysRented > 0))return res.sendStatus(400);

    let validCustomer;
    let validGame;    
    let gamesRented;
    
    try{
        validCustomer = await database.query('SELECT * FROM customers WHERE id=$1;', [customerId]);
        validGame = await database.query('SELECT * FROM games WHERE id=$1;', [gameId]);
        gamesRented = await database.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;', [gameId]);

    }catch(err){
        return res.status(500).send(err.message);

    }

    const isValidCustomer = validCustomer.rows[0];
    const gameExists = validGame.rows[0];
    const areAvailableGames = gameExists.stockTotal - gamesRented.rows.length;

    console.log(gameExists)

    if(!isValidCustomer || !gameExists || areAvailableGames < 1) return res.sendStatus(400);

    next();
}

export async function rentalVerificationMiddleware(req, res, next){

    const {id} = req.params;

    const {rows} = await database.query('SELECT * FROM rentals WHERE id=$1;', [id]);
    if(!rows[0]) return res.sendStatus(404);

    if(rows[0].returnDate !== null) return res.sendStatus(400);

    res.locals.rent = rows[0];

    next();
}

export async function deleteRentalsMiddleware(req, res, next){

    const {id} = req.params;

    const {rows} = await database.query('SELECT * FROM rentals WHERE id=$1;', [id]);
    if(!rows[0]) return res.sendStatus(404);

    if(rows[0].returnDate === null) return res.sendStatus(400);

    next();
}