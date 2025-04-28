import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/:id', authMiddleware.protect, getMessages)

router.post('/send/:id', authMiddleware.protect, sendMessage)

export default router
