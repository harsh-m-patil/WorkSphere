import { createClient } from 'redis'
import { config } from 'dotenv'
import logger from '../utils/logger.js'

config()

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

// Handle Redis connection events
redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err)
})

redisClient.on('connect', () => {
  logger.info('Redis client connected successfully')
})

redisClient.on('ready', () => {
  logger.info('Redis client is ready to use')
})

// Connect to Redis
;(async () => {
  try {
    await redisClient.connect()
  } catch (err) {
    logger.error('Redis connection failed:', err)
  }
})()

export default redisClient
