const mongoose = require('mongoose');
const validatorPlugin = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'user must have a fullname'],
    lowercase: true,
  },

  email: {
    type: String,
    required: [true, 'user must have an email'],
    validate: [validatorPlugin.isEmail, 'user must have a valid email'],
    lowercase: true,
    unique: [true, 'user must have unique email'],
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minLength: [8, 'password must at least contains 8 characters'],
  },

  passwordConfirm: {
    type: String,
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'password not match',
    },
  },
  role: {
    type: String,
    enum: ['user', 'prestataire'],
    required: [true, 'user must have a role'],
  },
  phone: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: 'default.jpeg',
  },
  state: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.passwordVerification = async function (
  bodyPassword,
  basePassword
) {
  return await bcrypt.compare(bodyPassword, basePassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
