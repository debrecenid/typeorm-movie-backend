import { ApiInfo, controller, Get, HttpResponseOK } from '@foal/core'
import { createConnection } from 'typeorm'
import { ApiController, TestDbController } from './controllers'
import * as version from '../version.json'
@ApiInfo({
  title: 'Backend init',
  version: '0.0.1',
})
export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/test', TestDbController),
  ]

  async init() {
    await createConnection()
  }

  @Get('/__version')
  version() {
    return new HttpResponseOK(version)
  }
}
