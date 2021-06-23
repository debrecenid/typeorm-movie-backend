import { Get, HttpResponseOK, HttpResponseNotFound } from '@foal/core'

import { useSeeding, useRefreshDatabase, runSeeder } from 'typeorm-seeding'
import CreateMovie from '../database/seeds/create-data.seed'

export class TestDbController {
  @Get('/testDb')
  async unSubscribe() {
    try {
      await useRefreshDatabase()
      await useSeeding()
      await runSeeder(CreateMovie)
      return new HttpResponseOK('Ok')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.stack)
      return new HttpResponseNotFound('Unsubscibe failed')
    }
  }
}
