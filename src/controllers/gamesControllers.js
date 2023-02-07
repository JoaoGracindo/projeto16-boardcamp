import database from '../database/database.js';

export async function getGamesController(req, res){

    const games = await database.query('SELECT * FROM games;');

    return res.send(games.rows);
}


export async function postGamesController(req, res){

    const {name, stockTotal, pricePerDay, image} = req.body;

    try{
        await database.query('INSERT INTO games (name, "stockTotal", "pricePerDay", image) VALUES ($1, $2, $3, $4);', [name, stockTotal, pricePerDay, image]);
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);

    }
}