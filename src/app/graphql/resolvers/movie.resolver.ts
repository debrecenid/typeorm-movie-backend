import { Resolver, Query, Arg } from 'type-graphql'
import { dependency } from '@foal/core'
import { Movie } from '../../entities'
import { MovieLib } from '../../services/MovieLib'
import {
  GetMovieInput,
  GetWikiInput,
  MovieWiki,
} from '../types/movie'

@Resolver(Movie)
export class MovieResolver {
  @dependency
  movieLib: MovieLib

  @Query(() => [Movie])
  async listAll() {
    return await this.movieLib.listAll()
  }

  @Query(() => [Movie])
  async getMovies(
    @Arg('getMovieInput')
    getMovieInput: GetMovieInput
  ) {
    return await this.movieLib.getMovies(getMovieInput)
  }

  @Query(() => MovieWiki)
  async getWiki(
    @Arg('getWikiInput')
    getWikiInput: GetWikiInput
  ) {
    return await this.movieLib.getWiki(getWikiInput)
  }
}
