import express from 'express'

import userController from '../controllers/userController.js'
import authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(userController.getAllUsers)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.createUser,
  )

router.post('/login', authController.login)
router.post('/signup', authController.signup)

router
  .route('/:id')
  .get(authMiddleware.protect, userController.getUser)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.deleteUser,
  )

export default router
