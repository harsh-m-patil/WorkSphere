import { Router } from 'express'
import reviewController from '../controllers/review.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const reviewRouter = Router({ mergeParams: true })

// Get reviews of a user
reviewRouter.get('/', reviewController.getReviewsOf)

// Get a single review
reviewRouter.route('/:id').get(reviewController.getReview)

//NOTE: Routes below this are protected
reviewRouter.use(authMiddleware.protect)

// update and delete review
reviewRouter
  .route('/:id')
  .patch(reviewController.checkUser, reviewController.updateReview)
  .delete(reviewController.checkUser, reviewController.deleteReview)

// create review only client can do this
reviewRouter
  .route('/')
  .post(
    reviewController.setUserIds,
    authMiddleware.restrictTo('client'),
    reviewController.createReview,
  )

export default reviewRouter
