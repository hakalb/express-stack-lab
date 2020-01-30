import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 5,
    index: true,
    unique: true,
    dropDups: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    required: false
  },
  passwordHash: {
    //salted and hashed using bcrypt
    type: String,
    required: true
  }
});

export const UserModel = model('User', userSchema);
