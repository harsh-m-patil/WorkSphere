import User from '../models/user.model.js'
import Work from '../models/work.model.js'
import AppError from '../utils/appError.js'
import asyncHandler from '../utils/asyncHandler.js'
import factory from './factory.controller.js'
import { deleteFile } from '../utils/fileHelpers.js'
import APIFeatures from '../utils/apiFeatures.js'

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

      // Add role-based filtering if roles are provided
      if (roles.length > 0) {
        query.role = { $in: roles }
      }

      // Add text search if search query is provided
      if (req.query.search) {
        query.$text = { $search: req.query.search }
      }

      // Initialize the query
      let dbQuery = User.find(query)

      // Apply advanced filtering and sorting features
      const features = new APIFeatures(dbQuery, req.query).filter().sort()

      // Calculate total count after filtering (excluding pagination)
      const total = await User.countDocuments(features.query.getFilter())

      // Apply pagination
      dbQuery = features.paginate().query

      // Execute the final query to get the users
      const users = await dbQuery

      res.status(200).json({
        status: 'success',
        total,
        results: users.length,
        data: { users },
      })
    }),

  /**
   * @description Get a user corresponding to a id given through `req.params`
   */
  getUser: factory.getOne(User),

  getUserByUserName: asyncHandler(async (req, res, next) => {
    const { username } = req.params

    if (!username) {
      return next(new AppError('Please provide a username', 400))
    }

    const user = await User.findOne({ userName: username })

    if (!user) {
      return next(
        new AppError(`User with username '${username}' not found`, 404),
      )
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    })
  }),

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

  getMyApplications: asyncHandler(async (req, res, next) => {
    try {
      const works = await Work.find({ applied_status: { $in: [req.user.id] } })

      res.status(200).json({
        status: 'success',
        data: {
          works,
        },
      })
    } catch (error) {
      next(error) // Pass error to global error handler
    }
  }),

  updateProfileImage: asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError('No image file provided', 400))
    }

    const user = await User.findById(req.user.id)
    if (!user) {
      await deleteFile(`/uploads/profile-images/${req.file.filename}`)
      return next(new AppError('User not found', 404))
    }

    // Generate the URL for the uploaded file
    const imageUrl = `/uploads/profile-images/${req.file.filename}`

    // Delete old image file if it exists
    if (user.profileImage) {
      await deleteFile(user.profileImage)
    }

    // Update user profile image URL in database using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      status: 'success',
      data: {
        profileImage: updatedUser.profileImage,
      },
    })
  }),
}

export default userController
