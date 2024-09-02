const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/userRoutes")

const app = express()

// MIDDLEWARES
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// Route Handlers

app.use("/api/v1/users", userRouter)

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  })
})

app.use(errorHandler)

module.exports = app
