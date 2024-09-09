import dotenv from 'dotenv'
import http from 'node:http'
import { connectDB } from './config/db.js'
import logger from './utils/logger.js'
import app from './app.js'

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException')
  logger.error(err.name, err.message)
  process.exit(1)
})

dotenv.config()

// CONNECT TO DB
connectDB()

const server = http.createServer(app)

const port = process.env.PORT || 5000

server.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  logger.error(err.name, err.message)
  logger.error('unhandledRejection')
  server.close(() => {
    process.exit(1)
  })
})

export default server
