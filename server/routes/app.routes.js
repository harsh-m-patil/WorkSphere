import express from 'express'
const router = express.Router()
import { getAppInfo } from '../controllers/app.controller.js'
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

export default router
