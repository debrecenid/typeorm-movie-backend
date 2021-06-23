import { GraphQLError } from 'graphql'
import { getConnection } from 'typeorm'
import fetch from 'node-fetch'
import { Movie } from '../entities'
import { GetMovieInput, GetWikiInput, MovieWiki } from '../graphql/types/movie'

export class MovieLib {
  async listAll() {
    return await Movie.find({ relations: ['categories', 'actors'] })
  }

  async getMovies(getMovieInput: GetMovieInput) {
    const query = getConnection()
      .createQueryBuilder(Movie, 'movie')
      .leftJoinAndSelect('movie.categories', 'categories')
      .leftJoinAndSelect('movie.actors', 'actors')
    if (getMovieInput.title) {
      query.andWhere('movie.title = :title', {
        title: getMovieInput.title,
      })
    }
    if (getMovieInput.actor) {
      query.andWhere('actors.name = :name', {
        name: getMovieInput.actor,
      })
    }
    return await query.getMany()
  }

  async getWiki(getWikiInput: GetWikiInput): Promise<MovieWiki> {
    let url = 'https://en.wikipedia.org/w/api.php'
    const params: any = {
      action: 'opensearch',
      search: getWikiInput.title,
      limit: '1',
      namespace: '0',
      format: 'json',
    }
    url = url + '?origin=*'
    Object.keys(params).forEach((key) => {
      url += '&' + key + '=' + params[key]
    })
    try {
      const response = await (await fetch(url)).json()
      const wikiPath = response[3][0].split('/').pop()
      const wikiResult = await (
        await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiPath}`
        )
      ).json()
      return {
        link: `https://en.wikipedia.org/wiki/${wikiPath}`,
        description: wikiResult.extract,
        imdb: `https://www.imdb.com/find?q=${getWikiInput.title}`,
      }
    } catch (error) {
      if (error instanceof TypeError) {
        throw new GraphQLError('Wikipedia page not found!')
      } else {
        throw new GraphQLError('Error when fetching wikipedia!')
      }
    }
  }
}
