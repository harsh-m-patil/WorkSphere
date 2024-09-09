import mongoose from 'mongoose'
import logger from '../utils/logger.js'

/**
 * Connect the application to MongoDB Database
 * @example
 * const connectDB = require('./path/to/connectDB')
 *
 * connectDB()
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {})
    logger.info('DB Connected')
  } catch (err) {
    logger.error('MongoDB Connection Error : ', err)
    process.exit(-1)
  }
}

export const closeDB = async () => {
  try {
    await mongoose.connection.close()
    logger.info('DB Connection Closed')
  } catch (err) {
    logger.error('Error closing the DB connection:', err.message)
    process.exit(1)
  }
}
