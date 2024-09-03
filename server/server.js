/* eslint-disable no-console */
import dotenv from 'dotenv'
import http from 'node:http'

dotenv.config()
import app from './app.js'
import { connectDB } from './config/db.js'

// CONNECT TO DB
connectDB()

const server = http.createServer(app)

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

export default server
