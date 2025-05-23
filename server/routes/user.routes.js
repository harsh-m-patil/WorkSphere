import express from 'express'

import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import reviewRouter from './review.routes.js'
import { upload } from '../middlewares/upload.js'
import { getAppInfo } from '../controllers/app.controller.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

router.use('/:id/reviews', reviewRouter)
const limiter = rateLimit({
  max: 100, // Maximum number of requests allowed per IP within the window
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  message: 'Too many requests from this IP, please try again in an hour.', // Custom error message sent when limit is exceeded
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers (deprecated)
})

/**
 * @openapi
 * /api/v1/users/appInfo:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get application information
 *     description: Retrieve application information such as user statistics for the admin dashboard.
 *     responses:
 *       200:
 *         description: Application information retrieved successfully.
 */
router.get('/appInfo', getAppInfo)

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users except admins
 *     description: Retrieve a list of all users except those with the 'admin' role.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 */
router.route('/').get(userController.getUsers('freelancer', 'client'))

/**
 * @openapi
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get details of the authenticated user
 *     description: Retrieve information about the currently authenticated user.
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update the authenticated user's information
 *     description: Update details of the currently authenticated user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete the authenticated user's account
 *     description: Remove the currently authenticated user's account.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 */
router
  .route('/me')
  .get(authMiddleware.protect, userController.getMe, userController.getUser)
  .patch(
    authMiddleware.protect,
    userController.getMe,
    userController.updateUser,
  )
  .delete(
    authMiddleware.protect,
    userController.getMe,
    userController.deleteUser,
  )

router.patch(
  '/me/profile-image',
  authMiddleware.protect,
  upload.single('profileImage'),
  userController.updateProfileImage,
)

/**
 * @openapi
 * /api/v1/users/freelancers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all freelancers
 *     description: Retrieve a list of all users with the role 'freelancer'.
 *     responses:
 *       200:
 *         description: List of freelancers retrieved successfully.
 */
router.route('/freelancers').get(userController.getUsers('freelancer'))

/**
 * @openapi
 * /api/v1/users/clients:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all clients
 *     description: Retrieve a list of all users with the role 'client'.
 *     responses:
 *       200:
 *         description: List of clients retrieved successfully.
 */
router.route('/clients').get(userController.getUsers('client'))

/**
 * @openapi
 * /api/v1/users/admins:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all admins
 *     description: Retrieve a list of all users with the role 'admin'.
 *     responses:
 *       200:
 *         description: List of admins retrieved successfully.
 */
router.route('/admins').get(userController.getUsers('admin'))

/**
 * @openapi
 * /api/v1/users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users (Admin only)
 *     description: Retrieve a list of all users in the system. This endpoint is restricted to admins.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 */
router.get(
  '/all',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  userController.getUsers(),
)

/**
 * @openapi
 * /api/v1/users/applications:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the authenticated user's applications
 *     description: Retrieve a list of applications submitted by the currently authenticated user.
 *     responses:
 *       200:
 *         description: List of applications retrieved successfully.
 */
router.get(
  '/applications',
  authMiddleware.protect,
  userController.getMyApplications,
)

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieve details of a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 */
router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    userController.deleteUser,
  )

/**
 * @openapi
 * /api/v1/users/u/{username}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by username
 *     description: Retrieve details of a user by their username.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 */
router.route('/u/:username').get(userController.getUserByUserName)

/**
 * @openapi
 * /api/v1/users/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log out the authenticated user
 *     description: Log out the currently authenticated user and invalidate their session.
 *     responses:
 *       200:
 *         description: Logout successful.
 */
router.post('/logout', authController.logout)

router.use(limiter)
/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log in a user
 *     description: Authenticate a user and issue a token.
 *     requestBody:
 *       description: Login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 */
router.post('/login', authController.login)

/**
 * @openapi
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign up a new user
 *     description: Register a new user in the system.
 *     requestBody:
 *       description: User details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
router.post('/signup', authController.signup)

export default router
