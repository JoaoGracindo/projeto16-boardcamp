import database from '../database/database.js';

export async function getGamesController(req, res){

    const games = await database.query('SELECT * FROM games;');

    return res.send(games.rows);
}