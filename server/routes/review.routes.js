import { Router } from 'express'
import reviewController from '../controllers/review.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const reviewRouter = Router({ mergeParams: true })

reviewRouter.get('/', reviewController.getReviewsOf)

//NOTE: Routes below this are protected
reviewRouter.use(authMiddleware.protect)
reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.checkUser, reviewController.updateReview)
  .delete(reviewController.checkUser, reviewController.deleteReview)

reviewRouter
  .route('/')
  .post(
    reviewController.setUserIds,
    authMiddleware.restrictTo('client'),
    reviewController.createReview,
  )

export default reviewRouter
