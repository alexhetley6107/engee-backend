import List from '../models/List.js';
import User from '../models/User.js';
import Word from '../models/Word.js';
import { addDefaultLists } from '../utils/addDefaultLists.js';

export const createList = async (req, res) => {
  try {
    const { name } = req.body;

    const newList = new List({
      name,
      words: [],
      owner: req.userId,
    });
    newList.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { lists: newList },
    });

    res.json({ newList, message: 'New list was added' });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const getUserLists = async (req, res) => {
  try {
    const lists = await List.find({ owner: req.userId });

    if (lists.length > 0) {
      res.json({ lists });
    } else {
      res.json({
        message: 'No lists.',
      });
    }
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const renameList = async (req, res) => {
  try {
    const { id, name } = req.body;

    await List.findByIdAndUpdate(id, {
      $set: { name },
    });
    const list = await List.findById(id);
    res.json({
      list,
      message: 'List was renamed',
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const deleteList = async (req, res) => {
  try {
    const id = req.params.id;
    await Word.deleteMany({ placeListId: id });
    await List.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.userId, {
      $pull: { lists: id },
    });
    res.json({
      id,
      message: 'List was deleted',
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const getDefaultLists = async (req, res) => {
  try {
    await addDefaultLists(req.userId);

    const lists = await List.find({ owner: req.userId });

    res.json({ lists });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
