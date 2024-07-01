import { env } from '../env'

const {
  SECRET_TOKEN,
  EXPIRES_IN_TOKEN,
  SECRET_REFRESH_TOKEN,
  EXPIRES_IN_REFRESH_TOKEN,
} = env

export default {
  secretToken: SECRET_TOKEN,
  expiresInToken: EXPIRES_IN_TOKEN,
  secretRefreshToken: SECRET_REFRESH_TOKEN,
  expiresInRefreshToken: EXPIRES_IN_REFRESH_TOKEN,
}
