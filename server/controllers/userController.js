import User from '../models/userModel.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factoryController.js'

const userController = {
  /**
   * Create a new User
   */
  createUser: asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    user.password = undefined
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    })
  }),

  /**
   * Get all users from the DB
   */
  getAllUsers: asyncHandler(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    })
  }),

  /**
   * Get a user corresponding to a id given through `req.params`
   */
  getUser: asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  }),

  deleteUser: factory.deleteOne(User),
}

export default userController
