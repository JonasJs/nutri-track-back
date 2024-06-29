import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const data = authenticateUserUseCase.execute('')

    reply.status(200).send(data)
  }
}
