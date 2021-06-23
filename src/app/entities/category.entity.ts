import { ObjectType, Field, ID } from 'type-graphql'
import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm'
import { getDateColumnType } from './helpers'
import { Movie } from './movie.entity'

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @CreateDateColumn({ type: getDateColumnType() })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: getDateColumnType() })
  updatedAt: Date

  @Field()
  @Column()
  name: string

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies?: Movie[]
}
