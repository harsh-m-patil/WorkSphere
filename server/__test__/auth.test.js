import { vi, describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { initServer } from '../app.js'
import { connectDB } from '../config/db.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config({ path: '.env.test' })

vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}))

let app
let mongoServer

beforeAll(async () => {
  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  // Connect to the in-memory DB
  await connectDB(mongoUri)
  app = await initServer()
})

afterAll(async () => {
  // Clean up: Close the database connection and stop the in-memory server
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
})

const userData = {
  firstName: 'Test',
  lastName: 'Ickles',
  userName: 'test-ickles',
  email: 'test@example.com',
  password: 'Password123',
  passwordConfirm: 'Password123',
}

describe('Auth routes', () => {
  it('should return 401 for protected route', async () => {
    await request(app).get('/api/v1/users/me').expect(401)
  })

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body.status).toBe('success')
    expect(res.body.token).toBeDefined()
    expect(res.body.data).toBeDefined()
  })

  let token
  it('should login as a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.status).toBe('success')
    expect(res.body.token).toBeDefined()
    // eslint-disable-next-line prefer-destructuring
    token = res.body.token
    expect(res.body.data).toBeDefined()
  })

  it('should return 200 for protected route for a logged in user', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
    expect(200)

    expect(res.body.data.user.userName).toBe(userData.userName)
  })

  it('should delete logged in user', async () => {
    await request(app)
      .delete('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
    expect(204)
  })

  it('should not able to login after account deletetion', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({ email: userData.email, password: userData.password })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
  })
})
