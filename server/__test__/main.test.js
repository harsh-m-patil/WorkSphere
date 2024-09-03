/* eslint-disable no-undef */
import { closeDB } from '../config/db.js'
import server from '../server.js'
import supertest from 'supertest'

const requestWithSupertest = supertest(server)

describe('Hello World', () => {
  it('GET / should return a welcome message', async () => {
    const res = await requestWithSupertest.get('/')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('message', 'Hello World')
  })
})

afterAll(async () => {
  try {
    await closeDB()
  } finally {
    server.close()
  }
})
