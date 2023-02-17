import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createList, getUserLists, getWordsByListId } from '../controllers/lists.js';

const router = new Router();

router.post('/', checkAuth, createList);

router.get('/', checkAuth, getUserLists);

router.get('/:id', checkAuth, getWordsByListId);

export default router;
