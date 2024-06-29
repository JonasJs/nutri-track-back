import { afterAll, beforeAll } from 'vitest'
import { beforeEach } from 'node:test'
import { execSync } from 'child_process'
import { app } from '../../src/app'

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
