const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const usersModel = new Schema({
  name: {
    type: String,
    required: [true, 'Maaf Nama Depan Harus di isi']
  },
  email: {
    type: String, 
    required: [true, 'Maaf, Email Harus di isi'],
    unique: true
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  create_at: {
    type: Date,
    default: new Date()
  },
  update_at: {
    type: Date
  }
});

// usersModel.pre('save',function (next) {
//   if (this.isModified('password') || this.isNew) {
//     let salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//     next();
//   }
//   next();
// });

const Users = mongoose.model('Users', usersModel);

module.exports = Users;