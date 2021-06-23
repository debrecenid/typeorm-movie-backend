import * as Bluebird from 'bluebird'
import { Factory, Seeder } from 'typeorm-seeding'
import { Actor, Category, Movie } from '../../entities'
import { actors } from '../fixtures/actor-fixture'
import { categories } from '../fixtures/category-fixture'
import { movies } from '../fixtures/movie-fixture'

export default class CreateData implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await Bluebird.map(categories, (category) =>
      factory(Category)(category).create()
    )
    await Bluebird.map(actors, (actor) => factory(Actor)(actor).create())

    const savedCategories = await Category.find()
    const savedActors = await Actor.find()

    await Bluebird.map(movies, async (mov) => {
      const movie = await factory(Movie)(mov).create()
      const rndCategory = Math.floor(Math.random() * savedCategories.length)
      const rndActor = Math.floor(Math.random() * savedActors.length)
      movie.categories = [savedCategories[rndCategory]]
      movie.actors = [savedActors[rndActor]]
      await movie.save()
    })
  }
}
