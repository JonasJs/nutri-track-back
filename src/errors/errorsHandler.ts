import { z } from 'zod'
import { AppError } from './AppError'
import { FastifyReply, FastifyRequest } from 'fastify'

export function errorsHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    })
  }

  if (error instanceof z.ZodError) {
    return reply.status(400).send({
      status: 'error',
      message: 'Validation error',
      errors: error.errors || null,
    })
  }

  reply.status(500).send({
    status: 'error',
    message: 'Internal server error.',
    error: error?.message,
  })
}
