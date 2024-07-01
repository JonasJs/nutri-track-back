import 'knex'
import { UserToken } from '../modules/accounts/entities/UserToken'
import { User } from '../modules/accounts/entities/User'

declare module 'knex/types/tables' {
  export interface Tables {
    users: User
    users_tokens: UserToken
  }
}
