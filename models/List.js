import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WordPair',
    },
  ],
});

export default mongoose.model('List', ListSchema);
