import mongoose from 'mongoose'

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  joblevel: {
    type: String,
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: '{VALUE} is invalid',
    },
    default: 'Medium',
  },
  skills_Required: {
    type: [String],
    required: true,
  },
  applied_status: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  freelancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

workSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client_id',
    select: 'userName email',
  })
  next()
})

const Work = mongoose.model('Work', workSchema)

export default Work
