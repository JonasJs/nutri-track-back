import 'knex'

declare module 'knex/types/tables' {
  export interface Users {
    id: string
    name: string
    email: string
    created_at: string
    updated_at: string
  }
}
