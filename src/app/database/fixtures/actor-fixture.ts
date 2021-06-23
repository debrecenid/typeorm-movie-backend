import { CategoryFactorySettings } from '../factories/category.factory'
import * as faker from 'faker'

export const actors: CategoryFactorySettings[] = [
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
]
