import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import workController from '../controllers/work.controller.js'

const router = express.Router()

// for client to post about a work / create the work
router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.setId,
  workController.createWork,
)

// for everyone to get the works posted
router.get('/', workController.getWorks)

//for client to lastly assign work to some user
router.post(
  '/assign',
  authMiddleware.protect,
  authMiddleware.restrictTo('client'),
  workController.deactivateWork,
  workController.assignWork,
)

// for freelancer
router.post(
  '/apply',
  authMiddleware.protect,
  authMiddleware.restrictTo('freelancer'),
  workController.applyWork,
)

// for client to fetch his works
router.post('/myworks', workController.getmyWorks)

//for client to get users applied for specific work
router.post('/getUsersForWork', workController.getUsersForWork)

export default router
