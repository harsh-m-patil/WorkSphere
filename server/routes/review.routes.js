import { Router } from 'express'
import reviewController from '../controllers/review.controller.js'

const reviewRouter = Router()

reviewRouter.get('/', reviewController.getReviews)

export default reviewRouter
