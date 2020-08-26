const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
},
{
  timestamps: true,
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
