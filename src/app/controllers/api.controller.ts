import { Get, HttpResponseOK } from '@foal/core'

export class ApiController {
  @Get('/')
  index() {
    return new HttpResponseOK('Hello world!')
  }
}
