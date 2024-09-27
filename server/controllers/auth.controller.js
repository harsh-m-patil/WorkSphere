import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/user.model.js'
import AppError from '../utils/appError.js'
import factory from './factory.controller.js'

/**
 * @param {string} id
 * @returns {string} token
 * @description Sign a token with the user id
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

/**
 * @param {typeof User} user
 * @param {number} statusCode -http status code
 * @param {Response} res
 * @description Create and send a token to the user
 * @example
 * const user = await User.create(req.body)
 * createSendToken(user, 201, res)
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  // Set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }

  // Set secure cookie in production
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  // Send cookie
  res.cookie('jwt', token, cookieOptions)

  user.password = undefined
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

const authController = {
  signup: asyncHandler(async (req, res, next) => {
    // set balance to zero
    req.body.balance = 0

    // Restrict admin role for signup
    if (req.body?.role === 'admin') {
      return next(new AppError('Restricted role', 400))
    }

    const user = await User.create(req.body)

    createSendToken(user, 201, res)
  }),

  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // 1) Check if email and password exists
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    // 2) Check if user exists
    const user = await User.findOne({ email }).select('+password')

    // 3) Check if password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user, 200, res)
  }),

  logout: (req, res, next) => {
    res.clearCookie('jwt')
    return res.status(200).json({ status: 'success' })
  },
}

export default authController
