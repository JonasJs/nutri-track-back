import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      email: z.string(),
      name: z.string(),
      password: z.string().min(6),
    })

    const data = createUserBodySchema.parse(request.body)

    const createUserUseCase = new CreateUserUseCase()

    await createUserUseCase.execute(data)

    reply.status(201).send()
  }
}
