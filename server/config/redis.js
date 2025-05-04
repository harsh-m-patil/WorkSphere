import { createClient } from 'redis'

// Create the redis client
const redisClient = createClient({
  url: 'redis://localhost:6379',
})

//handle events
redisClient.on('error', (err) => {
  console.error('Redis Client error:', err)
})

redisClient.on('connect', () => {
  console.log('Connected to redis')
})

redisClient.connect()

export default redisClient
