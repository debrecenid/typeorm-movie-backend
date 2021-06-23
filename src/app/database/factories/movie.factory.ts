import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import { Actor, Category, Movie } from '../../entities'

export interface MovieFactorySettings {
  title?: string
  actors?: Actor[]
  categories?: Category[]
}

define(Movie, (faker: typeof Faker, settings?: MovieFactorySettings) => {
  const movie = new Movie()
  movie.title = settings?.title || faker.name.title()
  movie.categories = settings?.categories || []
  movie.actors = settings?.actors || []
  return movie
})
