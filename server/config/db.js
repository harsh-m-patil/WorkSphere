/* eslint-disable no-console */
import mongoose from 'mongoose'

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
    console.log('DB Connected')
  } catch (err) {
    console.log('MongoDB Connection Error : ', err)
    process.exit(-1)
  }
}

export const closeDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('DB Connection Closed')
  } catch (err) {
    console.error('Error closing the DB connection:', err.message)
    process.exit(1)
  }
}
