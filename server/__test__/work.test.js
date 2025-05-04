import { vi, describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { initServer } from '../app.js'
import { connectDB } from '../config/db.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config({ path: '.env.test' })

// Mock logger
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
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await connectDB(mongoUri)
  app = await initServer()
})

afterAll(async () => {
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
  lastName: 'User',
  userName: 'test-user',
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
    clientToken = res.body.token

    const userRes = await request(app)
      .post('/api/v1/users/signup')
      .send(freelancerData)
      .expect(201)

    freelancerToken = userRes.body.token
    freelancerId = userRes.body.data.user.id
  })

  it('should create a work', async () => {
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

    expect(res.body.status).toBe('success')
    workId = res.body.data.work.id
  })

  it('should apply for a work', async () => {
    const res = await request(app)
      .post('/api/v1/work/apply')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({ workId })
      .expect(200)

    expect(res.body.data.work.noOfApplicants).toBe(1)
    expect(res.body.data.work.applied_status).toContain(freelancerId)
  })

  it('should assign work to a freelancer', async () => {
    const res = await request(app)
      .post('/api/v1/work/assign')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        workId,
        freelancerId,
      })
      .expect(200)

    expect(res.body.data.work.freelancer_id).toBe(freelancerId)
    expect(res.body.data.work.active).toBe(false)
  })

  it('freelancer should not assign work', async () => {
    await request(app)
      .post('/api/v1/work/assign')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({ workId, freelancerId })
      .expect(403)
  })

  it('should not apply twice to same work', async () => {
    await request(app)
      .post('/api/v1/work/apply')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({ workId })
      .expect(400)
  })

  it('should not apply to non-existent work', async () => {
    await request(app)
      .post('/api/v1/work/apply')
      .set('Authorization', `Bearer ${freelancerToken}`)
      .send({ workId: new mongoose.Types.ObjectId().toString() })
      .expect(404)
  })

  it('should not assign with invalid freelancerId', async () => {
    await request(app)
      .post('/api/v1/work/assign')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ workId, freelancerId: 'invalid-id' })
      .expect(400)
  })

  it('should not create work without required fields', async () => {
    await request(app)
      .post('/api/v1/work')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ title: 'Missing desc' })
      .expect(400)
  })

  it('should not create work without token', async () => {
    await request(app)
      .post('/api/v1/work')
      .send({
        title: 'No Auth',
        description: 'Trying without token',
        pay: 100,
        skills_Required: ['JS'],
      })
      .expect(401)
  })

  it('should not assign work without token', async () => {
    await request(app)
      .post('/api/v1/work/assign')
      .send({ workId, freelancerId })
      .expect(401)
  })

  it('should get a work by ID', async () => {
    const res = await request(app).get(`/api/v1/work/${workId}`).expect(200)

    expect(res.body.status).toBe('success')
    expect(res.body.data.work).toHaveProperty('id', workId)
  })

  it('should return 404 for unknown work ID', async () => {
    await request(app)
      .get(`/api/v1/work/${new mongoose.Types.ObjectId().toString()}`)
      .expect(404)
  })
})
