import { randomUUID } from 'crypto'
import { knex } from '../../../database/config'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from './IUsersRepository'

// import { knex } from '../../../database/config'

export class UsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<void> {
    await knex('users').insert({
      id: randomUUID(),
      name: data.name,
      email: data.email,
    })
  }
}
