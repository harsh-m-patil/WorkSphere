const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const AppError = require("../utils/appError")
const asyncHandler = require("../utils/asyncHandler")
const User = require("../models/userModel")

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return next(
      new AppError("You are not logged in,please login to acesss", 401),
    )
  }
  // 2) Validate the token (Verification)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const user = await User.findById(decoded.id)
  if (!user) {
    return next(
      new AppError("The user belonging to the token does no longer exist", 401),
    )
  }
  req.user = user
  next()
})

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      )
    }

    next()
  }