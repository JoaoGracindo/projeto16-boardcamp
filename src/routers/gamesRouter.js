import { Router } from 'express';

import {getGamesController, postGamesController} from '../controllers/gamesControllers.js';
import {postGamesMiddleware} from '../middlewares/gamesMiddlewares.js'

const router = Router();

router.get('/games', getGamesController);
router.post('/games', postGamesMiddleware, postGamesController);

export default router;