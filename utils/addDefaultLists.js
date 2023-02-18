import defaultLists from '../defaultLists.js';
import List from '../models/List.js';
import User from '../models/User.js';
import Word from '../models/Word.js';

export const addDefaultLists = async (userId) => {
  defaultLists.forEach(async (l) => {
    const newList = new List({
      name: l.name,
      owner: userId,
    });
    await newList.save();
    await User.findByIdAndUpdate(userId, {
      $push: { lists: newList._id },
    });

    l.words.forEach(async ({ eng, rus }) => {
      const word = new Word({
        eng,
        rus,
        placeListId: newList._id,
      });
      await word.save();
      await List.findByIdAndUpdate(newList._id, {
        $push: { words: word._id },
      });
    });
  });
};
