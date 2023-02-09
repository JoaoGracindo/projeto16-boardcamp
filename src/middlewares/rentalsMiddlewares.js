import database from '../database/database.js';

export async function postRentalsMiddleware(req, res, next){

    const {customerId, gameId, daysRented} = req.body;
    let validCustomer;
    let validGame;    
    let gamesRented;
    
    try{
        validCustomer = await database.query('SELECT * FROM customers WHERE id=$1;', [customerId]);
        validGame = await database.query('SELECT * FROM games WHERE id=$1;', [gameId]);
        gamesRented = await database.query('SELECT * FROM rentals WHERE gameId=$1 AND returnDate=null', [gameId]);

    }catch(err){
        return res.status(500).send(err.message);

    }

    const isValidCustomer = validCustomer.rows[0];
    const gameExists = validGame.rows[0];
    const areAvailableGames = gameExists.stockTotal - gamesRented.rows.length;

    if(!isValidCustomer || !gameExists || daysRented < 1 || areAvailableGames < 1) return res.sendStatus(400);

    next();
}