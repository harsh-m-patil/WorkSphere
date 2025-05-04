import { createClient } from 'redis'
import { config } from 'dotenv'

config()

const redisClient = createClient({
  url: process.env.REDIS_URL,
})

// Handle Redis connection events
redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err)
})

redisClient.on('connect', () => {
  console.log('✅ Redis client connected successfully')
})

redisClient.on('ready', () => {
  console.log('🚀 Redis client is ready to use')
})

// Connect to Redis
;(async () => {
  try {
    await redisClient.connect()
  } catch (err) {
    console.error('❌ Redis connection failed:', err)
  }
})()

export default redisClient
