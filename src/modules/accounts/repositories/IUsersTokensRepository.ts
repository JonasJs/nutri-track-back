import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserToken } from '../entities/UserToken'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
}
