import express from 'express'
const router = express.Router()
import { downloadData, getAppInfo } from '../controllers/app.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import Transaction from '../models/transaction.model.js'
import {
  getAppSettings,
  updateAppSettings,
} from '../controllers/app.controller.js'

/**
 * @openapi
 * /api/v1/app/settings:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get application settings
 *     description: Retrieve the current application settings (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Application settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSubscription:
 *                   type: number
 *                   description: Client subscription configuration
 *                 freelancerSubcription:
 *                   type: number
 *                   description: Freelancer subscription configuration
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Settings not found
 *       500:
 *         description: Server error
 */
router.get(
  '/settings',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  getAppSettings,
)

/**
 * @openapi
 * /api/v1/app/settings:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update application settings
 *     description: Update the application settings (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientSubscription:
 *                 type: number
 *                 description: Client subscription configuration
 *               freelancerSubcription:
 *                 type: number
 *                 description: Freelancer subscription configuration
 *             required:
 *               - clientSubscription
 *               - freelancerSubcription
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSubscription:
 *                   type: number
 *                   description: Updated client subscription configuration
 *                 freelancerSubcription:
 *                   type: number
 *                   description: Updated freelancer subscription configuration
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Failed to update settings
 */
router.put(
  '/settings',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  updateAppSettings,
)

/**
 * @openapi
 * /api/v1/app/info/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get app data for the admin dashboard
 *     description: Get App data for the admin dashboard
 *     responses:
 *       200:
 *         description: App user info
 *       401:
 *         description: UnAuthorized
 */
router.get('/info/users', authMiddleware.protect, getAppInfo)

/**
 * @swagger
 * /api/v1/app/download:
 *   get:
 *     summary: Download data as JSON
 *     description: Fetches data from the specified MongoDB collection (model) and downloads it as a JSON file.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the model (collection) to fetch data from. Use the plural form (e.g., "users", "products").
 *     responses:
 *       200:
 *         description: Successfully retrieved and downloaded the data as a JSON file.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 description: A single document from the specified collection.
 *         headers:
 *           Content-Disposition:
 *             description: Indicates the filename of the downloaded JSON file.
 *             schema:
 *               type: string
 *               example: attachment; filename=users.json
 *       400:
 *         description: Invalid model name provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid model name
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get(
  '/download',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  downloadData,
)

/**
 * @openapi
 * /api/v1/app/revenue:
 *   get:
 *     tags:
 *       - Revenue
 *     summary: Get total revenue
 *     description: Calculates and returns the total revenue from all transactions
 *     responses:
 *       200:
 *         description: Total revenue calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   description: The total revenue amount
 *                   example: 25000.50
 *       500:
 *         description: Failed to calculate revenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Failed to calculate revenue
 */
router.get('/revenue', async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
        },
      },
    ])
    const totalRevenue = result[0]?.totalRevenue / 100 || 0
    res.json({ totalRevenue })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Failed to calculate revenue' })
  }
})

export default router
