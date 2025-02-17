import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
