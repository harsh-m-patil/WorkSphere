import Review from '../models/review.model.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'

const reviewController = {
  createReview: factory.createOne(Review),
  deleteReview: factory.deleteOne(Review),
  updateReview: factory.updateOne(Review),
  getReview: factory.getOne(Review),
  getReviews: factory.getAll(Review),

  /**
   * @description: check if the review belongs to the user
   */
  //TODO: modify to avoid multiple querys from database
  checkUser: asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id)

    if (review.client?.id != req.user.id) {
      return next(
        new AppError('You are not allowed to modify this review', 403),
      )
    }

    next()
  }),

  // NOTE: Set client id of logged in user from req.user and freelancer id
  // from req.params
  setUserIds: (req, res, next) => {
    // ALlow Nested Routes
    if (!req.body.freelancer) req.body.freelancer = req.params.id
    if (!req.body.client) req.body.client = req.user.id
    next()
  },

  /**
   * @description get reviews of a given user
   */
  getReviewsOf: asyncHandler(async (req, res, next) => {
    const query = {}
    if (req.params.id) {
      query.freelancer = req.params.id
    }

    const reviews = await Review.find(query)

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    })
  }),
}

export default reviewController
