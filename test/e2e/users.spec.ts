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

describe('Users routes', () => {
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

  it('should create a new user', async () => {
    const response = await request(app.server).post('/users').send({
      email: USER_MOCK.email,
      name: USER_MOCK.name,
      password: USER_MOCK.password,
    })

    expect(response.status).toEqual(201)
  })

  it('should not create new user if the email is already created', async () => {
    await request(app.server).post('/users').send({
      email: USER_MOCK.email,
      name: USER_MOCK.name,
      password: USER_MOCK.password,
    })

    const { body } = await request(app.server).post('/users').send({
      email: USER_MOCK.email,
      name: USER_MOCK.name,
      password: USER_MOCK.password,
    })

    expect(body.status).toEqual('error')
    expect(body.message).toEqual('User already exists.')
  })
})
