import List from '../models/List.js';
import Word from '../models/Word.js';

export const addNewWord = async (req, res) => {
  try {
    const { eng, rus, listId } = req.body;

    const word = new Word({
      eng,
      rus,
      placeListId: listId,
    });

    await word.save();

    await List.findByIdAndUpdate(listId, {
      $push: { words: word._id },
    });

    res.json({ word, message: 'New word was added.' });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const updateWord = async (req, res) => {
  try {
    const { eng, rus, id } = req.body;

    await Word.findByIdAndUpdate(id, {
      $set: { eng, rus },
    });
    const word = await Word.findById(id);
    res.json({ word, message: 'Successfully edited.' });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const deleteWord = async (req, res) => {
  try {
    const id = req.params.id;
    const listId = req.params.listId;

    await Word.findByIdAndDelete(id);

    await List.findByIdAndUpdate(listId, {
      $pull: { words: id },
    });

    res.json({
      id,
      listId,
      message: 'Successfully deleted',
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const getListWords = async (req, res) => {
  try {
    const id = req.params.id;
    const words = await Word.find({ placeListId: id });

    if (words.length > 0) {
      res.json({ words });
    } else {
      res.json({
        words: [],
      });
    }
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const getWordsByListIds = async (req, res) => {
  try {
    const listIdsJSON = req.params.listIds;

    const listIds = JSON.parse(listIdsJSON);

    const sessionWords = await Promise.all(
      listIds.map((id) => {
        return Word.find({ placeListId: id });
      })
    );
    res.json({ sessionWords: sessionWords.flat() });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
