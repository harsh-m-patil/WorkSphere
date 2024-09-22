import { Router } from 'express'
import reviewController from '../controllers/review.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const reviewRouter = Router({ mergeParams: true })

reviewRouter.get('/', reviewController.getReviewsOf)

reviewRouter.route('/:id').get(reviewController.getReview)

//NOTE: Routes below this are protected
reviewRouter.use(authMiddleware.protect)

reviewRouter
  .route('/:id')
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
