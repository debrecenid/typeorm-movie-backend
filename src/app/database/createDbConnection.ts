import {
  createConnection as _createConnection,
  ConnectionOptions,
  getConnection,
  Connection,
} from 'typeorm'

import * as assert from 'assert'
import { Movie, Actor, Category } from '../entities'

const connectOptions = (): ConnectionOptions => ({
  type: 'sqlite',
  database: './test_db.sqlite3',
  synchronize: false,
  logging: ['error'],
  entities: [Movie, Actor, Category],
})

async function createConnection() {
  let connection: Connection
  try {
    connection = await getConnection()
    assert(connection.entityMetadatas.length, 'Connection is not established')
    return connection
  } catch (e) {
    // We ignore since its likely that it caused because there was no connection
  }
  try {
    connection = await _createConnection(connectOptions())
    return connection
  } catch (e) {
    throw e
  }
}

export default createConnection
