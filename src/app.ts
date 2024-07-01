import fastify from 'fastify'
import { usersRoutes } from './routes/users.routes'
import { authRoutes } from './routes/auth.routes'
import { errorsHandler } from './errors/errorsHandler'

export const app = fastify()

app.setErrorHandler(errorsHandler)

app.register(usersRoutes, { prefix: 'users' })
app.register(authRoutes)
