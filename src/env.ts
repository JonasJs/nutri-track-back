import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),

  // Auth Config
  SECRET_TOKEN: z.string(),
  EXPIRES_IN_TOKEN: z.string(),
  SECRET_REFRESH_TOKEN: z.string(),
  EXPIRES_IN_REFRESH_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envrioment variables: ', _env.error.format())

  throw new Error('Invalid envrioment variables.')
}

export const env = _env.data
