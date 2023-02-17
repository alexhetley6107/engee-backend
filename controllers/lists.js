import List from '../models/List.js';
import User from '../models/User.js';

export const createList = async (req, res) => {
  try {
    const { name } = req.body;

    const list = await List.exists({ name });
    if (list) {
      return res.json({
        message: 'Such list name is already exist.',
      });
    }

    const newList = new List({
      name,
      words: [],
      owner: req.userId,
    });
    newList.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { lists: newList },
    });

    res.json(newList);
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const getUserLists = async (req, res) => {
  try {
    const userLists = await List.find({ owner: req.userId });

    if (userLists.length > 0) {
      res.json(userLists);
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
    res.json({
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
    const { id } = req.body;
    await List.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.userId, {
      $pull: { lists: id },
    });
    res.json({
      message: 'List was deleted',
    });
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
