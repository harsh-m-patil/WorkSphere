/* eslint-disable no-console */
import dotenv from "dotenv"

dotenv.config()
import app from "./app.js"
import connectDB from "./config/db.js"

// CONNECT TO DB
connectDB()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
