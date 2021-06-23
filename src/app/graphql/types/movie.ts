import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class GetMovieInput {
  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  actor: string
}

@InputType()
export class GetWikiInput {
  @Field()
  title: string
}

@ObjectType()
export class MovieWiki {
  @Field()
  link: string

  @Field({ nullable: true })
  description?: string

  @Field()
  imdb: string
}
