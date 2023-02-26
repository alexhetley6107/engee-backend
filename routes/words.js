import { Router } from 'express';
import {
  addNewWord,
  getListWords,
  getWordsByListIds,
  deleteWord,
  updateWord,
} from '../controllers/words.js';

const router = new Router();

router.get('/:id', getListWords);

router.get('/session/:listIds', getWordsByListIds);

router.post('/', addNewWord);

router.put('/', updateWord);

router.delete('/:id/:listId', deleteWord);

export default router;
