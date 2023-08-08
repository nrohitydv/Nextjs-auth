import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpirey: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export default mongoose.model('User', userSchema);
