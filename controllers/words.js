import List from '../models/List.js';

export const getWordsByListId = async (req, res) => {
  try {
    // const { name } = req.body;
    // const list = await List.findOne(req.params.id);
  } catch (error) {
    console.log('### Error', error);
    res.json({
      message: 'Something went wrong.',
    });
  }
};
