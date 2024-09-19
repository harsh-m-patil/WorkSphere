import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: [true, 'This username is already exists'],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This email is already in use'],
      lowercase: true,
      validate: [validator.isEmail, 'Invalid Email'],
    },
    photo: {
      type: String,
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
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['freelancer', 'client', 'admin'],
        message: 'Invalid role (must be freelancer,client or admin)',
      },
      default: 'freelancer',
    },
    skills: [String],
    languages: [String],
    certificates: [String],
    ratingsAverage: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    noOfRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

userSchema.index({ username: 1 })

// VIRTUAL
//userSchema.virtual('fullName').get(function () {
//  return this.firstName + ' ' + this.lastName
//})

// MIDDLEWARES
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

// DOCUMENT METHODS
userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword)

const User = mongoose.model('User', userSchema)

export default User
