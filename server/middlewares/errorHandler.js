/**
 * Send Error in development environment
 * Give more error details
 */
const sendErrorDev = (err, res) => {
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
      status: "error",
      message: "Something Went Wrong",
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
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res)
  }
}
