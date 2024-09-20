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
const invalidReviewData = {
  review: '',
  rating: 6, // Invalid rating
}

let token
let reviewId // Will be used to track the created review

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
  it('GET /reviews should get all reviews', async () => {
    const res = await requestWithSupertest
      .get('/api/v1/reviews')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('reviews')
    expect(res.body.data.reviews.length).toBeGreaterThan(0)
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
    expect(review).toHaveProperty('rating', reviewData.rating)
    expect(review).toHaveProperty('review', reviewData.review)
    expect(review).toHaveProperty('client')
    expect(review).toHaveProperty('freelancer')
    reviewId = review._id
  })

  it('POST /:userId/review should return error for invalid input', async () => {
    const res = await requestWithSupertest
      .post(`/api/v1/users/${userId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidReviewData)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(res.body).toHaveProperty('status', 'fail')
    expect(res.body.message).toContain('review cannot be empty')
  })

  it('GET /reviews/:reviewId should get a specific review', async () => {
    const res = await requestWithSupertest
      .get(`/api/v1/reviews/${reviewId}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('review')
    const { review } = res.body.data
    expect(review._id).toBe(reviewId)
    expect(review).toHaveProperty('rating')
    expect(review).toHaveProperty('review')
  })

  it('PATCH /reviews/:reviewId should update a review', async () => {
    const updatedReviewData = {
      review: 'Updated review content',
      rating: 4,
    }

    const res = await requestWithSupertest
      .patch(`/api/v1/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedReviewData)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('review')
    const { review } = res.body.data
    expect(review.review).toBe(updatedReviewData.review)
    expect(review.rating).toBe(updatedReviewData.rating)
  })

  it('DELETE /reviews/:reviewId should delete a review', async () => {
    await requestWithSupertest
      .delete(`/api/v1/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // Try to fetch the deleted review
    const res = await requestWithSupertest
      .get(`/api/v1/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('status', 'fail')
    expect(res.body.message).toBe('review not found')
  })
})
