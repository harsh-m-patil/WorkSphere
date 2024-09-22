import { Schema, model } from 'mongoose'
import User from './user.model.js'

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'A review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'a review must have a rating'],
    },
    freelancer: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a freelancer'],
      immutable: true,
    },
    client: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must have a client'],
      immutable: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
)

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
  } else {
    await User.findByIdAndUpdate(freelancerId, {
      ratingsAverage: 4,
      noOfRatings: 0,
    })
  }
}

reviewSchema.post('save', function () {
  // this points to current review
  // this.constructor points to the model
  this.constructor.calcAverageRating(this.freelancer)
})

reviewSchema.pre(/^find/, function (next) {
  // this points to query
  this.populate({
    path: 'client',
    select: 'userName photo',
  })

  this.populate({
    path: 'freelancer',
    select: 'firstName',
  })

  next()
})

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery())
  next()
})

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.r) {
    await this.r.constructor.calcAverageRating(this.r.freelancer._id)
  }
})

const Review = model('Review', reviewSchema)

export default Review
