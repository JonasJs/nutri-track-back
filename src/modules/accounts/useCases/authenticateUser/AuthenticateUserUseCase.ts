import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../errors/AppError'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UsersRepository } from '../../repositories/UsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '../../repositories/UsersTokensRepository'

import { addTimeToDate } from '../../../../utils/date'
import auth from '../../../../config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  refresh_token: string
}

export class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository
  private usersTokensRepository: IUsersTokensRepository

  constructor() {
    this.usersRepository = new UsersRepository()
    this.usersTokensRepository = new UsersTokensRepository()
  }

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Email or password invalid.')
    }

    const isPasswordValid = await compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new AppError('Email or password invalid.')
    }

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
    } = auth

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    })

    const refreshToken = sign({}, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    })

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: addTimeToDate(expiresInRefreshToken),
      refresh_token: refreshToken,
    })

    return {
      token,
      refresh_token: refreshToken,
    }
  }
}
