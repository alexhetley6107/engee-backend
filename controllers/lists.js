import List from '../models/List.js';
import User from '../models/User.js';

export const createList = async (req, res) => {
  try {
    const { name } = req.body;
    // const user = await User.findById(req.userId);

    const newList = new List({
      name,
      words: [],
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

export const renameList = async (req, res) => {
  try {
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
export const removeList = async (req, res) => {
  try {
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
