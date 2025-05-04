import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import { initServer } from '../app.js'

const app = await initServer()

vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}))
console.log = vi.fn()
console.error = vi.fn()
console.warn = vi.fn()

describe('Server startup and health check', () => {
  it('should return hello world for /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Hello World')
  })

  it('should return 200 for /health route', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })
})
