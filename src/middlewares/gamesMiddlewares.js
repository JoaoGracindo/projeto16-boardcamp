import gameSchema from '../model/gameSchema.js';
import database from '../database/database.js';

export async function postGamesMiddleware(req, res, next){

    const newGame = req.body;
    const {error} = gameSchema.validate(newGame, {abortEarly: false});

    if(error){
        const errorArray = error.details.map((obj) => obj.message);
        return res.status(400).send(errorArray);
    }

    const gameExists = await database.query('SELECT * FROM games WHERE name = $1;', [newGame.name]);

    if(gameExists) return res.status(409).send('Name already in use.');

    next();
}