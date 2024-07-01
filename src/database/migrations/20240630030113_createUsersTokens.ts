import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_tokens', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').notNullable()
    table.string('refresh_token').notNullable()
    table.string('expires_date')
    table.timestamps(true, true)

    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_tokens')
}
