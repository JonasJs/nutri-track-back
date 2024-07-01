import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserBodySchema = z.object({
      email: z.string(),
      password: z.string().min(6),
    })

    const body = authenticateUserBodySchema.parse(request.body)

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const data = await authenticateUserUseCase.execute(body)

    reply.status(200).send(data)
  }
}
