import User from '../models/user.model.js'
import Work from '../models/work.model.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'

const userController = {
  /**
   * @description Create a new User
   */
  createUser: factory.createOne(User),

  /**
   * @param {Array} roles
   * @description Get users according to there roles
   * @example
   *
   * import {Router} from 'express'
   * import {getUsers} from '../controllers/userController.js'
   *
   * const router = Router()
   *
   * router.get("/clients",getUsers("clients"))
   */
  getUsers: (...roles) =>
    asyncHandler(async (req, res, next) => {
      const query = {}

      if (roles.length > 0) query.role = { $in: roles }

      const users = await User.find(query)

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users,
        },
      })
    }),

  /**
   * @description Get a user corresponding to a id given through `req.params`
   */
  getUser: factory.getOne(User),

  /**
   * @description Get details of logged in user by putting logged in users id
   * on req.params
   */
  getMe: (req, res, next) => {
    req.params.id = req.user.id
    next()
  },

  /**
   * @description Delete a user by his userID
   */
  deleteUser: factory.deleteOne(User),

  /**
   * @description Mark a user as inactive
   */
  deactivateUser: asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(204).send()
  }),

  updateUserForAdmin: factory.updateOne(User),

  updateUser: asyncHandler(async (req, res, next) => {
    //NOTE: Because Query Middleware doesnt work on findByIdAndUpdate
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for updating passwords', 400))
    }

    if (req.body.userName) {
      return next(new AppError('this route is not for updating userName', 400))
    }

    if (req.body.role) {
      return next(
        new AppError('You dont have the permission to change your role', 403),
      )
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedUser) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  }),

  //TODO: implement get my applications
  getMyApplications: asyncHandler(async (req, res, next) => {
    const works = Work.find({})

    res.status(200).json({
      status: 'success',
      data: {
        works,
      },
    })
  }),
}

export default userController
