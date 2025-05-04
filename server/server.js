import dotenv from 'dotenv'
import { connectDB, closeDB } from './config/db.js'
import logger from './utils/logger.js'
import { initServer } from './app.js'
import { initSocket } from './utils/socket.js'
import http from 'node:http'

dotenv.config()

// CONNECT TO DB
await connectDB()

const app = await initServer()

const server = http.createServer(app)

initSocket(server)

let port = process.env.PORT || 5000

server.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException')
  logger.error(err.code, err.name, err.message)
  closeDB()
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  logger.error(err.code, err.name, err.message)
  logger.error('unhandledRejection')
  closeDB()
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('Received SIGINT (Ctrl+C). Cleaning up and exiting...')
  closeDB()
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM. Shutting down gracefully...')
  closeDB()
  server.close(() => {
    process.exit(0)
  })
})

export default server
