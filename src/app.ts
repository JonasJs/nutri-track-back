import fastify from 'fastify'
import { usersRoutes } from './routes/users.routes'
import { errorsHandler } from './errors/errorsHandler'

export const app = fastify()

app.setErrorHandler(errorsHandler)

app.register(usersRoutes, { prefix: 'users' })
