import express from 'express'
const router = express.Router()
import { getAppInfo } from '../controllers/app.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

// Routes below this are protected
router.use(authMiddleware.protect)

// Routes below this are restricted to admin
router.use(authMiddleware.restrictTo('admin'))
router.get('/info/users', getAppInfo)

export default router
