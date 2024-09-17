import User from '../models/user.model.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'

const userController = {
  /**
   * @description Create a new User
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
   * @description add extra user details to the user
   */
  addExtraInfo: asyncHandler(async (req, res, next) => {
    const { skills, languages, certificates } = req.body

    const updateData = {}
    if (skills) updateData.skills = skills
    if (languages) updateData.languages = languages
    if (certificates) updateData.certificates = certificates

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
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

  /**
   * @param {string} role
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
  getUsers: (role) =>
    asyncHandler(async (req, res, next) => {
      const query = {}

      // If role is provided, add it to the query
      if (role) query.role = role

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
   * @description Delete a user by his userID
   */
  deleteUser: factory.deleteOne(User),

  getMe: (req, res, next) => {
    req.params.id = req.user.id
    next()
  },

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
}

export default userController
