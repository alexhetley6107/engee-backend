import mongoose from 'mongoose';

const WordPairSchema = new mongoose.Schema({
  eng: {
    type: String,
    required: true,
  },
  rus: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
});

export default mongoose.model('WordPair', WordPairSchema);
