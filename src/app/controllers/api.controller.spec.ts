import { strictEqual } from 'assert'

import {
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseOK,
} from '@foal/core'

import { ApiController } from './api.controller'

describe('ApiController', () => {
  describe('has an "index" method that', () => {
    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ApiController, 'index'), 'GET')
      strictEqual(getPath(ApiController, 'index'), '/')
    })

    it('should return a HttpResponseOK.', () => {
      const controller = createController(ApiController)

      const response = controller.index()

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an instance of HttpResponseOK.')
      }

      strictEqual(response.body, 'Hello world!')
    })
  })
})
