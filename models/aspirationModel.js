const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aspirationModel = new Schema({
  aspiration: {
    type: String,
    required: [true, 'aspirasi Harus Diisi']
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  img: {
    type: String
  },
  publish: {
    type: String,
    enum: ['N','Y'],
    default: 'N'
  },
  create_at: {
    type: Date,
    default: new Date()
  }
});

const Aspirations = mongoose.model('aspiration', aspirationModel);

module.exports = Aspirations;