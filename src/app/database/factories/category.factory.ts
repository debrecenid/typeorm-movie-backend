import { define } from 'typeorm-seeding'
import * as Faker from 'faker'
import { Category, Movie } from '../../entities'

export interface CategoryFactorySettings {
  name?: string
  movies?: Movie[]
}

define(Category, (faker: typeof Faker, settings?: CategoryFactorySettings) => {
  const category = new Category()
  category.name = settings?.name || faker.name.title()
  category.movies = settings?.movies || []
  return category
})
