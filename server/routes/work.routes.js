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

router.get(
  '/',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelance'),
  workController.getWorks,
)

router.post(
  '/assign',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.deactivateWork,
  workController.assignWork,
)

export default router
