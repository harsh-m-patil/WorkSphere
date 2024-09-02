/* eslint-disable no-console */
import mongoose from "mongoose"

/**
 * Connect the application to MongoDB Database
 * @example
 * const connectDB = require('./path/to/connectDB')
 *
 * connectDB()
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {})
    console.log("DB Connected")
  } catch (err) {
    console.log("MongoDB Connection Error : ", err)
    process.exit(-1)
  }
}

export default connectDB
