import express from 'express'
const router = express.Router()
import { getAppInfo } from '../controllers/app.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

router.get('/info/users', authMiddleware.protect, getAppInfo)

export default router
