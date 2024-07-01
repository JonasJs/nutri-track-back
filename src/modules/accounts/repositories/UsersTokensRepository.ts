import { randomUUID } from 'crypto'
import { knex } from '../../../database/config'
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserToken } from '../entities/UserToken'
import { IUsersTokensRepository } from './IUsersTokensRepository'

export class UsersTokensRepository implements IUsersTokensRepository {
  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userTokenData = {
      id: randomUUID(),
      user_id: data.user_id,
      refresh_token: data.refresh_token,
      expires_date: data.expires_date,
    }

    const userToken = await knex('users_tokens')
      .insert(userTokenData)
      .returning('*')

    return userToken[0]
  }
}
