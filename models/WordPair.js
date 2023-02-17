import mongoose from 'mongoose';

const WordPairSchema = new mongoose.Schema({
  eng: {
    type: String,
    required: true,
    unique: true,
  },
  rus: {
    type: String,
    required: true,
  },
});

export default mongoose.model('WordPair', WordPairSchema);
