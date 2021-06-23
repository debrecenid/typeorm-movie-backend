import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import { Actor, Movie } from '../../entities'

export interface ActorFactorySettings {
  name?: string
  movies?: Movie[]
}

define(Actor, (faker: typeof Faker, settings?: ActorFactorySettings) => {
  const actor = new Actor()
  actor.name = `${faker.name.firstName()} ${faker.name.lastName()}`
  actor.movies = settings?.movies || []
  return actor
})
