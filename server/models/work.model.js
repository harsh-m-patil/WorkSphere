import mongoose from 'mongoose'

const workSchema = new mongoose.Schema(
  {
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
    applied_status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    noOfApplicants: {
      type: Number,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

workSchema.index({ title: 'text', skills_Required: 'text' })

workSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'client_id',
    select: 'userName email',
  })
  next()
})

const Work = mongoose.model('Work', workSchema)

export default Work
