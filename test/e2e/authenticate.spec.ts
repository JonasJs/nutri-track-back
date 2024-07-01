import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../../src/app'
import request from 'supertest'

import { execSync } from 'child_process'

const USER_MOCK = {
  id: '12345678-1234-5678-1234-567890abcdef',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
}

async function createUser() {
  const response = await request(app.server).post('/users').send({
    email: USER_MOCK.email,
    name: USER_MOCK.name,
    password: USER_MOCK.password,
  })

  return response
}
describe('Auth routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run migrate:rollback')
    execSync('npm run migrate:latest')
  })

  it('should generate token and refresh token', async () => {
    await createUser()

    const response = await request(app.server).post('/session').send({
      email: USER_MOCK.email,
      password: USER_MOCK.password,
    })

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('refresh_token')
  })

  it('should throw an error if the email does not exist', async () => {
    const { body } = await request(app.server).post('/session').send({
      email: USER_MOCK.email,
      password: USER_MOCK.password,
    })

    expect(body.status).toEqual('error')
    expect(body.message).toBe('Email or password invalid.')
  })

  it('should throw an error if the password is invalid', async () => {
    await createUser()

    const { body } = await request(app.server)
      .post('/session')
      .send({
        email: USER_MOCK.email,
        password: `${USER_MOCK.password}-teste`,
      })

    expect(body.status).toEqual('error')
    expect(body.message).toBe('Email or password invalid.')
  })
})
