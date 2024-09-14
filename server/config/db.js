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
    let db_uri = 'mongodb://localhost:27017/WorkSphere'
    if (process.env.NODE_ENV === 'production') {
      db_uri = process.env.DB_URI
    }
    await mongoose.connect(db_uri, {})
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
