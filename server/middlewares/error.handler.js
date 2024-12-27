import AppError from '../utils/appError.js'

/**
 * @param {Error} err - The error object
 * @returns {AppError} - An AppError Object
 * Handle CastError from MongoDB
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${Object.keys(err.keyValue)}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorsDB = (err) => {
  const { message } = err
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token,please login again', 401)

const handleJWTExpiredError = () =>
  new AppError('Your Token has been expired please login again', 401)

/**
 * @param {Error} err - The error object
 * @param {Response} res - The response object
 * Send Error in development environment
 * Give more error details
 */
const sendErrorDev = (err, res) => {
  if (res.headersSent) {
    return
  }
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

/**
 * Send Error in production environment
 * Give less error details
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something Went Wrong',
    })
  }
}

/**
 * An Global Error Handling middleware
 *
 *  @example
 *
 *  const express = require('express')
 *  const app = express()
 *  const errorHandler = require('./path/to/errorHandler')
 *
 *  app.use(errorHandler)
 */
const errorHandler = (err, req, res, next) => {
  // console.log(err.name)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    let error = { ...err }
    error.message = err.message
    error.name = err.name
    if (err.name === 'CastError') {
      error = handleCastErrorDB(err)
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(err)
    } else if (err.name === 'ValidationError') {
      error = handleValidationErrorsDB(err)
    } else if (err.name === 'JsonWebTokenError') {
      error = handleJWTError()
    } else if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError()
    }

    sendErrorProd(error, res)
  }
}
export default errorHandler
