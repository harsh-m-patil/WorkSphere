import express from 'express'

import authMiddleware from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import workController from '../controllers/work.controller.js'

const router = express.Router()


router.post("/",authMiddleware.protect,authMiddleware.restrictTo('client'),
workController.setId,
workController.createWork);

export default router