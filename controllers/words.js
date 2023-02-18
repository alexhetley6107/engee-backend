import List from '../models/List.js';
import Word from '../models/Word.js';

export const createWord = async (req, res) => {
  try {
    const { eng, rus, placeListId } = req.body;

    const word = await Word.exists({ eng, placeListId });
    if (word) {
      return res.json({
        message: 'Such word is already added to the list.',
      });
    }

    const newWordPair = new Word({
      eng,
      rus,
      placeListId,
    });
    console.log(newWordPair);
    newWordPair.save();

    await List.findByIdAndUpdate(placeListId, {
      $push: { words: newWordPair },
    });

    res.json(newWordPair);
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const updateWord = async (req, res) => {
  try {
    const { eng, rus, id, placeListId } = req.body;

    const word = await Word.exists({ eng, placeListId });
    if (word) {
      return res.json({
        message: 'Such word is already added to the list.',
      });
    }

    await Word.findByIdAndUpdate(id, {
      $set: { eng, rus },
    });
    res.json({
      message: 'Successfully updated',
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};

export const deleteWord = async (req, res) => {
  try {
    const { id, placeListId } = req.body;

    await Word.findByIdAndDelete(id);

    await List.findByIdAndUpdate(placeListId, {
      $pull: { words: id },
    });

    res.json({
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
    const { id } = req.body;

    const listWords = await Word.find({ placeListId: id });

    if (listWords.length > 0) {
      res.json(listWords);
    } else {
      res.json({
        message: 'No words.',
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
    const { listIds } = req.body;

    const sessionWords = await Promise.all(
      listIds.map((id) => {
        return Word.find({ placeListId: id });
      })
    );
    res.json(sessionWords.flat());
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
