import Review from '../models/review.model.js'
import factory from './factory.controller.js'

const reviewController = {
  createReview: factory.createOne(Review),
  deleteReview: factory.deleteOne(Review),
  updateReview: factory.updateOne(Review),
  getReview: factory.getOne(Review),
  getReviews: factory.getAll(Review),
}

export default reviewController
