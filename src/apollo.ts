import { dependency, ServiceManager } from '@foal/core'

import 'reflect-metadata'
import 'source-map-support/register'
import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express'
import { buildTypeDefsAndResolvers } from 'type-graphql'

import { installSubscriptionHandlers } from './app/utils/installSubscriptionHandlers'
import { MovieResolver } from './app/graphql/resolvers/movie.resolver'

export class MyApollo {
  @dependency
  services: ServiceManager

  async init() {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: [MovieResolver],
      container: { get: (className) => this.services.get(className) },
      validate: false,
    })

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
    apolloServer.installSubscriptionHandlers = installSubscriptionHandlers

    return apolloServer
  }
}
