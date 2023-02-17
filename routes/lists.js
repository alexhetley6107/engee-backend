import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createList, getUserLists, deleteList, renameList } from '../controllers/lists.js';

const router = new Router();

router.post('/', checkAuth, createList);

router.get('/', checkAuth, getUserLists);

router.delete('/', checkAuth, deleteList);

router.put('/', checkAuth, renameList);

export default router;
