import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ServiceManager } from '@foal/core'

import { ApolloServer } from 'apollo-server-express'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { MovieResolver } from '../graphql/resolvers/movie.resolver'

export default async function testServer({
  context = {},
} = {}): Promise<ApolloServerTestClient> {
  const services = new ServiceManager()
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [MovieResolver],
    container: { get: (className) => services.get(className) },
    authChecker: () => true,
  })

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  return createTestClient(apolloServer)
}
