const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
    maxLength: [40, "Username must be less than 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "This email is already in use"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password can be minimum of 08 length"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["freelancer", "client", "admin"],
      message: "Invalid role (must be user,employer or admin)",
    },
    default: "user",
  },
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
