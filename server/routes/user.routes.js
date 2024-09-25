import express from 'express'

import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import reviewRouter from './review.routes.js'
import { getAppInfo } from '../controllers/app.controller.js'

const router = express.Router()

router.use('/:id/reviews', reviewRouter)

router.get('/appInfo', getAppInfo)

// get users except the admins
router.route('/').get(userController.getUsers('freelancer', 'client'))

router
  .route('/me')
  .get(authMiddleware.protect, userController.getMe, userController.getUser)
  .patch(
    authMiddleware.protect,
    userController.getMe,
    userController.updateUser,
  )

// This routes will users
router.route('/freelancers').get(userController.getUsers('freelancer'))
router.route('/clients').get(userController.getUsers('client'))
router.route('/admins').get(userController.getUsers('admin'))
router.get(
  '/all',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  userController.getUsers(),
)

router.get('/:id', userController.getUser)

router.post('/login', authController.login)
router.post('/signup', authController.signup)

// Routes below this are protected
router.use(authMiddleware.protect)
router.post('/logout', authController.logout)

// Routes below this are restricted to admin
router.use(authMiddleware.restrictTo('admin'))

router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUserForAdmin)

router.post('/', userController.createUser)

export default router
