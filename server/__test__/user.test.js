/* eslint-disable no-undef */
import supertest from 'supertest'
import server from '../server.js'
import { closeDB } from '../config/db.js'

const requestWithSupertest = supertest(server)
let createdUserId
let adminToken
let userToken

const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  userName: 'johndoe',
  email: 'john.doe@example.com',
  password: 'password123',
  passwordConfirm: 'password123',
}

const updateDetails = {
  skills: ['Node.js', 'Express.js', 'JavaScript'],
  languages: ['Marathi', 'Hindi', 'English'],
  certificates: ['Complete Web Developer Udemy'],
}

beforeAll(async () => {
  const adminLoginResponse = await requestWithSupertest
    .post('/api/v1/users/login')
    .send({
      email: 'admin@work.com',
      password: 'Password123', // Replace with actual admin credentials
    })
    .expect(200)

  adminToken = adminLoginResponse.body.token
})

afterAll(async () => {
  try {
    await closeDB()
  } finally {
    server.close()
  }
})

describe('User Endpoints', () => {
  it('GET /users should show all users', async () => {
    const res = await requestWithSupertest
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('users')
  })

  it('POST /users/signup should create a new user', async () => {
    const res = await requestWithSupertest
      .post('/api/v1/users/signup')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('token')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('firstName', newUser.firstName)
    expect(res.body.data.user).toHaveProperty('lastName', newUser.lastName)
    expect(res.body.data.user).toHaveProperty('userName', newUser.userName)
    expect(res.body.data.user).toHaveProperty('email', newUser.email)
    createdUserId = res.body.data.user._id
  })

  it('POST /users/login should login', async () => {
    const userCreds = {
      email: 'john.doe@example.com',
      password: 'password123',
    }

    const res = await requestWithSupertest
      .post('/api/v1/users/login')
      .send(userCreds)
      .expect('Content-Type', /json/)
      .expect(200)

    userToken = res.body.token

    expect(res.body).toHaveProperty('token')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('email', userCreds.email)
  })

  it('POST /users should be restricted for normal user', async () => {
    await requestWithSupertest
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(403)
  })

  it('PATCH /users/me/ should update the user', async () => {
    const res = await requestWithSupertest
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${userToken}`)
      .send(updateDetails)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('skills', updateDetails.skills)
    expect(res.body.data.user).toHaveProperty(
      'languages',
      updateDetails.languages,
    )
    expect(res.body.data.user).toHaveProperty(
      'certificates',
      updateDetails.certificates,
    )
  })

  it('GET /users/me should get logged in user info', async () => {
    const res = await requestWithSupertest
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${userToken}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('firstName', newUser.firstName)
    expect(res.body.data.user).toHaveProperty('lastName', newUser.lastName)
    expect(res.body.data.user).toHaveProperty('userName', newUser.userName)
    expect(res.body.data.user).toHaveProperty('email', newUser.email)
    expect(res.body.data.user).toHaveProperty('skills', updateDetails.skills)
    expect(res.body.data.user).toHaveProperty(
      'languages',
      updateDetails.languages,
    )
    expect(res.body.data.user).toHaveProperty(
      'certificates',
      updateDetails.certificates,
    )
  })

  it('DELETE /users/:id should delete the user', async () => {
    await requestWithSupertest
      .delete(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204)

    const getUserRes = await requestWithSupertest
      .get(`/api/v1/users/${createdUserId}`)
      .expect('Content-Type', /json/)
      .expect(404)

    expect(getUserRes.body).toHaveProperty('message', 'user not found')
  })
})
