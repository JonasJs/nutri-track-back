import { hash } from 'bcrypt'
import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UsersRepository } from '../../repositories/UsersRepository'

export class CreateUserUseCase {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async execute(data: ICreateUserDTO): Promise<void> {
    const userByEmail = await this.usersRepository.findByEmail(data.email)

    if (userByEmail) {
      throw new AppError('User already exists.')
    }

    const passwordHash = await hash(data.password, 8)

    await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
    })
  }
}
