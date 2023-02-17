import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createWord,
  getListWords,
  getWordsByListIds,
  deleteWord,
  updateWord,
} from '../controllers/words.js';

const router = new Router();

router.get('/', checkAuth, getListWords);

router.get('/session', checkAuth, getWordsByListIds);

router.post('/', checkAuth, createWord);

router.put('/', checkAuth, updateWord);

router.delete('/', checkAuth, deleteWord);

export default router;
