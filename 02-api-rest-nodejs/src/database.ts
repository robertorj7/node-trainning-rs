import 'dotenv/config'
import type { Knex } from "knex"
import knex from 'knex'

if(!process.env.DATABASE_URL) {
  throw new Error('Env DATABASE_URL is not defined')
}

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const db = knex(config)
