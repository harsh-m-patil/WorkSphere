const User = require("../models/userModel")
const AppError = require("../utils/appError")
const asyncHandler = require("../utils/asyncHandler")
const { deleteOne } = require("./factoryController")

const userController = {
  /**
   * Create a new User
   */
  createUser: asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)
    user.password = undefined
    res.status(201).json({
      status: "success",
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
      status: "success",
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
      return next(new AppError("No User with that id found", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  }),

  deleteUser: deleteOne(User),
}

module.exports = userController
