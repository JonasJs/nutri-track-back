import { FastifyInstance } from 'fastify'
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authenticateUserController = new AuthenticateUserController()

export async function authRoutes(app: FastifyInstance) {
  app.post('/session', authenticateUserController.handle)
}
