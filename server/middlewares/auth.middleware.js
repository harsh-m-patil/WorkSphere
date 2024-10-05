import jwt from 'jsonwebtoken'
import { promisify } from 'node:util'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/user.model.js'

const authMiddleware = {
  protect: asyncHandler(async (req, res, next) => {
    // 1) Get token and check if it exists
    let token = req.cookies?.jwt
    if (!token) {
      token = req.headers.authorization?.startsWith('Bearer')
        ? req.headers.authorization?.split(' ')[1]
        : null
    }

    if (!token) {
      return next(
        new AppError('You are not logged in,please login to acesss', 401),
      )
    }
    // 2) Validate the token (Verification)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const user = await User.findById(decoded.id)
    if (!user) {
      return next(
        new AppError(
          'The user belonging to the token does no longer exist',
          401,
        ),
      )
    }
    req.user = user
    next()
  }),

  restrictTo:
    (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError(
            'You do not have permission to perform this action',
            403,
          ),
        )
      }
      next()
    },
}

export default authMiddleware
