/* eslint-disable no-undef */
import supertest from 'supertest'
import server from '../server.js'
import { closeDB } from '../config/db.js'
const requestWithSupertest = supertest(server)

afterAll(async () => {
  try {
    await closeDB()
  } finally {
    server.close()
  }
})

describe('Review Endpoints', () => {
  it('GET /reviews should all reviews', async () => {
    const res = await requestWithSupertest
      .get('/api/v1/reviews')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('reviews')
  })

  //it('POST /:userId/review should create a review for that user', async () => {
  //  const res = await requestWithSupertest
  //    .post('/api/v1/reviews')
  //    .expect('Content-Type', /json/)
  //    .expect(201)
  //
  //  expect(res.body).toHaveProperty('data')
  //  expect(res.body.data).toHaveProperty('review')
  //  const { review } = res.body.data
  //  expect(review).toHaveProperty('rating')
  //})
})
