/* eslint-disable no-undef */
import supertest from 'supertest'
import server from '../server.js'
import { closeDB } from '../config/db.js'
const requestWithSupertest = supertest(server)

const userId = '66e9da124bca54f284bad057'
const reviewData = {
  review: "Great it's Working",
  rating: 5,
}

let token

beforeAll(async () => {
  const cred = {
    email: 'slug@example.com',
    password: '12345678',
  }

  const res = await requestWithSupertest
    .post('/api/v1/users/login')
    .send(cred)
    .expect('Content-Type', /json/)
    .expect(200)

  // eslint-disable-next-line prefer-destructuring
  token = res.body.token
})

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

  it('POST /:userId/review should create a review for that user', async () => {
    const res = await requestWithSupertest
      .post(`/api/v1/users/${userId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(reviewData)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('review')
    const { review } = res.body.data
    expect(review).toHaveProperty('rating')
    expect(review).toHaveProperty('review')
    expect(review).toHaveProperty('client')
    expect(review).toHaveProperty('freelancer')
  })
})
