import { randomUUID } from 'crypto'
import { knex } from '../../../database/config'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from './IUsersRepository'
import { User } from '../entities/User'

// import { knex } from '../../../database/config'

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await knex('users').where({ email }).first()

    if (user) {
      return user
    }
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await knex('users').insert({
      id: randomUUID(),
      name: data.name,
      email: data.email,
    })
  }
}
