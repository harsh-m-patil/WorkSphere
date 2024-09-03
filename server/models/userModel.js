import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxLength: [40, 'Username must be less than 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [true, 'This email is already in use'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password can be minimum of 08 length'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: {
      values: ['freelancer', 'client', 'admin'],
      message: 'Invalid role (must be freelancer,client or admin)',
    },
    default: 'freelancer',
  },
})

userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

const User = mongoose.model('User', userSchema)

export default User
