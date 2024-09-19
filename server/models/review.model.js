import { Schema, model } from 'mongoose'
import User from './user.model.js'

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    freelancer: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a freelancer'],
    },
    client: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a client'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
)

reviewSchema.pre(/^find/, function (next) {
  // this points to query
  this.populate({
    path: 'client',
    select: 'userName photo',
  })

  next()
})

reviewSchema.statics.calcAverageRating = async function (freelancerId) {
  // this points to the model
  const stats = await this.aggregate([
    {
      $match: { freelancer: freelancerId },
    },
    {
      $group: {
        _id: '$freelancer',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])

  if (stats.length > 0) {
    await User.findByIdAndUpdate(freelancerId, {
      ratingsAverage: stats[0].avgRating,
      noOfRatings: stats[0].nRatings,
    })
  }
}

reviewSchema.post('save', function () {
  // this points to current review
  // this.constructor points to the model
  this.constructor.calcAverageRatings(this.freelancer)
})

const Review = model('Review', reviewSchema)

export default Review
