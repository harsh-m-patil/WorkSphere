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

let mongoServer
let app
let clientToken
let freelancerToken
let workId
let freelancerId

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

const clientData = {
  firstName: 'Greedy',
  lastName: 'Pasta',
  userName: 'greedy-pasta',
  email: 'pasta@example.com',
  password: 'Password123',
  passwordConfirm: 'Password123',
  role: 'client',
}

const freelancerData = {
  firstName: 'Test',
  lastName: 'Ickles',
  userName: 'test-ickles',
  email: 'test@example.com',
  password: 'Password123',
  passwordConfirm: 'Password123',
}

describe('Work Routes', () => {
  it('should create new users for testing', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send(clientData)
      .expect(201)

    expect(res.body).toHaveProperty('status', 'success')

    expect(res.body.token).toBeDefined()
    expect(res.body.data).toBeDefined()
    clientToken = res.body.token

    const userRes = await request(app)
      .post('/api/v1/users/signup')
      .send(freelancerData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(userRes.body.status).toBe('success')
    expect(userRes.body.token).toBeDefined()
    expect(userRes.body.data).toBeDefined()
    const { token, data } = userRes.body
    freelancerToken = token
    freelancerId = data.user.id
  })

  it('should create a work ', async () => {
    const res = await request(app)
      .post('/api/v1/work')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        title: 'Test Work',
        description: 'This is a test work description',
        pay: 100,
        skills_Required: ['JavaScript', 'Node.js'],
      })
      .expect(201)

    expect(res.body).toHaveProperty('status', 'success')
    workId = res.body.data.work.id
  })

  it('should apply for a work ', async () => {
    const res = await request(app)
      .post('/api/v1/work/apply')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({
        workId: workId,
      })
      .expect(200)

    expect(res.body).toHaveProperty('status', 'success')
    expect(res.body.data.work.noOfApplicants).toBe(1)
    expect(res.body.data.work.applied_status).toContain(freelancerId)
  })

  it('should assign a work to a freelancer', async () => {
    const res = await request(app)
      .post('/api/v1/work/assign')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        workId: workId,
        freelancerId: freelancerId,
      })
      .expect(200)

    expect(res.body).toHaveProperty('status', 'success')
    expect(res.body.data.work.active).toBe(false)
    expect(res.body.data.work.freelancer_id).toBe(freelancerId)
  })

  it('freelancer should not be able to assign work', async () => {
    await request(app)
      .post('/api/v1/work/assign')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({
        workId: workId,
        freelancerId: freelancerId,
      })
      .expect(403)
  })
})
