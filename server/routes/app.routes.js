import express from 'express'
const router = express.Router()
import { downloadData, getAppInfo } from '../controllers/app.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

/**
 * @openapi
 * /api/v1/app/info/users:
 *   get:
 *     tags:
 *       - AppInfo
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
 *       - Download
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

export default router
