import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import slugify from 'slugify'

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
        message: '{VALUE} is invalid',
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
  },
)

userSchema.index({ userName: 1 })

// VIRTUALS
userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

// MIDDLEWARES
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

// SLUGIFY USERNAME
userSchema.pre('save', function (next) {
  if (!this.isModified('userName')) return next()

  this.userName = slugify(this.userName, { lower: true })
  next()
})

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
  // 'this' points to the current query
  this.find({ active: { $ne: false } })
  this.select(['-__v', '-active'])
  next()
})

// DOCUMENT METHODS
userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword)

// SET
userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // Remove skills, languages, certificates if the role is not freelancer
    if (ret.role !== 'freelancer') {
      delete ret.skills
      delete ret.languages
      delete ret.certificates
    }
    if (ret.role === 'admin') {
      delete ret.ratingsAverage
      delete ret.noOfRatings
    }
    return ret
  },
})

userSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    // Remove skills, languages, certificates if the role is not freelancer
    if (ret.role !== 'freelancer') {
      delete ret.skills
      delete ret.languages
      delete ret.certificates
    }

    if (ret.role === 'admin') {
      delete ret.ratingsAverage
      delete ret.noOfRatings
    }
    return ret
  },
})

const User = mongoose.model('User', userSchema)

export default User
