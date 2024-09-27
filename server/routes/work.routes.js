import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import workController from '../controllers/work.controller.js'

const router = express.Router()

router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.setId,
  workController.createWork,
)

router.get('/', workController.getWorks)

router.post(
  '/assign',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.deactivateWork,
  workController.assignWork,
)

// router.post("/apply",authMiddleware.protect, authMiddleware.restrictTo('freelancer'),
// workController.applyWork)

router.post(
  '/apply',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  workController.applyWork,
)

export default router
