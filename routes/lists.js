import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createList } from '../controllers/lists.js';

const router = new Router();

router.post('/', checkAuth, createList);

export default router;
