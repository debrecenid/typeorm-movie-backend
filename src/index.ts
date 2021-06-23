import 'reflect-metadata'
import 'source-map-support/register'
import * as dotenv from 'dotenv'
import { join } from 'path'
process.chdir(join(__dirname, '..'))
const dotenvPath = join(__dirname, '..', '.env')
dotenv.config({ path: dotenvPath })

// std
import * as http from 'http'

// 3p
import { Config, createApp, createService } from '@foal/core'
import * as express from 'express'
import { createConnection } from 'typeorm'

// App
import { AppController } from './app/app.controller'

import { MyApollo } from './apollo'
import { MovieLib } from './app/services/MovieLib'

async function main() {
  await createConnection()

  const expressApp = express()

  const apolloService = createService(MyApollo)
  const apolloServer = await apolloService.init()
  const path = '/graphql'

  expressApp.use(express.json({ limit: '2mb' }))
  expressApp.use(express.urlencoded({ limit: '10mb', extended: true }))

  apolloServer.applyMiddleware({ app: expressApp, path })

  const foalApp = createApp(AppController, expressApp)

  const httpServer = http.createServer(foalApp)
  apolloServer.installSubscriptionHandlers(httpServer)

  const port = Config.get2('port', 'number', 3001)
  httpServer.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Listening on port ${port}...`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line
  console.error(err)
  process.exit(1)
})
