/* eslint-disable no-console */
const dotenv = require("dotenv")

dotenv.config()

const app = require("./app")
const connectDB = require("./config/db")

// CONNECT TO DB
connectDB()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
