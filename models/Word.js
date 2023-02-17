import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  eng: {
    type: String,
    required: true,
  },
  rus: {
    type: String,
    required: true,
  },
  placeListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
});

export default mongoose.model('Word', WordSchema);
