import { Router } from 'express'
import reviewController from '../controllers/review.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const reviewRouter = Router({ mergeParams: true })

/**
 * @openapi
 * /api/v1/reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews of a user
 *     description: Retrieve all reviews associated with a user.
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully.
 */
// Get reviews of a user
reviewRouter.get('/', reviewController.getReviewsOf)

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get a single review by ID
 *     description: Retrieve details of a single review using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details retrieved successfully.
 */
// Get a single review
reviewRouter.route('/:id').get(reviewController.getReview)

//NOTE: Routes below this are protected
reviewRouter.use(authMiddleware.protect)

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   patch:
 *     tags:
 *       - Reviews
 *     summary: Update a review
 *     description: Update an existing review. Only the owner of the review can perform this action.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review
 *     description: Delete an existing review. Only the owner of the review can perform this action.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted successfully.
 */
// Update and delete review
reviewRouter
  .route('/:id')
  .patch(reviewController.checkUser, reviewController.updateReview)
  .delete(reviewController.checkUser, reviewController.deleteReview)

/**
 * @openapi
 * /api/v1/reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a new review
 *     description: Create a new review. Only clients are allowed to perform this action.
 *     requestBody:
 *       description: Review details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully.
 */
// Create review (only clients can do this)
reviewRouter
  .route('/')
  .post(
    reviewController.setUserIds,
    authMiddleware.restrictTo('client'),
    reviewController.createReview,
  )

export default reviewRouter
