import express from 'express'

import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .get(userController.getUsers())
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.createUser,
  )

router.post('/login', authController.login)
router.post('/signup', authController.signup)

router.route('/freelancers').get(userController.getUsers('freelancer'))
router.route('/clients').get(userController.getUsers('client'))

router.get(
  '/me',
  authMiddleware.protect,
  userController.getMe,
  userController.getUser,
)

router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.deleteUser,
  )

router.patch(
  '/me/extra-info',
  authMiddleware.protect,
  userController.addExtraInfo,
)

export default router
