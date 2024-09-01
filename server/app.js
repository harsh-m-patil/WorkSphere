const express = require("express")
const errorHandler = require("./middlewares/errorHandler")

const app = express()

// MIDDLEWARES
app.use(express.json())

// Route Handlers
app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  })
})

app.use(errorHandler)

module.exports = app
