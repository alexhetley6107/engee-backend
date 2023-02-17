import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WordPair',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('List', ListSchema);
