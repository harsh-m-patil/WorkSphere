const express = require("express")

const app = express()

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  })
})

module.exports = app
