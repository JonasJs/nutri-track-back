import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UsersRepository } from '../../repositories/UsersRepository'

export class CreateUserUseCase {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async execute(data: ICreateUserDTO): Promise<void> {
    // TODO: Verificar se existe uma conta cadastrada
    await this.usersRepository.create(data)
  }
}
