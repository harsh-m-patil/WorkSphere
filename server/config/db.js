/* eslint-disable no-console */
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {})
    console.log("DB Connected")
  } catch (err) {
    console.log("MongoDB Connection Error : ", err)
    process.exit(-1)
  }
}

module.exports = connectDB