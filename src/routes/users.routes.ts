import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController'

const createUserController = new CreateUserController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', createUserController.handle)
}
