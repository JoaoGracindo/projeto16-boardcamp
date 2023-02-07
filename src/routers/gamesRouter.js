import { Router } from 'express';
import {getGamesController, postGamesController} from '../controllers/gamesControllers.js';

const router = Router();

router.get('/games', getGamesController);
router.post('/games',postGamesController);

export default router;