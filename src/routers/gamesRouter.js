import { Router } from 'express';
import {getGamesController} from '../controllers/gamesControllers.js';

const router = Router();

router.get('/games', getGamesController);
//router.post('/games',);

export default router;